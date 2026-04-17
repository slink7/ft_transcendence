
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useRef, useEffect } from "react"

import { useLocalStorage } from "./hooks/useLocalStorage.ts";

import Game from "./pages/Game.tsx"
import Home from "./pages/Home.tsx"
import Room from "./pages/Room.tsx"
import FieldSetter from "./components/FieldSetter.tsx";

import { CONFIG } from "./config.ts";

import { createName } from "./scripts/createName.ts";
import { connectSocket, subscribe, send } from "./components/socket.ts"
// import { ServerMessage } from "/app/shared/src/types.ts";

import { useClient, useState, useRoom } from "./store.ts";

type ServerMessage = {
  type: string;
  [key: string]: any;
};

export default function App() {
	// const [username, setUsername0] = useLocalStorage("username", createName());
	// const [UUID, setUUID] = useLocalStorage("UUID", "");

	const [client, setClient] = useClient();
	const [state, setState] = useState();
	const [room, setRoom] = useRoom();

	function setUsername(name: string) {
		setClient({name: name});
	}

	useEffect(() => {
		connectSocket();

		send({type: "HELLO", clientID: client.id});
		console.log("UUID: ", client.id);

		return (subscribe((msg: ServerMessage) => {
			console.log("Received:", JSON.stringify(msg));
		}));
	}, []);

	useEffect(() => {
		return (subscribe((msg: ServerMessage) => {
			if (msg.type === "WELCOME")
				// setUUID(msg.clientID);
				// useStore.getState().setClient({id: msg.clientID});
				setClient({id: msg.clientID});
		}, "WELCOME"));
	}, []);

	return (
		<div>
			<header>
				<p> Wextranscendence </p>
				<p> Current name: {client.name} </p>
				<p> UUID: {client.id} </p>
				<button onClick={() => { setUsername(createName()); }}> Set Random username </button>
				<FieldSetter fieldName="Username" setField={setUsername}/>
				<button onClick={() => { localStorage.clear(); }}> Reset local storage </button>
				<button onClick={() => { send({type: "STUFF"}) }}> Send stuff </button>
				<button onClick={() => { send({type: "HELLO", clientID: client.id}) }}> Log in </button>
			</header>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/room/:roomID" element={<Room />} />
					<Route path="/game" element={<Game />} />
					<Route path="*" element={<Navigate to="/"/>} />
				</Routes>
			</BrowserRouter>
			<footer> footer - 2026 </footer>
		</div>
	);
}
