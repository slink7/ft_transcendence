import { useState } from "react";

import { useClient } from "../../scripts/store.ts";
import { createName } from "../../scripts/createName.ts"
import { send } from "../../scripts/socket.ts"

import { useTranslation } from "react-i18next";

export default function NameSetter() {
	const {t} = useTranslation();
	const { client, setClient } = useClient();
	const [input, setInput] = useState(client.name);

	function setName(name: string) {
		setClient({name: name});
		send({type: "SET_NAME", name: name});
	}

	return (
		<div className="flex items-center sm:flex-col gap-4">
			<button className="bg-orange-500 shadow-sm transition hover:bg-orange-600 text-yellow-50 py-2 px-4 rounded" onClick={() => {
				setInput(createName())
			}}>
				{t('name.generate')}
			</button>

			<form className="flex items-center border-2 border-black-800 rounded" onSubmit={(event) => {
				event.preventDefault();
				setName(input);
			}}>
				<input className="py-2 px-4 bg-white" type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="username"
					name="username"
				/>
				<button className="bg-blue-500 transition hover:bg-blue-600 text-yellow-50 py-2 px-4" type="submit">
					{t('name.set')}
				</button>
			</form>
		</div>
	);
}
