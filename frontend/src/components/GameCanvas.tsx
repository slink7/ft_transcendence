import { useEffect, useRef, useState } from "react";
import * as CONF from "../game/Config";
import { createSocket } from "../game/useSocket";

type Cell = number;

type Piece = {
	shape: Cell[][];
	x: number;
	y: number;
};

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
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const socketRef = useRef<WebSocket | null>(null);
	const paletteRef = useRef(0);

	const [board, setBoard] = useState<Cell[][]>([]);
	const [piece, setPiece] = useState<Piece | null>(null);
	const [score, setScore] = useState(0);

	/**
	 * 🔌 WebSocket connection
	 */
	useEffect(() => {
		if (socketRef.current) return;

		socketRef.current = createSocket((msg: any) => {
			if (msg.type === "STATE") {
				setBoard(msg.state.board);
				setPiece(msg.state.piece);
				setScore(msg.state.score);
			}
		});

		return () => {
			socketRef.current?.close();
			socketRef.current = null;
		};
	}, []);

	/**
	 * 🎮 Inputs → backend
	 */
	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (!socketRef.current) return;

			const map: Record<string, string> = {
				ArrowLeft: "LEFT",
				ArrowRight: "RIGHT",
				ArrowDown: "DOWN",
				ArrowUp: "ROTATE",
			};

			if (map[e.key]) {
				console.log("Sending ", map[e.key]);
				socketRef.current.send(JSON.stringify({ type: map[e.key] }));
			}

			// 🎨 palette switch
			if (!isNaN(Number(e.key))) {
				paletteRef.current = Number(e.key) % CONF.PALETTES.length;
			}
		};

		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, []);

	/**
	 * 🎨 Rendering (canvas)
	 */
	useEffect(() => {
		if (!board || !piece) return;

		const canvas = canvasRef.current!;
		const ctx = canvas.getContext("2d")!;

		function drawGrid(
			grid: Cell[][],
			offsetX: number,
			offsetY: number,
			palette: string[]
		) {
			grid.forEach((row, y) => {
				row.forEach((cell, x) => {
					if (!cell) return;

					const realX = (offsetX + x) * CONF.CELL_SIZE;
					const realY = (offsetY + y) * CONF.CELL_SIZE;

					const color1 = palette[(cell - 1) % palette.length];
					const color2 = darkenColor(color1, 0.3);

					const grad = ctx.createRadialGradient(
						realX,
						realY,
						0.2,
						realX,
						realY,
						1.4 * CONF.CELL_SIZE
					);

					grad.addColorStop(0, color1);
					grad.addColorStop(1, color2);

					ctx.fillStyle = grad;
					ctx.fillRect(realX, realY, CONF.CELL_SIZE, CONF.CELL_SIZE);

					ctx.strokeStyle = color2;
					ctx.strokeRect(realX, realY, CONF.CELL_SIZE, CONF.CELL_SIZE);
				});
			});
		}

		function draw() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// grid lines
			ctx.fillStyle = "#404040";
			for (let y = 0; y <= CONF.HEIGHT; y++) {
				ctx.fillRect(0, y * CONF.CELL_SIZE - 1, CONF.REAL_WIDTH, 2);
			}
			for (let x = 0; x <= CONF.WIDTH; x++) {
				ctx.fillRect(x * CONF.CELL_SIZE - 1, 0, 2, CONF.REAL_HEIGHT);
			}

			const palette = CONF.PALETTES[paletteRef.current];

			drawGrid(board.grid, 0, 0, palette);
			drawGrid(piece.shape, piece.x, piece.y, palette);

			/**
			 * 🔥 Danger zone effect
			 */
			const dangerZone = 8;
			const dangerRows = board.grid
				.slice(0, dangerZone)
				.filter((row: Cell[]) => row.some((cell: Cell) => cell !== 0)).length;

			if (dangerRows > 0) {
				const coef = dangerRows / dangerZone;
				const pulse = Math.sin(Date.now() * 0.01 * coef) * 0.5 + 0.5;

				ctx.fillStyle = `rgba(255, 0, 0, ${0.05 + pulse * (0.15 * coef)})`;
				ctx.fillRect(0, 0, canvas.width, canvas.height);
			}
		}

		draw();
	}, [board, piece]);

	return (
		<div>
			<h2>Score: {score}</h2>
			<canvas
				ref={canvasRef}
				width={CONF.REAL_WIDTH}
				height={CONF.REAL_HEIGHT}
			/>
			<p> { JSON.stringify(board) } </p>
			<p> { JSON.stringify(piece) } </p>
			<p> { JSON.stringify(score) } </p>
		</div>
	);
}
