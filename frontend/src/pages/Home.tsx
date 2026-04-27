import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { subscribe, send } from "../scripts/socket.ts";

import { useClient } from "../scripts/store.ts";

import { useTranslation } from "react-i18next";

import NameSetter from "../components/NameSetter.tsx";
import ColorSetter from "../components/ColorSetter.tsx";
import NameTag from "../components/NameTag.tsx";
import RoomTag from "../components/RoomTag.tsx";


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
	const {t, i18n} = useTranslation();
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
			<h2>{t('home.title')}</h2>
			<h3>{t('home.welcome')} <NameTag client={client}/></h3>
			<div>
				<h4> - {t('home.customization')} - </h4>
				<NameSetter />
				<div>-</div>
				<ColorSetter />
				<button onClick={() => localStorage.clear()}> {t('home.storage')} </button>
			</div>
			<div>
				<h4> - {t('home.room')} - </h4>
				<form action={joinRoom}>
					<input name="roomID"/>
					<button type="submit"> {t('home.join')} </button>
				</form>
				<button onClick={createRoom}>
					{t('home.create')}
				</button>
				<h5> - {t('home.list')} - </h5>
				{
					roomList?.map((room: Room, k) => {
						return (
							<div key={k}>
								<a onClick={() => {
									navToRoom(room.id);
								}}>
									<RoomTag room={room} as="div" clientCount/> 
									{/* modify to room name for easy translation */}
								</a>
							</div>
						);
					})
				}
				<button onClick={() => {
					askForRoomList();
				}}> {t('home.refresh')} </button>
			</div>
		</div>
	);
}
