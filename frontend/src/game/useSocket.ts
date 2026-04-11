export function createSocket(onMessage: (msg: any) => void) {
	const socket = new WebSocket("ws://localhost:3000");

	socket.onmessage = (event) => {
		const data = JSON.parse(event.data);
		onMessage(data);
	};

	return socket;
}
