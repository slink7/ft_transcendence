import { useNavigate } from "react-router-dom";

import GameCanvas from "../components/GameCanvas.tsx";

export default function Game() {
	const navigate = useNavigate();

	return (
		<div>
			<h1> Game </h1>
			<GameCanvas />
			<button onClick={() => navigate("/")}>
				Quit
			</button>
		</div>
	);
}
