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
		<div className="grow text-center flex flex-col gap-10 items-center justify-center">
			<h3 className="text-2xl font-bold">{t('home.welcome')} <NameTag client={client}/></h3>
			<div className="w-full max-w-md text-center flex flex-col gap-4 items-center justify-center">
				<h4 className="text-lg font-bold"> - {t('home.customization')} - </h4>
				<NameSetter />
				<ColorSetter />
			</div>
			<RoomSetter/>
			<button className="bg-dark-red-500 shadow-sm transition hover:bg-dark-red-600 text-yellow-50 py-2 px-4 rounded" onClick={() => localStorage.clear()}>
				{t('home.storage')}
			</button>
		</div>
	);
}
