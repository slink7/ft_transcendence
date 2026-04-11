import { GAME_CONFIG } from "../../config/game.ts"

export class Piece {
	shape: number[][];
	x: number;
	y: number;


	constructor(x0: number = 0, y0: number = 0) {
		this.shape = this.cloneShape(GAME_CONFIG.SHAPES[Math.floor(Math.random() * GAME_CONFIG.SHAPES.length)]);
		let color: number = Math.floor(Math.random() * GAME_CONFIG.SHAPES.length) + 1;
		this.shape.forEach((row, y) => {
			row.forEach((value, x) => {
				this.shape[y][x] = value * color;
			})
		});
		this.x = x0;
		this.y = y0;
	}

	rotate() {
		//TODO Add wallkick
		const W: number = this.shape.length;
		const H: number = this.shape[0].length;

		const newShape: number[][] = [];

		for (let y = 0; y < H; y++) {
			newShape[y] = [];
				for (let x = 0; x < W; x++) {
				newShape[y][x] = this.shape[W - x - 1][y];
			}
		}

		this.shape = newShape;
	}

	cloneShape(shape: number[][]): number[][] {
		return shape.map(row => [...row]);
	}

	set(data: any) {
		this.x = data.x;
		this.y = data.y;
		this.shape = this.cloneShape(data.shape);
	}

	clone(): Piece {
		const clone: Piece = new Piece();
		clone.x = this.x;
		clone.y = this.y;
		clone.shape = this.cloneShape(this.shape);
		return clone;
	}
}
