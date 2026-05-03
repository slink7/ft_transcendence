import { useTranslation } from "react-i18next";

import NameTag from "./NameTag.tsx";

type Client = {
	name: string,
	color: string
}

type Room = {
	owner: Client,
	clients: Client[]
}

type Props = {
	room: Room,
	as?: keyof JSX.IntrinsicElements,
	clientCount?: boolean
}

export default function RoomTag({room, as = "span", clientCount = false}: Props) {
	const Tag = as;
	const {t} = useTranslation();

	return (
		<Tag>
			{t("room.owner_prefix")}<NameTag client={room.owner} as="span"/>{t("room.owner_suffix")} {clientCount && <span> (connected : {room.clients.length}) </span>}
		</Tag>
	);
}
