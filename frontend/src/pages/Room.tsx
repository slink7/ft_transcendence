import { useParams, useNavigate } from "react-router-dom";

export default function Room() {
	const { roomID } = useParams();
	const navigate = useNavigate();

	return (
		<div>
			<h1> Room </h1>
			<p> Room ID: {roomID} </p>
			<button onClick={() => navigate("/game")}>
				Start Game
			</button>
			<button onClick={() => navigate("/")}>
				Back to Home
			</button>
		</div>

	);
}
