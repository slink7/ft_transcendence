import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { subscribe, send } from "../scripts/socket.ts";

import { useClient } from "../scripts/store.ts";

import NameSetter from "../components/NameSetter.tsx";
import ColorSetter from "../components/ColorSetter.tsx";
import NameTag from "../components/NameTag.tsx";


type Client = {
	name: string;
	color: string;
}

type Room = {
	owner: Client;
	id: string;
	clientCount: number;
}

export default function Home() {
	const navigate = useNavigate();
	const [roomID, setRoomID] = useState<string | null>(null);
	const { client, setClient } = useClient();
	const [roomList, setRoomList] = useState<Room[]>([]);

	function navToRoom(ID: string) {
		navigate(`/room/${ID}`);
	}

	const createRoom = () => {
		send({type: "CREATE_ROOM"});
	};

	const joinRoom = (formData: FormData) => {
		const ID = formData.get("roomID") || "";

		navToRoom(ID);
	};

	useEffect(() => {
		return (subscribe((msg: ServerMessage) => {
			setRoomID(msg.roomID);
		}, "CREATED_ROOM"));
	}, []);

	useEffect(() => {
		if (roomID)
			navToRoom(roomID);
	}, [roomID]);

	function askForRoomList() {
		send({type: "GET_ROOMS"});
	}

	useEffect(() => {
		askForRoomList();
		return (subscribe((msg: ServerMessage) => {
			setRoomList(msg.roomList);
		}, "ROOM_LIST"));
	}, []);

	return (
		<div>
			<h2> Home </h2>
			<h3> Welcome <NameTag client={client} /></h3>
			<div>
				<h4> - Customisation - </h4>
				<NameSetter />
				<div>-</div>
				<ColorSetter />
				<button onClick={() => localStorage.clear()}> Clear localStorage </button>
			</div>
			<div>
				<h4> - Rooms - </h4>
				<form action={joinRoom}>
					<input name="roomID"/>
					<button type="submit"> Join </button>
				</form>
				<button onClick={createRoom}>
					Create room
				</button>
				<h5> - Room list - </h5>
				{
					roomList?.map((room: Room, k) => {
						return (<div key={k}><a onClick={() => {
							navToRoom(room.id);
						}}> <NameTag client={room.owner} />'s room ({room.clientCount})</a></div>);
					})
				}
				<button onClick={() => {
					askForRoomList();
				}}> Refresh </button>
			</div>
		</div>
	);
}
