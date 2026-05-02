import { useEffect, useRef, useState } from "react";
import { GAME_CONFIG } from "/app/shared/config/game.ts"
import { CONFIG } from "../config.ts";

import { ClientGame } from "../scripts/ClientGame.ts"
import { draw } from "../scripts/Draw.ts"
// import { getSocket } from "./Socket.ts";

import type { ServerMessage, ClientMessage } from "/app/shared/types.ts"
import { subscribe, send } from "../scripts/socket.ts";

import { useClient, useRoom } from "../scripts/store.ts";

import NameTag from "../components/NameTag.tsx";

import Canvas from "./Canvas.tsx";

import { Game } from "/app/shared/game/Game.ts";

type Cell = number;

type Client = {
	id: string | null;
	name: string;
	color: string;
}

type Piece = {
	shape: Cell[][];
	x: number;
	y: number;
};

const REAL_WIDTH: number = GAME_CONFIG.WIDTH * CONFIG.CELL_SIZE;
const REAL_HEIGHT: number = GAME_CONFIG.HEIGHT * CONFIG.CELL_SIZE;

export default function GameCanvas() {

	const {client, setClient} = useClient();
	const {room} = useRoom();

	// const canvasRef = useRef<HTMLCanvasElement>(null);
	const paletteRef = useRef(0);

	const clientGameRef = useRef<ClientGame>(new ClientGame(room.seed));
	const secondaryGame = useRef<Game>(new Game());
	const leaderID = useRef("");
	const leader = useRef<Client>({id:"", name:"", color:""});

	const [states, setStates] = useState([]);

	let lastScore = -1;
	const [score, setScore] = useState(0);

	useEffect(() => {
		if (states.length <= 0)
			return ;
		leaderID.current = Object.keys(states).reduce((maxID, ID) => {
			return (states[ID].score > states[maxID].score ? ID : maxID);
		});
		leader.current = room.clients.filter((client) => {
			return (client.id === leaderID.current);
		})[0];
		secondaryGame.current.setState(states[leaderID.current]);
	}, [states]);

	/**
	 *  WebSocket
	 */
	useEffect(() => {
		const unsub0 = subscribe((msg: ServerMessage) => {
			setStates(msg.states);
			clientGameRef.current.applyServerState(msg.states[client.id]);
		}, "STATE");

		const unsub1 = subscribe((msg: ServerMessage) => {
			clientGameRef.current.confirmInput();
		}, "ACK");

		return () => {
			unsub0();
			unsub1();
		};
	}, []);

	/**
	 *  Inputs
	 */
	function registerGameInput(input: any) {
		if (!input.type)
			return ;
		send({type: "GAME_INPUT", input: input});
		clientGameRef.current.applyLocalInput(input);
	}

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
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

	const [scores, setScores] = useState([]);

	useEffect(() => {
		var out = [];

		Object.keys(states).forEach(function(key, index) {
			const client = room.clients.filter((client) => {
				return (client.id === key);
			})[0];
			if (!client) {
				return ;
			}
			out.push(
				<div key={index} style={{backgroundColor: ((states[key].isDead) ? "#FF7F7F" : "#7FFF7F")}}>
					<NameTag client={client} />
					{states[key].score}pts
				</div>
			);
		});

		setScores(out);
	}, [states]);

	/**
	 *  HTML return
	 */
	return (
		<div className="flex flex-col items-center gap-4">
			<h2 className="text-2xl font-bold bg-yellow-400 rounded-2xl px-4 py-2">Score : {clientGameRef.current.game.score}</h2>
			<div style={{display: "flex", gap: "10px"}}>
				<Canvas
					cell_size={20}
					game={clientGameRef.current.game}
					palette={paletteRef.current}
				/>
				<div>
					{
						room.clients.length > 1 && <>
							<div> Leader: <NameTag client={leader.current} /></div>
							{
								secondaryGame.current &&
								<Canvas
									cell_size={10}
									game={secondaryGame.current}
									palette={paletteRef.current}
								/>
							}
						</>
					}
				</div>
			</div>
			{
				room.clients.length > 1 && scores
			}
			{
				<div className="controls flex gap-4">
					<button className="transition text-4xl rounded" onClick={() => registerGameInput({ type: "LEFT" })}>⬅️</button>
					<button className="transition text-4xl rounded" onClick={() => registerGameInput({ type: "RIGHT" })}>➡️</button>
					<button className="transition text-4xl rounded" onClick={() => registerGameInput({ type: "ROTATE"})}>🔄</button>
					<button className="transition text-4xl rounded" onClick={() => registerGameInput({ type: "DOWN" })}>⬇️</button>
				</div>
			}
		</div>
	);
}
