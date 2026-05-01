import { send } from "../../../scripts/socket.ts";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function RoomGenerator() {
	const { t } = useTranslation();
	const navigate = useNavigate();

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

	return (
		<form className="flex items-center border-2 border-black-800 rounded" action={joinRoom}>
			<input className="py-2 px-4 bg-white" name="roomID"/>
			<button className="bg-yellow-500 hover:bg-yellow-600 text-yellow-50 py-2 px-4" onClick={createRoom}>
				{t('home.create')}
			</button>
		</form>
	)
}
