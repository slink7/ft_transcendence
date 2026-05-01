import { useState } from "react";

import { useClient } from "../../scripts/store.ts";

import { send } from "../../scripts/socket.ts"

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
		<div className="flex items-center gap-4">
			<button className="bg-orange-500 shadow-sm transition hover:bg-orange-600 text-yellow-50 py-2 px-4 rounded" onClick={() => {
				setInput(randomColor());
			}}>
				{t('color.generate')}
			</button>

			<form className="flex items-stretch border-2 border-black-800 rounded" onSubmit={(event) => {
				event.preventDefault();
				setColor(input);
			}}>
				<input className="cursor-pointer appearance-none"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					type="color"
				/>
				<button className="bg-blue-500 transition hover:bg-blue-600 text-yellow-50 px-4" type="submit"> {t('color.set')} </button>
			</form>
		</div>
	);
}
