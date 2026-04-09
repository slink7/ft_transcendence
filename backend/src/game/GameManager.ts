import { WebSocket } from "ws";
import { Game } from "./Game";

type Player = {
	id: string;
	ws: WebSocket;
	game: Game;
};

export class GameManager {
	private players: Map<string, Player> = new Map();

	addPlayer(ws: WebSocket): string {
		const id = crypto.randomUUID();

		this.players.set(id, {
			id,
			ws,
			game: new Game()
		});

		return id;
	}

	removePlayer(id: string) {
		this.players.delete(id);
	}

	handleInput(id: string, msg: any) {
		const player = this.players.get(id);
		if (!player) return;

		const game = player.game;

		switch (msg.type) {
			case "LEFT":
				game.move(-1, 0);
				break;
			case "RIGHT":
				game.move(1, 0);
				break;
			case "DOWN":
				game.move(0, 1);
				break;
			case "ROTATE":
				game.rotate();
				break;
		}
	}

	update() {
		this.players.forEach((player) => {
			player.game.update();
		});
	}

	broadcast() {
		this.players.forEach((player) => {
			const state = player.game.getState();

			player.ws.send(JSON.stringify({
				type: "STATE",
				state
			}));
		});
	}
}
