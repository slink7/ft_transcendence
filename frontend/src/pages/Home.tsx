import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { subscribe, send } from "../components/socket.ts";

import { useClient } from "../store.ts";
import { createName } from "../scripts/createName.ts";

import NameSetter from "../components/NameSetter.tsx";

export default function Home() {
	const navigate = useNavigate();
	const [roomID, setRoomID] = useState<string | null>(null);
	const { client, setClient } = useClient();

	function navToRoom(ID: string) {
		navigate(`/room/${ID}`);
	}

	const createRoom = () => {
		send({type: "CREATE_ROOM"});
	};

	const joinRoom = (formData: FormData) => {
		const ID = formData.get("roomID");

		navToRoom(ID);
	}

	useEffect(() => {
		return (subscribe((msg: ServerMessage) => {
			setRoomID(msg.roomID);
		}, "CREATED_ROOM"));
	}, []);

	useEffect(() => {
		if (roomID)
			navToRoom(roomID);
	}, [roomID]);

	return (
		<div>
			<h1> Home </h1>
			<h2> Welcome {client.name} </h2>
			<div>
				<h3> - Customisation - </h3>
				<NameSetter />
			</div>
			<h3> - Rooms - </h3>
			<form action={joinRoom}>
				<input name="roomID"/>
				<button type="submit"> Join </button>
			</form>
			<button onClick={createRoom}>
				Create room
			</button>
		</div>
	);
}
