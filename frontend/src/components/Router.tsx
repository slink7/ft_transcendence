import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Game from "../pages/Game.tsx"
import Home from "../pages/Home.tsx"
import Room from "../pages/Room.tsx"

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />}/>
				<Route path="/room/:roomID" element={<Room />}/>
				<Route path="/game" element={<Game />}/>
				<Route path="*" element={<Navigate to="/"/>}/>
			</Routes>
		</BrowserRouter>
	);
}
