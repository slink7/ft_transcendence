import { WebSocket } from "ws";
import { randomUUID } from "crypto";

export type ClientState = "HOME" | "ROOM" | "GAME";

export type Client = {
	UUID: string;
	name: string;
	color: string;
	socket: WebSocket;
	connected: boolean;
	state: ClientState;
	roomID?: string;
	lastSeen: number;
};

export class ClientManager {
	private _clients = new Map<string, Client>();
	private _disconnectTimers = new Map<string, ReturnType<typeof setTimeout>>();

	connect(socket: WebSocket, UUID?: string, name?: string): Client {
		if (UUID && this._clients.has(UUID)) {
			return (this.reconnect(UUID, socket)!);
		}

		UUID = randomUUID();

		const client: Client = {
			UUID: UUID,
			name: name || "Bababooey",
			color: "#7F007F",
			socket: socket,
			connected: true,
			state: "HOME",
			lastSeen: Date.now()
		};

		this._clients.set(UUID, client);

		return (client);
	}

	reconnect(UUID: string, socket: WebSocket): Client | null {
		const client = this._clients.get(UUID);
		if (!client)
			return (null);

		const timer = this._disconnectTimers.get(UUID);
		if (timer) {
			clearTimeout(timer);
			this._disconnectTimers.delete(UUID);
		}

		client.socket = socket;
		client.connected = true;
		client.lastSeen = Date.now();

		return (client);
	}

	disconnect(
		UUID: string,
		onExpired?: (client: Client) => void,
		timeout: number = 5000
	): boolean {
		const client = this._clients.get(UUID);
		if (!client)
			return (false);

		client.connected = false;
		client.lastSeen = Date.now();

		const previousTimer = this._disconnectTimers.get(UUID);
		if (previousTimer)
			clearTimeout(previousTimer);

		if (onExpired) {
			const timer = setTimeout(() => {
				this._disconnectTimers.delete(UUID);
				onExpired(client);
			}, timeout);
			this._disconnectTimers.set(UUID, timer);
		}

		return (true);
	}

	getClient(UUID: string): Client | undefined {
		return (this._clients.get(UUID));
	}

	getClients(): Map<string, Client> {
		return (this._clients);
	}

	cleanup(timeout: number = 10000): number {
		const now = Date.now();
		let removed: number = 0;

		this._clients.forEach((client) => {
			if (client.connected)
				return ;
			if (now - client.lastSeen <= timeout)
				return ;
			const timer = this._disconnectTimers.get(client.UUID);
			if (timer) {
				clearTimeout(timer);
				this._disconnectTimers.delete(client.UUID);
			}
			this._clients.delete(client.UUID);
			removed++;
		});
		return (removed);
	}
}
