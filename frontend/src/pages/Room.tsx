import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { subscribe, send } from "../scripts/socket.ts";
import NameTag from "../components/NameTag.tsx";

import { useRoom } from "../scripts/store.ts";

export default function Room() {
	const { roomID } = useParams();
	const navigate = useNavigate();
	const {room, setRoom} = useRoom();

	useEffect(() => {
		send({type: "JOIN_ROOM", roomID: roomID});

		const unsubErr = subscribe(() => {
			navigate(`/`);
		}, "ERROR");

		const unsubAck = subscribe((msg: ServerMessage) => {
			setRoom({ clients: msg.players });
		}, "ROOM_INFO");

		return (() => {
			unsubErr();
			unsubAck();
		});
	}, []);

	return (
		<div>
			<h1> Room </h1>
			<p>
				Room ID: {roomID}
				<button onClick={() => {
					navigator.clipboard.writeText(roomID || "");
				}}>
					Copy
				</button>
			</p>
			<h5> Players: </h5>
				{
					room.clients.map((client, k) => (
						<NameTag key={k} client={client} as="h3"/>
					))
				}
			<button onClick={() => navigate("/game")}>
				Start Game
			</button>
			<button onClick={() => {
				navigate("/")
			}}>
				Back to Home
			</button>
			<button onClick={() => {
				send({ type: "QUIT_ROOM" });
				navigate("/")
			}}>
				Quit room
			</button>
		</div>
	);
}
