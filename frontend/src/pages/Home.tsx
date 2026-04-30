import { useClient } from "../scripts/store.ts";

import { useTranslation } from "react-i18next";

import NameSetter from "../components/home/NameSetter.tsx";
import ColorSetter from "../components/home/ColorSetter.tsx";
import RoomSetter from "../components/home/RoomSetter.tsx"
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
	const {t, i18n} = useTranslation();
	const { client, setClient } = useClient();
	return (
		<div>
			<h3>{t('home.welcome')} <NameTag client={client}/></h3>
				<h4> - {t('home.customization')} - </h4>
				<NameSetter />
				<div>-</div>
				<ColorSetter />
				<button onClick={() => localStorage.clear()}> {t('home.storage')} </button>
			<RoomSetter/>
		</div>
	);
}
