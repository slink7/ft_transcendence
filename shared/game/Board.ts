import { GAME_CONFIG } from "../config/game.ts"

export type Cell = number;

export class Board {
	grid: Cell[][];
	height: number = GAME_CONFIG.HEIGHT;
	width: number = GAME_CONFIG.WIDTH;

	constructor() {
		this.reset();
	}

	reset() {
		this.grid = Array.from({ length: this.height }, () =>
			Array(this.width).fill(0)
		);
	}
}
