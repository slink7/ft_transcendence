import { ClientManager } from "./ClientManager"
import { Game } from "/app/shared/game/Game.ts"

function randomID() {
	return (Math.random().toString(16).slice(2, 10).toUpperCase());
}

export type Room = {
	UUID:			string;
	clients:		string[];
	owner:			string;
	games:			Map<string, Game>
	gameStarted:	boolean;
};

export class RoomManager {
	private _rooms = new Map<string, Room>();

	createRoom(ownerID: string): string {
		const UUID = randomID();

		const room: Room = {
			UUID: UUID,
			clients: [],
			owner: ownerID,
			games: new Map<string, Game>(),
			gameStarted: false
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
		room.games.set(clientID, new Game());
		return (true);
	}

	quitRoom(clientID: string, roomID: string): boolean {
		const room = this._rooms.get(roomID);
		if (!room)
			return (false);
		room.clients = room.clients.filter((client) => {
			return (client !== clientID);
		});
		room.games.delete(clientID);
		if (room.clients.length < 1)
			this._rooms.delete(roomID);
		return (true);
	}

	deleteRoom(roomID: string) {
		return (this._rooms.delete(roomID));
	}

	getRoom(roomID: string) {
		return (this._rooms.get(roomID));
	}

	getRooms() {
		return (this._rooms);
	}
}
