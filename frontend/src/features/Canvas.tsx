
import { useRef, useEffect } from "react";

import { GAME_CONFIG } from "/app/shared/config/game.ts";
import { Game } from "/app/shared/game/Game.ts";

import { draw } from "../scripts/Draw.ts";

type Props = {
	cell_size:	number;
	game:		Game;
	palette:	number;
}

export default function Canvas({cell_size, game, palette = 0}: Props) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const REAL_WIDTH = game.board.width * cell_size;
	const REAL_HEIGHT = game.board.height * cell_size;

	useEffect(() => {
		const canvas = canvasRef.current!;
		const ctx = canvas.getContext("2d")!;

		function loop() {

			if (game.board && game.currentPiece)
				draw(canvas, ctx, game, palette, cell_size);

			requestAnimationFrame(loop);
		}

		loop();
	}, []);

	return (
		<canvas style={{width: REAL_WIDTH, height: REAL_HEIGHT}}
			ref={canvasRef}
			width={REAL_WIDTH}
			height={REAL_HEIGHT}
		/>
	);
}
