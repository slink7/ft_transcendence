import { useTranslation } from "react-i18next";

import RoomGenerator from "./roomsetter/RoomGenerator.tsx";
import RoomList from "./roomsetter/RoomList.tsx";

export default function RoomSetter() {
	const { t } = useTranslation();
	return (
		<div className="w-full max-w-md text-center flex flex-col gap-4 items-center justify-center">
			<h4 className="text-lg font-bold"> - {t('home.room')} - </h4>
			<RoomGenerator/>
			<RoomList/>
		</div>
	)
}

