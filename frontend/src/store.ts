import { create } from "zustand";

type Client = {
	id: string | null;
	name: string;
};

type Room = {
	id: string | null;
	clients: string[];
};

type Store = {
	client: Client;
	setClient: (client: Partial<Client>) => void;

	room: Room;
	setRoom: (room: Partial<Room>) => void;

	connected: boolean;
	setConnected: (v: boolean) => void;
};

export const useStore = create<Store>((set) => ({
	client: {
		id: null,
		name: "",
	},

	setClient: (client) =>
		set((state) => ({
			client: { ...state.client, ...client },
		})),

	room: {
		id: null,
		clients: [],
	},

	setRoom: (room) =>
		set((state) => ({
			room: { ...state.room, ...room },
		})),

	connected: false,
	setConnected: (v) => set({ connected: v }),
}));
