import { useNavigate } from "react-router-dom";

import GameCanvas from "../components/GameCanvas.tsx";
import { useTranslation } from "react-i18next";

export default function Game() {
	const navigate = useNavigate();
	const {t, i18n} = useTranslation();

	return (
		<div>
			<h1> {t('game.title')} </h1>
			<GameCanvas />
			<button onClick={() => navigate("/")}>
				{t('game.quit')}
			</button>
		</div>
	);
}
