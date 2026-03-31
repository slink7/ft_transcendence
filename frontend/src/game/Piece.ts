import * as CONF from "./config.ts"

export class Piece {
	shape: number[][];
	x: number;
	y: number;

	constructor() {
		this.shape = this.cloneShape(CONF.SHAPES[Math.floor(Math.random() * CONF.SHAPES.length)]);
		let color: number = Math.floor(Math.random() * CONF.SHAPES.length) + 1;
		this.shape.forEach((row, y) => {
			row.forEach((value, x) => {
				this.shape[y][x] = value * color;
			})
		});
		this.x = 3;
		this.y = 0;
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

	clone(): Piece {
		const clone: Piece = new Piece();
		clone.x = this.x;
		clone.y = this.y;
		clone.shape = this.cloneShape(this.shape);
		return clone;
	}
}
