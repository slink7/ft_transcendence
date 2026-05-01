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
	const [roomList, setRoomList] = useState<Room[]>([]);

	function navToRoom(ID: string) {
		navigate(`/room/${ID}`);
	}



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
			<h4 className="text-lg font-bold"> - {t('home.list')} - </h4>
			{
				roomList?.map((room: Room, k) => {
					return (
						<div key={k} className="mb-2">
							<a
								className="block cursor-pointer rounded-lg border border-yellow-200 bg-white px-3 py-2 shadow-sm transition hover:border-yellow-500 hover:bg-yellow-50"
								onClick={() => {navToRoom(room.id)}}
							>
								<RoomTag room={room} as="div" clientCount/>
								{/* modify to room name for easy translation */}
							</a>
						</div>
					);
				})
			}
			<button className="bg-yellow-500 hover:bg-yellow-600 text-yellow-50 py-2 px-4 rounded" onClick={() => {askForRoomList()}}>
				{t('home.refresh')}
			</button>
		</div>
	)
}
