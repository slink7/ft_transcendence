import { useEffect, useRef, useState } from "react";
import { GAME_CONFIG } from "/app/shared/config/game.ts"
import { CONFIG } from "../config.ts";
import { createSocket } from "./useSocket";
import { ClientGame } from "./ClientGame.ts"
import { draw } from "./Draw.ts"

type Cell = number;

type Piece = {
	shape: Cell[][];
	x: number;
	y: number;
};

const REAL_WIDTH: number = GAME_CONFIG.WIDTH * CONFIG.CELL_SIZE;
const REAL_HEIGHT: number = GAME_CONFIG.HEIGHT * CONFIG.CELL_SIZE;

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
	function registerGameInput(input: any) {
		if (!input.type)
			return ;
		socketRef.current.send(JSON.stringify(input));
		clientGameRef.current.applyLocalInput(input);
	}

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
			if (input.type)
				registerGameInput(input);

			if (!isNaN(Number(e.key))) {
				paletteRef.current = Number(e.key) % CONFIG.PALETTES.length;
			}
		};

		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, []);

	useEffect(() => {
		let startX = 0;
		let startY = 0;

		const threshold = 30;

		const onClick = (e: TouchEvent) => {
			console.log("TourchStart");
			startX = e.touches[0].clientX;
			startY = e.touches[0].clientY;
		};

		const onTouchEnd = (e: TouchEvent) => {
			const dx = e.changedTouches[0].clientX - startX;
			const dy = e.changedTouches[0].clientY - startY;

			if (Math.abs(dx) > Math.abs(dy)) {
				if (dx > threshold) registerGameInput({ type: "RIGHT" });
				else if (dx < -threshold) registerGameInput({ type: "LEFT" });
			} else {
				if (dy > threshold) registerGameInput({ type: "DOWN" });
				else if (dy < -threshold) registerGameInput({ type: "ROTATE" });
			}
		};

		window.addEventListener("touchstart", onClick);
		window.addEventListener("touchend", onTouchEnd);

		return () => {
			window.removeEventListener("touchstart", onClick);
			window.removeEventListener("touchend", onTouchEnd);
		};
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
			<div className="controls">
				<button onClick={() => registerGameInput({ type: "LEFT" })}>⬅️</button>
				<button onClick={() => registerGameInput({ type: "RIGHT" })}>➡️</button>
				<button onClick={() => registerGameInput({ type: "ROTATE"})}>🔄</button>
				<button onClick={() => registerGameInput({ type: "DOWN" })}>⬇️</button>
			</div>
		</div>
	);
}
