
import { CONFIG } from "../config.ts"

export function createSocket(onMessage: (msg: any) => void) {
	const socket = new WebSocket("ws://10.12.1.11:3000");//CONFIG.WS_URL);

	socket.onmessage = (event) => {
		const data = JSON.parse(event.data);
		onMessage(data);
	};

	return socket;
}
