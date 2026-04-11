import { useEffect, useRef, useState } from "react";
import { WIDTH, HEIGHT } from "/app/shared/src/game/Config.ts";
import { createSocket } from "../game/useSocket";
import { ClientGame } from "./ClientGame.ts"
import { draw } from "./Draw.ts"

type Cell = number;

type Piece = {
	shape: Cell[][];
	x: number;
	y: number;
};

const CELL_SIZE: number = 30;
const REAL_WIDTH: number = WIDTH * CELL_SIZE;
const REAL_HEIGHT: number = HEIGHT * CELL_SIZE;

export default function GameCanvas() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const socketRef = useRef<WebSocket | null>(null);
	const paletteRef = useRef(0);

	const clientGameRef = useRef<ClientGame>(new ClientGame());

	let lastScore = -1;
	const [score, setScore] = useState(0);

	/**
	 *  WebSocket
	 */
	useEffect(() => {
		if (socketRef.current) return;

		socketRef.current = createSocket((msg: any) => {
			if (msg.type === "STATE") {
				clientGameRef.current.applyServerState(msg.state);
			} else if (msg.type === "ACK") {
				clientGameRef.current.confirmInput();
			}
		});

		return () => {
			socketRef.current?.close();
			socketRef.current = null;
		};
	}, []);

	/**
	 *  Inputs
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

			const input = { type: map[e.key] };
			if (input.type) {
				socketRef.current.send(JSON.stringify(input));
				clientGameRef.current.applyLocalInput(input);
			}

			if (!isNaN(Number(e.key))) {
				paletteRef.current = Number(e.key) % PALETTES.length;
			}
		};

		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, []);

	/**
	 *  Rendering
	 */
	useEffect(() => {
		const canvas = canvasRef.current!;
		const ctx = canvas.getContext("2d")!;

		function loop() {

			const game = clientGameRef.current.game;
			if (game.board && game.currentPiece)
				draw(canvas, ctx, game, paletteRef.current);

			if (game.score != lastScore) {
				setScore(game.score);
				lastScore = game.score;
			}

			requestAnimationFrame(loop);
		}

		loop();
	}, []);

	/**
	 *  HTML return
	 */

	return (
		<div>
			<h2>Score: { clientGameRef.current.game.score}</h2>
			<canvas
				ref={canvasRef}
				width={REAL_WIDTH}
				height={REAL_HEIGHT}
			/>
			<p> { JSON.stringify(clientGameRef.current.game.board) } </p>
			<p> --- </p>
			<p> { JSON.stringify(clientGameRef.current.game.currentPiece) } </p>
			<p> --- </p>
			<p> { JSON.stringify(clientGameRef.current.game.score) } </p>
		</div>
	);
}
