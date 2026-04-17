import { create } from "zustand";
import { persist } from "zustand/middleware"

type Client = {
	id: string | null;
	name: string;
};

type Room = {
	id: string | null;
	clients: string[];
};

type State = "HOME" | "ROOM" | "GAME";

type Store = {
	client: Client;
	setClient: (client: Partial<Client>) => void;

	room: Room;
	setRoom: (room: Partial<Room>) => void;

	connected: boolean;
	setConnected: (v: boolean) => void;

	state: State;
	setState: (state: State) => void;
};

export const useStore = create<Store>(persist((set) => ({
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

	state: "HOME",
	setState: (v: State) => set({ state: v }),
}), {
		name: "app-storage",
		partialize: (state) => ({
			client: state.client
		})
	}));

export function useClient() {
	return [
		useStore((s) => s.client),
		useStore((s) => s.setClient)
	];
}

export function useRoom() {
	return [
		useStore((s) => s.room),
		useStore((s) => s.setRoom)
	];
}

export function useState() {
	return [
		useStore((s) => s.state),
		useStore((s) => s.setState)
	]
}
