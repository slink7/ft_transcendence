export type Client = {
	id: string | null;
	name: string;
	color: string;
}

export type Room = {
	id: string | null;
	clients: Client[];
	owner: Client;
}

export type ClientMessage =
	| { type: "HELLO"; name?: string; clientID?: string }
	| { type: "GET_ROOMS" }
	| { type: "CREATE_ROOM" }
	| { type: "JOIN_ROOM"; roomID: string }
	| { type: "QUIT_ROOM" }
	| { type: "SET_NAME", name: string }
	| { type: "SET_COLOR", color: string }
	| { type: "GAME_INPUT"; input: string }

export type ServerMessage =
	| { type: "ERROR"; message: string }
	| { type: "ACK" }
	| { type: "WELCOME"; clientID: string }
	| { type: "CREATED_ROOM"; roomID: string }
	| { type: "ROOM_INFO"; owner: Client, clients: Client[] }
	| { type: "GAME_STATE"; state: any }
	| { type: "ROOM_LIST"; roomList: Room[] }
