import GameCanvas from "../features/GameCanvas.tsx";
import { useTranslation } from "react-i18next";

export default function Game() {
	const {t} = useTranslation();

	return (
		<div>
			<h1> {t('game.title')} </h1>
			<GameCanvas />
		</div>
	);
}
