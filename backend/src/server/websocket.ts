import { WebSocketServer, WebSocket } from "ws";

import { ClientMessage, ServerMessage } from "../../shared/types";

import {
	recordReconnect,
	recordWebSocketMessage,
	setRuntimeMetrics,
} from "../monitoring/metrics";
import { Client, ClientManager } from "./ClientManager";
import { Room, RoomManager } from "./RoomManager";
import { GameManager } from "../game/GameManager"

function createError(msg: string): ServerMessage {
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
	id: string;
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
		id: client?.UUID || "-1",
		name: client?.name || "Unknown",
		color: client?.color || "#000000"
	});
}


export function createWebSocketServer(server: any, _gameManager?: unknown) {
	const wss = new WebSocketServer({ server });

	const clientManager = new ClientManager();
	const roomManager = new RoomManager();
	const gameManager = new GameManager();

	function refreshRuntimeMetrics() {
		const connectedClients = Array.from(clientManager.getClients().values())
			.filter((client) => client.connected).length;

		setRuntimeMetrics(connectedClients, roomManager.getRooms().size);
	}

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

	function broadcastRoom(roomID: string, f: (room: Room) => ServerMessage) {
		const room = roomManager.getRoom(roomID);
		if (!room)
			return ;
		const toSend: ServerMessage = f(room);
		// console.log("Broadcast ", toSend);
		room.clients.forEach((id) => {
			const client = clientManager.getClient(id);
			if (!client)
				return ;
			send(client.socket, toSend);
		});
	}

	function broadcastRoomInfo(roomID: string) {
		broadcastRoom(roomID, (room: Room) => {
			return ({
				type: "ROOM_INFO",
				...convertRoom(room)
			});
		})
	}


	wss.on("connection", (ws: WebSocket) => {

		console.log("WebSocket connection...");
		let UUID: string | null = null;

		ws.on("message", (data) => {
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
			recordWebSocketMessage(msg.type);

			if (msg.type === "HELLO") {
				if (msg.clientID) {
					const client = clientManager.reconnect(msg.clientID, ws);
					if (client) {
						UUID = client.UUID;
						recordReconnect();
						refreshRuntimeMetrics();
						return (send(ws, { type: "WELCOME", clientID: UUID }));
					}
				}

				const client = clientManager.connect(
					ws, msg.clientID, msg.name
				);
				console.log("Connection: ", client.UUID, client.name);
				UUID = client.UUID;
				refreshRuntimeMetrics();

				return (send(ws, { type: "WELCOME", clientID: UUID }));
			}

			if (!UUID)
				return (send(ws, notAuthentificated));

			const client = clientManager.getClient(UUID);
			if (!client)
				return ;

			if (msg.type === "GAME_INPUT") {
				gameManager.handleInput(UUID, msg.input);
				send(ws, { type: "ACK" });
				return ;
			}

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

				refreshRuntimeMetrics();
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
				refreshRuntimeMetrics();
				return ;
			}

			if (msg.type === "QUIT_ROOM") {
				const roomID = client?.roomID || "";
				const success: boolean = roomManager.quitRoom(UUID, roomID);
				if (!success)
					return (send(ws, cantQuit));
				const room = roomManager.getRoom(roomID);
				if (!room)
					return (send(ws, cantQuit));
				broadcastRoomInfo(roomID);
				if (room.clients.length < 1)
					roomManager.deleteRoom(roomID);
				refreshRuntimeMetrics();
				return (send(ws, { type: "ACK" }));
			}

			if (msg.type === "START_GAME") {
				const roomID = client?.roomID || "";
				const seed = crypto.randomUUID();
				broadcastRoom(roomID, () => {
					return ({
						type: "GAME_START",
						seed: seed
					});
				});
				const room = roomManager.getRoom(roomID);
				if (!room)
					return ;
				room.clients.forEach((clientID: string) => {
					const cli = clientManager.getClient(clientID);
					if (!cli)
						return ;
					gameManager.addPlayer(cli.UUID, cli.socket, seed);
				})
				setTimeout(() => {
					const timerID = setInterval(() => {
						const states = {};
						room.clients.forEach((clientID: string) => {
							states[clientID] = gameManager.update(clientID);
						});
						broadcastRoom(roomID, () => {
							return ({
								type: "STATE",
								states: {
									...states
								}
							});
						});
					}, 1000); // Update period
				}, 2000); // Initial delay
				return ;
			}

			send(ws, { type: "UNKNOWN", value: msg.type });
			return ;
		});

		ws.on("close", () => {
			if (!UUID)
				return ;
			const clientID = UUID;

			const client = clientManager.getClient(clientID);
			if (!client || client.socket !== ws)
				return ;

			console.log("Client disconnected ", client.name);
			clientManager.disconnect(clientID, (expiredClient: Client) => {
				const roomID = expiredClient.roomID;
				if (!roomID)
					return ;

				const success = roomManager.quitRoom(clientID, roomID);
				if (!success)
					return ;
				delete expiredClient.roomID;
				broadcastRoomInfo(roomID);
				refreshRuntimeMetrics();
			});
			refreshRuntimeMetrics();
		});
	});

	setInterval(() => {
		clientManager.cleanup();
		refreshRuntimeMetrics();
	}, 5000);
}
