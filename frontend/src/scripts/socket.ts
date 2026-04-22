
import { CONFIG } from "../config.ts"

type ServerMessage = {
  type: string;
  [key: string]: any;
};

type ClientMessage = {
  type: string;
  [key: string]: any;
};

export type Listeners = {
	type?: string;
	callback: (msg: ServerMessage) => void;
}

let socket: WebSocket | null = null;

const listeners: Set<Listeners> = new Set();

let queue: ClientMessage[] = [];

export function connectSocket(greeting: ClientMessage): WebSocket {
	if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
		console.log("Socket already connected");
		return (socket);
	}

	const ws = new WebSocket(CONFIG.WS_URL);
	socket = ws;
	queue.push(greeting);

	ws.onopen = () => {
		console.log("Socket successfully connected to ", CONFIG.WS_URL);
		queue.forEach((msg) => {
			ws.send(JSON.stringify(msg));
		});
		queue = [];
	};

	ws.onclose = () => {
		console.log("Closed socket");
		if (ws == socket)
			socket = null;
	};

	ws.onerror = (error) => {
		console.log("Socket error: ", error);
	}

	ws.onmessage = (event) => {
		try {
			const msg: ServerMessage = JSON.parse(event.data);

			listeners.forEach((listener) => {
				if (!listener.type || listener.type === msg.type)
					listener.callback(msg);
			});
		} catch (error) {
			console.log("Socket onmessage error: ", error);
		}
	};

	return (ws);
}

export function getSocket(): WebSocket | null {
	return (socket);
}

export function send(msg: ClientMessage) {
	if (!socket || socket.readyState !== WebSocket.OPEN) {
		queue.push(msg);
		return ;
	}
	socket.send(JSON.stringify(msg));
}

export function subscribe(callback: (msg: ServerMessage) => void, type?: string) {
	const listener: Listeners = { type, callback };

	for (const l of listeners) {
		if (l.callback === callback && l.type === type) {
			return () => {};
		}
	}

	listeners.add(listener);

	return (() => {
		listeners.delete(listener);
	});
}
