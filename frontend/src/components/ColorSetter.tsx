import { useState } from "react";

import { useClient } from "../scripts/store.ts";

import { send } from "../scripts/socket.ts"

import { useTranslation } from "react-i18next";

export default function ColorSetter() {
	const {t, i18n} = useTranslation();
	const {client, setClient} = useClient();
	const [input, setInput] = useState(client.color);

	function setColor(color: string) {
		setClient({color: color});
		send({type: "SET_COLOR", color: color});
	}

	function randomColor(): string {
		return ("#" + Math.random().toString(16).slice(2, 8).toUpperCase());
	}

	return (
		<>
			<button onClick={() => {
				setInput(randomColor());
			}}>
				{t('color.generate')}
			</button>

			<form onSubmit={(event) => {
				event.preventDefault();
				setColor(input);
			}}>
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					type="color"
				/>
				<button type="submit"> {t('color.set')} </button>
			</form>
		</>
	);
}
