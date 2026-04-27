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

	return (
		<Tag>
			<NameTag client={room.owner} as="span"/>'s room {clientCount && <span> ({room.clients.length}) </span>}
		</Tag>
	);
}
