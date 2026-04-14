
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react"

import Game from "./pages/Game.tsx"
import Home from "./pages/Home.tsx"
import Room from "./pages/Room.tsx"

import FieldSetter from "./components/FieldSetter.tsx";
// import GameCanvas from "./components/GameCanvas";

import { createName } from "./scripts/createName.ts";

export default function App() {
	const [username, setUsername] = useState(createName());

	return (
		<div>
			<header>
				<p> Wextranscendence </p>
				<p> Current name: {username} </p>
				<button onClick={() => { setUsername(createName()) }}> Set Random username </button>
				<FieldSetter name="Username" setField={setUsername}> </FieldSetter>
			</header>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/room/:roomID" element={<Room />} />
					<Route path="/game" element={<Game />} />
				</Routes>
			</BrowserRouter>
			<footer> footer - 2026 </footer>
		</div>
	);
}
