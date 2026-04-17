import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { subscribe, send } from "../components/socket.ts";

export default function Room() {
	const { roomID } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		send({type: "JOIN_ROOM", roomID: roomID});

		return (subscribe(() => {
			navigate(`/`);
		}, "ERROR"));
	}, []);

	return (
		<div>
			<h1> Room </h1>
			<p> Room ID: {roomID} </p>
			<button onClick={() => navigate("/game")}>
				Start Game
			</button>
			<button onClick={() => navigate("/")}>
				Back to Home
			</button>
		</div>

	);
}
