import { useNavigate } from "react-router-dom";

import { useState } from "react"

export default function Home() {
	const navigate = useNavigate();

	function navToRoom(ID: string) {
		navigate(`/room/${ID}`);
	}

	const createRoom = () => {
		const fakeID = Math.random().toString(36).substring(7);

		navToRoom(fakeID);
	};

	const joinRoom = (formData) => {
		const ID = formData.get("roomID");

		navToRoom(ID);
	}

	const [clicks, setClicks] = useState(0);

	const clickplus = () => { clicks++; };

	return (
		<div>
			<h1> Home </h1>

			<form action={joinRoom}>
				<input name="roomID"/>
				<button type="submit"> Join </button>
			</form>
			<button onClick={createRoom}>
				Create room
			</button>
			<button onClick={setClicks}> You clicked {clicks} times </button>
		</div>
	);
}
