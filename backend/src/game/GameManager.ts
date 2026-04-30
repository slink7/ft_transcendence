import { WebSocket } from "ws";
import { Game } from "/app/shared/game/Game.ts";

type Player = {
	id: string;
	ws: WebSocket;
	game: Game;
};

export class GameManager {
	private players: Map<string, Player> = new Map();

	addPlayer(clientID: string, ws: WebSocket): string {
		this.players.set(clientID, {
			id: clientID,
			ws,
			game: new Game()
		});

		return clientID;
	}

	removePlayer(id: string) {
		this.players.delete(id);
	}

	handleInput(id: string, msg: any) {
		const player = this.players.get(id);
		if (!player) return;

		const game = player.game;

		game.applyInput(msg);
	}

	update(UUID: string) {
		this.players.get(UUID)?.game.update();
		// this.players.forEach((player) => {
		// 	player.game.update();
		// });
	}

	broadcast(UUID: string) {
		const player = this.players.get(UUID);
		if (!player)
			return ;
		console.log("Sending to ", player.ws);
		player.ws.send(JSON.stringify({
			type: "STATE",
			state: player.game.getState()
		}));
		// this.players.forEach((player) => {
		// 	const state = player.game.getState();
		//
		// 	player.ws.send(JSON.stringify({
		// 		type: "STATE",
		// 		state
		// 	}));
		// });
	}
}
