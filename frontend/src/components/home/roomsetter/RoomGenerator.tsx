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
		<div>
			<form action={joinRoom}>
				<input name="roomID"/>
				<button onClick={createRoom}>
					{t('home.create')}
				</button>
			</form>
		</div>
	)
}
