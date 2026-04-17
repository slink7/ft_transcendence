import { useState } from "react";

import { useClient } from "../store.ts";
import { createName } from "../scripts/createName.ts"
import { send } from "../components/socket.ts"

export default function NameSetter() {
	const { client, setClient } = useClient();
	const [input, setInput] = useState(client.name);

	function setName(name: string) {
		setClient({name: name});
		send({type: "SET_NAME", name: name});
	}

	return (
		<>
			<button onClick={() => setInput(createName())}>
				Generate Random Name
			</button>
			<form onSubmit={(event) => {
				event.preventDefault();
				setName(input);
			}}>
				<input
					value={input}
					placeholder="username"
					name="username"
					onChange={(e) => setInput(e.target.value)}
				/>
				<button type="submit"> Set </button>
			</form>
		</>
	);
}
