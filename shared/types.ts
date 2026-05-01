export type Client = {
	id?: string | null;
	name: string;
	color: string;
	user: string;
	password: string;
}

export type Room = {
	id: string | null;
	clients: Client[];
	owner: Client;
	clientCount?: number;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
};

export type GameInput =
	| { type: "LEFT" }
	| { type: "RIGHT" }
	| { type: "DOWN" }
	| { type: "ROTATE" }

export type ClientMessage =
	| { type: "HELLO"; name?: string; clientID?: string }
	| { type: "GET_ROOMS" }
	| { type: "CREATE_ROOM" }
	| { type: "JOIN_ROOM"; roomID: string }
	| { type: "QUIT_ROOM" }
	| { type: "SET_NAME", name: string }
	| { type: "SET_COLOR", color: string }
	| { type: "GAME_INPUT"; input: GameInput }

export type ServerMessage =
	| { type: "ERROR"; message: string }
	| { type: "ACK" }
	| { type: "WELCOME"; clientID: string }
	| { type: "CREATED_ROOM"; roomID: string }
	| { type: "ROOM_INFO"; id: string, owner: Client, clients: Client[], clientCount: number }
	| { type: "GAME_STATE"; state: any }
	| { type: "ROOM_LIST"; roomList: Room[] }
	| { type: "UNKNOWN"; value: string }
