export function createSocket(onMessage: (msg: any) => void) {
	const socket = new WebSocket("ws://192.168.1.25:3000");

	socket.onmessage = (event) => {
		const data = JSON.parse(event.data);
		onMessage(data);
	};

	return socket;
}
