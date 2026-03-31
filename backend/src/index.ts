import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();
const server = http.createServer(app);
const PORT = 3000;

const wss = new WebSocketServer({ server });

app.get("/", (req, res) => {
  res.send("Traneeeeeeeeeescendence backend is running 🚀");
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//


console.log("WebSocket server running on ws://localhost:7282");

type Player = {
	socket: any;
	x: number;
	y: number;
};

const players = new Map<any, Player>();

wss.on("connection", (ws) => {
	console.log("Client connecté");

	const player: Player = {
		socket: ws,
		x: 5,
		y: 0,
	};

	players.set(ws, player);

	ws.on("message", (data) => {
		const msg = JSON.parse(data.toString());

		if (msg.type === "LEFT") player.x--;
		if (msg.type === "RIGHT") player.x++;

		// 🔁 envoyer état
		ws.send(JSON.stringify({
			type: "STATE",
			x: player.x,
			y: player.y
		}));
	});

	ws.on("close", () => {
		players.delete(ws);
	});
});
