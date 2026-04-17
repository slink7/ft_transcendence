export type ClientMessage =
	| { type: "HELLO"; name?: string; clientID?: string }
	| { type: "CREATE_ROOM" }
	| { type: "JOIN_ROOM"; roomID: string }
	| { type: "QUIT_ROOM" }
	| { type: "GAME_INPUT"; input: string }

export type ServerMessage =
	| { type: "WELCOME"; clientID: string }
	| { type: "CREATED_ROOM"; roomID: string }
	| { type: "ROOM_INFO"; players: string[] }
	| { type: "GAME_STATE"; state: any }
