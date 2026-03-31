import { useEffect, useRef, useState } from "react";
import { Game } from "../game/Game";

import * as CONF from "../game/config.ts"


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

export default function GameCanvas() {
	const canvasRef: HTMLCanvasElement = useRef<HTMLCanvasElement>(null);
	const gameRef: Game = useRef<Game | null>(null);
	const [score, setScore] = useState(0);
	const paletteRef = useRef(0);

	/**
	 *		Initialisation
	 *			&
	 *		Game Loop
	 */

	useEffect(() => {
		const canvas: Canvas = canvasRef.current!;
		const ctx = canvas.getContext("2d")!;

		gameRef.current = new Game();
		const game = gameRef.current;

		let lastTime = 0;
		let dropCounter = 0;
		const dropInterval = 500;

		function draw() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			ctx.fillStyle = "#404040";
			for (let y: number = 0; y <= CONF.HEIGHT; ++y)
				ctx.fillRect(0, y * CONF.CELL_SIZE - 1, CONF.REAL_WIDTH, 2);
			for (let x: number = 0; x <= CONF.WIDTH; ++x)
				ctx.fillRect(x * CONF.CELL_SIZE - 1, 0, 2, CONF.REAL_HEIGHT);

			function drawGrid(grid: Cell[][], x0: number, y0: number, palette: string[]) {
				grid.forEach((row: Cell[], y: number) => {
					const realY = (y0 + y) * CONF.CELL_SIZE;
					row.forEach((cell: Cell, x: number) => {
						if (cell == 0)
							return ;
						const realX = (x0 + x) * CONF.CELL_SIZE;
						const color1 = palette[(cell - 1) % palette.length];
						const color2 = darkenColor(color1, 0.3);
						// const gradBack = ctx.createLinearGradient(realX, realY, realX + CONF.CELL_SIZE, realY + CONF.CELL_SIZE);
						const gradBack = ctx.createRadialGradient(realX, realY, 0.2, realX, realY, 1.4 * CONF.CELL_SIZE);
						gradBack.addColorStop(0, color1);
						gradBack.addColorStop(1, color2);
						ctx.fillStyle = gradBack;
						ctx.fillRect(
							realX,
							realY,
							CONF.CELL_SIZE,
							CONF.CELL_SIZE
						);
						ctx.strokeStyle = color2;
						ctx.strokeRect(
							realX,
							realY,
							CONF.CELL_SIZE,
							CONF.CELL_SIZE
						);
					});
				});
			}
			const pal: string[] = CONF.PALETTES[paletteRef.current];
			drawGrid(game.board.grid, 0, 0, pal);
			drawGrid(game.currentPiece.shape, game.currentPiece.x, game.currentPiece.y, pal);

			const dangerZone = 8;
			const danger = game.board.grid.slice(0, dangerZone).filter(row => row.some(cell => cell !== 0)).length;
			const dangerCoef = danger / dangerZone;

			if (danger) {
				const pulse = Math.sin(Date.now() * 0.01 * dangerCoef) * 0.5 + 0.5;

				ctx.fillStyle = `rgba(255, 0, 0, ${0.05 + pulse * (0.1 * dangerCoef)})`;
				ctx.fillRect(0, 0, canvas.width, canvas.height);
			}
		}

		function loop(time: number) {
			const delta = time - lastTime;
			lastTime = time;

			dropCounter += delta;

			if (dropCounter > dropInterval) {
				game.update();
				setScore(game.score)
				dropCounter = 0;
			}

			draw();

			requestAnimationFrame(loop);
		}

		requestAnimationFrame(loop);
	}, []);

	/**
	 *				Player Inputs
	 */

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			const game: Game = gameRef.current;
			if (!game) return;

			const inputs = [
				["ArrowLeft", () => { game.currentPiece.x--; }],
				["ArrowRight", () => { game.currentPiece.x++; }],
				["ArrowDown", () => { game.currentPiece.y++; }],
				["ArrowUp", () => { game.currentPiece.rotate(); }],
				["d", () => { console.log(game.currentPiece.shape); }]
			];

			inputs.forEach((value) => {
				if (e.key === value[0]) {
					const oldPiece = game.currentPiece.clone();

					value[1]();
					if (!game.isValidPosition(game.currentPiece, 0, 0))
						game.currentPiece = oldPiece;
				}
			});

			if (Number(e.key) >= 0 && Number(e.key) < CONF.PALETTES.length)
				paletteRef.current = Number(e.key);
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<div>
			<h2> Score: {score} </h2>
			<canvas ref={canvasRef} width={CONF.REAL_WIDTH} height={CONF.REAL_HEIGHT} />
		</div>
	);
}
