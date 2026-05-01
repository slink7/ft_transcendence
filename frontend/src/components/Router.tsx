import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

import Game from "../pages/Game.tsx"
import Home from "../pages/Home.tsx"
import Room from "../pages/Room.tsx"
import Login from "../pages/Login.tsx"

import { useAuth } from "../auth/AuthContext.tsx";

function ProtectedRoute({ isAuthenticated }: { isAuthenticated: boolean }) {
	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}
	return <Outlet />;
}

export default function Router() {
	const { isAuthenticated } = useAuth();
	return (
		<BrowserRouter>
			<div className="w-screen h-screen flex flex-col gap-8 bg-yellow-50 font-wide">
				<Header />
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
						<Route path="/" element={<Home />} />
						<Route path="/room/:roomID" element={<Room />} />
						<Route path="/game" element={<Game />} />
					</Route>
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
}