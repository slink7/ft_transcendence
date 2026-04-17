import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { subscribe, send } from "../components/socket.ts";

import { useRoom } from "../store.ts";

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
			<p> Room ID: {roomID} </p>
			<p> {room.clients} </p>
			<ul>
				{ room.clients.map((client, i) => (
					<li key={i}> e: {client} </li>
				)) }
			</ul>
			<button onClick={() => navigate("/game")}>
				Start Game
			</button>
			<button onClick={() => {
				send({ type: "QUIT_ROOM" });
				navigate("/")
			}}>
				Back to Home
			</button>
		</div>

	);
}
