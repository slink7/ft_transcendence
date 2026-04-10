import { WIDTH, HEIGHT } from "./Config.ts"

export type Cell = number;

export class Board {
	grid: Cell[][];
	height: number = HEIGHT;
	width: number = WIDTH;

	constructor() {
		this.reset();
	}

	reset() {
		this.grid = Array.from({ length: this.height }, () =>
			Array(this.width).fill(0)
		);
	}
}
