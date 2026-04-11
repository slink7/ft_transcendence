import { WIDTH, HEIGHT } from "/app/shared/src/game/Config.ts";
import { Game } from "/app/shared/src/game/Game.ts";

export const PALETTES: string[][] = [
	["#00FFFF", "#FFFF00", "#AC00FF", "#FFA700", "#0000FF", "#FF0000", "#00FF00"], //Classique
	["#561D25", "#CE8147", "#ECDD7B", "#D3E298", "#CDE7BE"], //Pastel
	["#202020", "#4b5043", "#9bc4bc", "#d3ffe9", "#8ddbe0"], //Glacial
	["#2e1f27", "#854d27", "#dd7230", "#f4c95d", "#e7e393"], //Summer
]

const CELL_SIZE: number = 30;
const REAL_WIDTH: number = WIDTH * CELL_SIZE;
const REAL_HEIGHT: number = HEIGHT * CELL_SIZE;

function darkenColor(color: string, amount: number = 0.3): string {
	const hex = color.replace("#", "");

	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);

	const newR = Math.floor(r * (1 - amount));
	const newG = Math.floor(g * (1 - amount));
	const newB = Math.floor(b * (1 - amount));

	return `rgb(${newR}, ${newG}, ${newB})`;
}

export function draw(canvas: Canvas, ctx: CanvasRenderingContext2D, game: Game, paletteID: number) {
	function drawGrid(
		grid: Cell[][],
		offsetX: number,
		offsetY: number,
		palette: string[]
	) {
		grid.forEach((row, y) => {
			row.forEach((cell, x) => {
				if (!cell) return;

				const realX = (offsetX + x) * CELL_SIZE;
				const realY = (offsetY + y) * CELL_SIZE;

				const color1 = palette[(cell - 1) % palette.length];
				const color2 = darkenColor(color1, 0.3);

				const grad = ctx.createRadialGradient(
					realX,
					realY,
					0.2,
					realX,
					realY,
					1.4 * CELL_SIZE
				);

				grad.addColorStop(0, color1);
				grad.addColorStop(1, color2);

				ctx.fillStyle = grad;
				ctx.fillRect(realX, realY, CELL_SIZE, CELL_SIZE);

				ctx.strokeStyle = color2;
				ctx.strokeRect(realX, realY, CELL_SIZE, CELL_SIZE);
			});
		});
	}

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// grid lines
	ctx.fillStyle = "#404040";
	for (let y = 0; y <= HEIGHT; y++) {
		ctx.fillRect(0, y * CELL_SIZE - 1, REAL_WIDTH, 2);
	}
	for (let x = 0; x <= WIDTH; x++) {
		ctx.fillRect(x * CELL_SIZE - 1, 0, 2, REAL_HEIGHT);
	}

	const palette = PALETTES[paletteID];

	drawGrid(game.board.grid, 0, 0, palette);
	drawGrid(game.currentPiece.shape, game.currentPiece.x, game.currentPiece.y, palette);

	/**
	 * 🔥 Danger zone effect
	 */
	const dangerZone = 8;
	const dangerRows = game.board.grid
		.slice(0, dangerZone)
		.filter((row: Cell[]) => row.some((cell: Cell) => cell !== 0)).length;

	if (dangerRows > 0) {
		const coef = dangerRows / dangerZone;
		const pulse = Math.sin(Date.now() * 0.01 * coef) * 0.5 + 0.5;

		ctx.fillStyle = `rgba(255, 0, 0, ${0.05 + pulse * (0.15 * coef)})`;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
}
