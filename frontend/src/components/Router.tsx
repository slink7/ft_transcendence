import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

import Game from "../pages/Game.tsx"
import Home from "../pages/Home.tsx"
import Room from "../pages/Room.tsx"

export default function Router() {
	return (
		<BrowserRouter>
			<div className="w-screen h-screen flex flex-col gap-8 bg-yellow-50 font-wide">
				<Header/>
				<Routes>
					<Route path="/" element={<Home />}/>
					<Route path="/room/:roomID" element={<Room />}/>
					<Route path="/game" element={<Game />}/>
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
				<Footer/>
			</div>
		</BrowserRouter>
	);
}
