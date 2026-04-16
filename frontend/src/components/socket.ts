
import { CONFIG } from "../config.ts"
// import type { ClientMessage } from "/app/shared/src/types.ts";
// import type { ServerMessage } from "/app/shared/src/types.ts";

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

let queue: any[] = [];

let isConnecting: boolean = false;
let hasConnected: boolean = false;

let sent = 0;

export function connectSocket(): WebSocket {
	if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
		console.log("Socket already connected");
		return (socket);
	}

	if (isConnecting) {
		console.log("Already connecting...")
		return (socket!);
	}

	const ws = new WebSocket(CONFIG.WS_URL);
	isConnecting = true;
	socket = ws;

	ws.onopen = () => {
		console.log("Socket successfully connected to ", CONFIG.WS_URL);
		isConnecting = false;

		if (!hasConnected) {
			console.log("Sending Hello...");
			ws.send(JSON.stringify({type: "HELLO"}));// send({type: "HELLO"});
			hasConnected = true;
			sent++;
			console.log("onopen HELLO | Sent: ", sent);
		}
		queue.forEach((msg) => {
			ws.send(JSON.stringify(msg));
			sent++;
			console.log("onopen queue | Sent: ", sent);
		});
		queue = [];
	};

	ws.onclose = () => {
		console.log("Closed socket");
		if (ws == socket)
			socket = null;
		isConnecting = false;
		hasConnected = false;
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
		console.log("onmessage | Sent: ", sent);
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
	sent++;
	console.log("send | Sent: ", sent);
}

export function subscribe(callback: (msg: ServerMessage) => void, type?: string) {
	const listener: Listeners = { type, callback };

	for (const l of listeners) {
		if (l.callback === callback && l.type === type) {
			return () => {};
		}
	}

	listeners.add(listener);
	console.log("Subscribe ", listeners.size);

	return (() => {
		listeners.delete(listener);
		console.log("Unsubscribe ", listeners.size);
	});
}
