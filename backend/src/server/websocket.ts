import { WebSocketServer, WebSocket } from "ws";
import { GameManager } from "../game/GameManager";

export function createWebSocketServer(server: any, gameManager: GameManager) {
	const wss = new WebSocketServer({ server });

	wss.on("connection", (ws: WebSocket) => {
		console.log("Client connected ", ws._socket.remoteAddress);

		const playerId = gameManager.addPlayer(ws);

		ws.on("message", (data) => {
			try {

				const msg = JSON.parse(data.toString());

				gameManager.handleInput(playerId, msg);

				ws.send(JSON.stringify({ type: "ACK" }))
			} catch (err) {
				console.error("Invalid message", err);
			}
		});

		ws.on("close", () => {
			console.log("Client disconnected ", ws._socket.remoteAddress);
			gameManager.removePlayer(playerId);
		});
	});
}
