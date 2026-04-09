
import { Board } from "./Board.ts"
import { Piece } from "./Piece.ts"

export class Game {
	score: number;

	board: Board;
	currentPiece: Piece;

	frame: number;

	constructor() {
		this.frame = 0;
		this.score = 0;
		this.board = new Board();
		this.currentPiece = new Piece(3, 0);
	}

	update() {
		if (this.frame++ % 20 != 19)
			return ;
		if (this.isValidPosition(this.currentPiece, 0, 1)) {
			this.currentPiece.y++;
		} else {
			this.lockPiece();
		}
	}

	lockPiece() {
		const piece: Piece = this.currentPiece;

		piece.shape.forEach((row, dy) => {
			row.forEach((value, dx) => {
				if (value) {
					this.board.grid[piece.y + dy][piece.x + dx] = value;
				}
			});
		});
		let clearedLines: number = this.clearLines();
		this.score += 10 * clearedLines * clearedLines;
		this.currentPiece = new Piece();
		if (!this.isValidPosition(this.currentPiece, 0, 0))
			this.board.reset();
	}

	isValidPosition(
		piece: Piece,
		offsetX: number = 0,
		offsetY: number = 0
	): boolean {
		return piece.shape.every((row: Cell[], dy: number) => {
			return row.every((value: Cell, dx: number) => {
				if (!value)
					return true;

				const x: number = piece.x + dx + offsetX;
				const y: number = piece.y + dy + offsetY;

				if (x < 0 || x >= this.board.width)
					return false;

				if (y >= this.board.height)
					return false;

				if (y < 0)
					return true;

				if (this.board.grid[y][x])
					return false;

				return true;
			});
		});
	}
	
	clearLines(): number {
		let linesCleared: number = 0;

		this.board.grid = this.board.grid.filter(row => {
			const isFull = row.every(cell => cell !== 0);
			if (isFull) linesCleared++;
			return !isFull;
		});

		while (this.board.grid.length < this.board.height) {
			this.board.grid.unshift(Array(this.board.width).fill(0));
		}

		return linesCleared;
	}
	move(dx: number, dy: number) {
		if (!this.isValidPosition(this.currentPiece, dx, dy))
			return ;
		this.currentPiece.x += dx;
		this.currentPiece.y += dy;
	}

	rotate() {
		this.currentPiece.rotate();
	}

	getState() {
		return {
			score: this.score,
			piece: this.currentPiece,
			board: this.board
		};
	}
}
