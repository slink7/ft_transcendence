import { randomUUID } from "crypto";

import { ClientManager } from "./ClientManager"

export type Room = {
	UUID:		string;
	clients:	string[];
	owner:		string;
};

export class RoomManager {
	private _rooms = new Map<string, Room>();
	// private _clientManager: ClientManager;
	//
	// constructor(clientManager: ClientManager) {
	// 	this._clientManager = clientManager;
	// }

	createRoom(ownerID: string): string {
		const UUID = randomUUID();

		const room: Room = {
			UUID: UUID,
			clients: [],
			owner: ownerID
		};

		this._rooms.set(UUID, room);
		return (UUID);
	}

	joinRoom(clientID: string, roomID: string): boolean {
		const room = this._rooms.get(roomID);
		if (!room)
			return (false);
		if (room.clients.includes(clientID))
			return (true);
		room.clients.push(clientID);
		return (true);
	}

	quitRoom(clientID: string, roomID: string): boolean {
		const room = this._rooms.get(roomID);
		if (!room)
			return (false);
		room.clients = room.clients.filter((client) => {
			return (client === clientID);
		});
		return (true);
	}

	getRoom(roomID: string) {
		return (this._rooms.get(roomID));
	}
}
