import GameCanvas from "../features/GameCanvas.tsx";
import { useTranslation } from "react-i18next";

export default function Game() {
	const {t} = useTranslation();

	return (
		<div>
			<GameCanvas />
		</div>
	);
}
