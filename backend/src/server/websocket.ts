import { WebSocketServer, WebSocket } from "ws";

import { ClientMessage, ServerMessage } from "../../shared/src/types";

import { Client, ClientManager } from "./ClientManager";
import { Room, RoomManager } from "./RoomManager";

function createError(msg: string) {
	return ({ type: "ERROR", message: msg });
}

const invalidJSON = createError("Invalid JSON");
const notAuthentificated = createError("Not authentificated");
const missingParameter = createError("Missing parameter");
const cantJoin = createError("Cant join room");
const cantQuit = createError("Cant quit room");

function send(ws: WebSocket, msg: ServerMessage) {
	return (ws.send(JSON.stringify(msg)));
}

type CClient = {
	name: string;
	color: string;
}

type CRoom = {
	owner: CClient,
	id: string,
	clientCount: number,
	clients: CClient[]
}

function convertClient(client: Client | undefined): CClient {
	return ({
		name: client?.name || "Unknown",
		color: client?.color || "#000000"
	});
}


export function createWebSocketServer(server: any) {
	const wss = new WebSocketServer({ server });

	const clientManager = new ClientManager();
	const roomManager = new RoomManager();

	function convertRoom(room: Room): CRoom {
		const clients: CClient[] = room.clients.map((UUID: string) => {
			return (convertClient(clientManager.getClient(UUID)));
		});
		return ({
			id: room.UUID,
			clients: clients,
			clientCount: clients.length,
			owner: convertClient(clientManager.getClient(room.owner))
		});
	}

	function broadcastRoomInfo(roomID: string) {
		const room = roomManager.getRoom(roomID);
		if (!room)
			return ;
		const clients = room.clients.map((clientID: string) => {
			return (convertClient(clientManager.getClient(clientID)));
		});
		room.clients.forEach((id) => {
			const cli = clientManager.getClient(id);
			if (!cli)
				return ;
			send(cli.socket, {
				type: "ROOM_INFO",
				players: clients
			});
		});
	}


	wss.on("connection", (ws: WebSocket) => {

		console.log("WebSocket connection...");

		ws.on("message", (data) => {
			let UUID: string | null = null;
			let msg: ClientMessage;
			try {
				msg = JSON.parse(data.toString()) as ClientMessage;
			} catch (err) {
				console.error("Invalid message from ", UUID);
				return (send(ws, invalidJSON));
			}

			if (!msg.type) {
				send(ws, invalidJSON);
				return ;
			}

			console.log("Received: type ", msg.type);

			if (msg.type === "HELLO") {
				const client = clientManager.connect(
					ws, msg.clientID, msg.name
				);
				console.log("Connection: ", client.UUID, client.name);
				UUID = client.UUID;

				return (send(ws, { type: "WELCOME", clientID: UUID }));
			}

			if (!UUID)
				return (send(ws, notAuthentificated));

			const client = clientManager.getClient(UUID);
			if (!client)
				return ;

			if (msg.type === "GAME_INPUT")
				return ;

			if (msg.type === "SET_NAME") {
				client.name = msg.name;
				return (send(ws, {type: "ACK"}));
			}

			if (msg.type === "SET_COLOR") {
				client.color = msg.color;
				return (send(ws, {type: "ACK"}))
			}

			if (msg.type === "GET_ROOMS") {
				let rooms: CRoom[] = [];
				roomManager.getRooms().forEach((room, _) => {
					rooms.push(convertRoom(room));
				});
				return (send(ws, {type: "ROOM_LIST", roomList: rooms}));
			}

			if (msg.type === "CREATE_ROOM") {
				const roomID = roomManager.createRoom(UUID);

				return (send(ws, { type: "CREATED_ROOM", roomID: roomID }));
			}

			if (msg.type === "JOIN_ROOM") {
				const roomID = msg.roomID;
				if (!roomID)
					return (send(ws, missingParameter));

				if (client.roomID && client.roomID !== roomID) {
					const success = roomManager.quitRoom(UUID, client.roomID);
					if (success)
						broadcastRoomInfo(client.roomID);
					const room = roomManager.getRoom(client.roomID);
					if (room && room.clients.length < 1)
						roomManager.deleteRoom(client.roomID);
				}
				const success: boolean = roomManager.joinRoom(UUID, roomID);
				if (!success)
					return (send(ws, cantJoin));
				client.roomID = roomID;
				broadcastRoomInfo(roomID);
				return ;
			}

			if (msg.type === "QUIT_ROOM") {
				const roomID = clientManager.getClient(UUID)?.roomID || "";
				const success: boolean = roomManager.quitRoom(UUID, roomID);
				if (!success)
					return (send(ws, cantQuit));
				const room = roomManager.getRoom(roomID);
				if (!room)
					return (send(ws, cantQuit));
				broadcastRoomInfo(roomID);
				if (room.clients.length < 1)
					roomManager.deleteRoom(roomID);
				return (send(ws, { type: "ACK" }));
			}

			send(ws, { type: "UNKNOWN", value: msg.type });

			return ;
		});

		ws.on("close", () => {
			console.log("Client disconnected ", clientManager.getClient(UUID || "")?.name);
			clientManager.disconnect(UUID || "");
		});
	});

	setInterval(() => {
		clientManager.cleanup();
	}, 5000);
}
