import { subscribe, send } from "../../../scripts/socket.ts";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import RoomTag from "../../../components/RoomTag.tsx";

type Room = {
	owner: Client;
	id: string;
	clientCount: number;
}

export default function RoomList() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [roomID, setRoomID] = useState<string | null>(null);
	const [roomList, setRoomList] = useState<Room[]>([]);

	function navToRoom(ID: string) {
		navigate(`/room/${ID}`);
	}

	useEffect(() => {
		if (roomID)
			navToRoom(roomID);
	}, [roomID]);
	
	useEffect(() => {
		return (subscribe((msg: ServerMessage) => {
			setRoomID(msg.roomID);
		}, "CREATED_ROOM"));
	}, []);

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
			<h5> - {t('home.list')} - </h5>
			{
				roomList?.map((room: Room, k) => {
					return (
						<div key={k}>
							<a onClick={() => {navToRoom(room.id)}}>
								<RoomTag room={room} as="div" clientCount/> 
								{/* modify to room name for easy translation */}
							</a>
						</div>
					);
				})
			}
			<button onClick={() => {askForRoomList()}}>
				{t('home.refresh')}
			</button>
		</div>
	)
}
