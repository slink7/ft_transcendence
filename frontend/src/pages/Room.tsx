import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { subscribe, send } from "../scripts/socket.ts";
import NameTag from "../components/NameTag.tsx";
import RoomTag from "../components/RoomTag.tsx";

// import type { ServerMessage } from "../../../shared/types.ts";

import { useTranslation } from "react-i18next";

import { useRoom } from "../scripts/store.ts";

export default function Room() {
	const { roomID } = useParams();
	const navigate = useNavigate();
	const {room, setRoom} = useRoom();
	const {t} = useTranslation();

	useEffect(() => {
		send({type: "JOIN_ROOM", roomID: roomID});

		const unsubErr = subscribe(() => {
			navigate(`/`);
		}, "ERROR");

		const unsubAck = subscribe((msg: ServerMessage) => {
			setRoom({ clients: msg.clients, owner: msg.owner, id: msg.id});
		}, "ROOM_INFO");

		const unsubStart = subscribe((msg: ServerMessage) => {
			if (msg.type === "GAME_START")
				navigate('/game');
		}, "GAME_START");

		return (() => {
			unsubErr();
			unsubAck();
			unsubStart();
		});
	}, []);

	return (
		<div className="grow text-center flex flex-col gap-10 items-center justify-center">
			<div className="text-2xl font-bold">
				<RoomTag room={room} as="h2"/>
			</div>
			<p>
				<span> {t('room.id')} {roomID} </span>
				<button onClick={() => {
					navigator.clipboard.writeText(roomID || "");
				}}>
					{t('room.copy')}
				</button>
			</p>
			<h5> {t('room.players')}: </h5>
				{
					room && room.clients.map((client, k) => (
						<NameTag key={k} client={client} as="h3"/>
					))
				}
			<button className="bg-orange-500 shadow-sm transition hover:bg-orange-600 text-yellow-50 py-2 px-4 rounded"
				onClick={() => send({ type: "START_GAME" })}>
				{t('room.start')}
			</button>
			<div className="flex gap-4">
				<button className="bg-blue-500 shadow-sm transition hover:bg-blue-600 text-yellow-50 py-2 px-4 rounded" onClick={() => {
					navigate("/")
				}}>
					{t('room.home')}
				</button>
				<button className="bg-dark-red-500 shadow-sm transition hover:bg-dark-red-600 text-yellow-50 py-2 px-4 rounded" onClick={() => {
					send({ type: "QUIT_ROOM" });
					navigate("/")
				}}>
					{t('room.quit')}
				</button>
			</div>
		</div>
	);
}
