import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { subscribe, send } from "../components/socket.ts";

import { useStore } from "../store.ts";

export default function Home() {
	const navigate = useNavigate();
	const [roomID, setRoomID] = useState<string | null>(null);
	const clientID = useStore((state) => state.client.id);
	const clientName = useStore((state) => state.client.name);

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
			<h3> Welcome {clientName} </h3>
			<form action={joinRoom}>
				<input name="roomID"/>
				<button type="submit"> Join </button>
			</form>
			<p> ClientID in HOME: {clientID} </p>
			
			<button onClick={createRoom}>
				Create room
			</button>
		</div>
	);
}
