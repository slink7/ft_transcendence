import { useState } from "react";

import { useClient } from "../scripts/store.ts";
import { createName } from "../scripts/createName.ts"
import { send } from "../scripts/socket.ts"

export default function NameSetter() {
	const { client, setClient } = useClient();
	const [input, setInput] = useState(client.name);

	function setName(name: string) {
		setClient({name: name});
		send({type: "SET_NAME", name: name});
	}

	return (
		<>
			<button onClick={() => {
				setInput(createName())
			}}>
				Generate Random Name
			</button>

			<form onSubmit={(event) => {
				event.preventDefault();
				setName(input);
			}}>
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="username"
					name="username"
				/>
				<button type="submit"> Set </button>
			</form>
		</>
	);
}
