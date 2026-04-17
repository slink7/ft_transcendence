
import { useRef, useEffect } from "react"

import { connectSocket, subscribe, send } from "./components/socket.ts"
import Header from "./components/Header.tsx";
import Router from "./components/Router.tsx";
import Footer from "./components/Footer.tsx";


import { useClient, useClientState, useRoom } from "./store.ts";

type ServerMessage = {
  type: string;
  [key: string]: any;
};

export default function App() {
	const {client, setClient} = useClient();

	useEffect(() => {
		connectSocket({type: "HELLO", clientID: client.id});

		send({ type: "SET_NAME", name: client.name });
		send({ type: "SET_COLOR", color: client.color});

		return (subscribe((msg: ServerMessage) => {
			console.log("Received:", JSON.stringify(msg));
		}));
	}, []);

	useEffect(() => {
		return (subscribe((msg: ServerMessage) => {
			setClient({id: msg.clientID});
		}, "WELCOME"));
	}, []);

	return (
		<div>
			<Header />
			<Router />
			<Footer />
		</div>
	);
}
