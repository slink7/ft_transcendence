import { WebSocket } from "ws";
import { randomUUID } from "crypto";

export type ClientState = "HOME" | "ROOM" | "GAME";

export type Client = {
	UUID: string;
	name: string;
	socket: WebSocket;
	connected: boolean;
	state: ClientState;
	roomID?: string;
	lastSeen: number;
};

export class ClientManager {
	private _clients = new Map<string, Client>();

	connect(socket: WebSocket, UUID?: string, name?: string): Client {
		if (UUID && this._clients.has(UUID)) {
			const client = this._clients.get(UUID)!;

			client.socket = socket;
			client.connected = true;
			client.lastSeen = Date.now();

			return (client);
		}

		UUID = randomUUID();

		const client: Client = {
			UUID: UUID,
			name: name || "Bababooey",
			socket: socket,
			connected: true,
			state: "HOME",
			lastSeen: Date.now()
		};

		this._clients.set(UUID, client);

		return (client);
	}

	disconnect(UUID: string): boolean {
		const client = this._clients.get(UUID);
		if (!client)
			return (false);

		client.connected = false;
		client.lastSeen = Date.now();

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
			this._clients.delete(client.UUID);
			removed++;
		});
		return (removed);
	}
}
