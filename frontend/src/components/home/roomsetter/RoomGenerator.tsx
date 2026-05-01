import { subscribe, send } from "../../../scripts/socket.ts";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"

export default function RoomGenerator() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [roomID, setRoomID] = useState<string | null>(null);

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
			console.log("SetRoomID");
		}, "CREATED_ROOM"));
	}, []);

	useEffect(() => {
		if (roomID)
			navToRoom(roomID);
	}, [roomID]);

	return (
		<button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-yellow-50 py-2 px-4" onClick={createRoom}>
			{t('home.create')}
		</button>
	)
}
