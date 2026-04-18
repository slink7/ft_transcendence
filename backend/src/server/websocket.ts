import { WebSocketServer, WebSocket } from "ws";

import { ClientMessage, ServerMessage } from "../../shared/src/types";

import { ClientManager } from "./ClientManager";
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

type Client = {
	name: string;
	color: string;
}

type SimpleRoom = {
	owner: Client;
	id: string,
	clientCount: number
}

export function createWebSocketServer(server: any) {
	const wss = new WebSocketServer({ server });

	const clientManager = new ClientManager();
	const roomManager = new RoomManager();

	wss.on("connection", (ws: WebSocket) => {

		console.log("WebSocket connection...");
		let UUID: string | null = null;

		ws.on("message", (data) => {
			let msg: ServerMessage;
			try {
				msg = JSON.parse(data.toString()) as ClientMessage;
			} catch (err) {
				console.error("Invalid message from ", UUID);
				send(ws, invalidJSON);
			}

			if (!msg) {
				console.log("Zebi msg est undefined");
				return ;
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

			console.log(msg.type === "GET_ROOMS");
			if (msg.type === "GET_ROOMS") {
				let rooms: SimpleRoom[] = [];
				roomManager.getRooms().forEach((room, _) => {
					const cli = clientManager.getClient(room.owner);
					if (!cli)
						return ;
					rooms.push({owner: {name: cli.name, color: cli.color}, id: room.UUID, clientCount: room.clients.length});
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

				const success: boolean = roomManager.joinRoom(UUID, roomID);
				if (!success)
					return (send(ws, cantJoin));
				client.roomID = roomID;
				const room = roomManager.getRoom(roomID);
				if (!room)
					return ;
				const clients = room.clients.map((client) => {
					const cli = clientManager.getClient(client)
					if (!cli)
						return ;
					return ({name: cli.name, color: cli.color});
				});
				room.clients.forEach((id) => {
					const cli = clientManager.getClient(id);
					if (!cli)
						return ;
					send(cli.socket, { type: "ROOM_INFO", players: clients});
				});
				// return (send(ws, { type: "ROOM_INFO", players: clients}));
				return ;
			}

			if (msg.type === "QUIT_ROOM") {
				const roomID = clientManager.getClient(UUID)?.roomID || "";
				console.log("Quitting ", roomID);
				const success: boolean = roomManager.quitRoom(UUID, roomID);
				if (!success)
					return (send(ws, cantQuit));
				const room = roomManager.getRoom(roomID);
				if (!room) {
					console.log("Quit no room");
					return ;
				}
				const clients = room.clients.map((client) => {
					const cli = clientManager.getClient(client)
					if (!cli)
						return ;
					return ({name: cli.name, color: cli.color});
				});
				console.log("Players: ", clients);
				room.clients.forEach((id) => {
					const cli = clientManager.getClient(id);
					if (!cli)
						return ;
					console.log("Send to ", cli.name);
					send(cli.socket, { type: "ROOM_INFO", players: clients});
				});
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
