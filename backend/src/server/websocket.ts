import { WebSocketServer, WebSocket } from "ws";

import { ClientMessage, ServerMessage } from "../../shared/src/types";

import { ClientManager } from "./ClientManager";
import { RoomManager } from "./RoomManager";

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

			if (!msg.type) {
				send(ws, invalidJSON);
				return ;
			}

			console.log("Received: type ", msg.type);
			console.log("Received: ", msg);

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
				const room = roomManager.getRoom(roomID);
				console.log("OnJoin:", room);
				//TODO SEND ROOM_INFO
				return (send(ws, { type: "ROOM_INFO", players: [] }));
			}

			if (msg.type === "QUIT_ROOM") {
				const success: boolean = roomManager.quitRoom(UUID, clientManager.getClient(UUID)?.roomID || "");
				if (!success)
					return (send(ws, cantQuit));
				// TODO
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
