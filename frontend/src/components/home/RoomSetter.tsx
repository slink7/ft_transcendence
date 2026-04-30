import { useTranslation } from "react-i18next";

import RoomGenerator from "./roomsetter/RoomGenerator.tsx";
import RoomList from "./roomsetter/RoomList.tsx";

export default function RoomSetter() {
	const { t } = useTranslation();
	return (
		<div>
			<h4> - {t('home.room')} - </h4>
			<RoomGenerator/>
			<RoomList/>
		</div>
	)
}

