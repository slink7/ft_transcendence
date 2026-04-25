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
	const {t, i18n} = useTranslation();

	useEffect(() => {
		send({type: "JOIN_ROOM", roomID: roomID});

		const unsubErr = subscribe(() => {
			navigate(`/`);
		}, "ERROR");

		const unsubAck = subscribe((msg: ServerMessage) => {
			setRoom({ clients: msg.clients, owner: msg.owner, id: msg.id});
		}, "ROOM_INFO");

		return (() => {
			unsubErr();
			unsubAck();
		});
	}, []);

	return (
		<div>
			<RoomTag room={room} as="h2"/>
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
			<button onClick={() => navigate("/game")}>
				{t('room.start')}
			</button>
			<button onClick={() => {
				navigate("/")
			}}>
				{t('room.home')}
			</button>
			<button onClick={() => {
				send({ type: "QUIT_ROOM" });
				navigate("/")
			}}>
				{t('room.quit')}
			</button>
		</div>
	);
}
