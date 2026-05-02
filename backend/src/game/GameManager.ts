import { WebSocket } from "ws";
import { Game } from "/app/shared/game/Game.ts";

type Player = {
	id: string;
	ws: WebSocket;
	game: Game;
};

export class GameManager {
	private players: Map<string, Player> = new Map();

	addPlayer(clientID: string, ws: WebSocket, seed: string): string {
		this.players.set(clientID, {
			id: clientID,
			ws,
			game: new Game(seed)
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
		const player = this.players.get(UUID);
		if (!player)
			return ;
		player.game.update();
		return (player.game.getState());
	}
}
