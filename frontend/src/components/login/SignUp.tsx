import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSignup = () => {
		if (!username || !password) {
			alert("Fill all fields");
			return;
		}

		const user = { username, password };
		localStorage.setItem("user_credentials", JSON.stringify(user));

		alert("Account created!");
		navigate("/login");
	};

	return (
		<div className="flex flex-col items-center gap-4 mt-20">
			<h1 className="text-2xl">Sign Up</h1>

			<input
				className="border p-2"
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>

			<input
				className="border p-2"
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>

			<button
				onClick={handleSignup}
				className="bg-blue-500 text-white px-4 py-2 rounded"
			>
				Create account
			</button>
		</div>
	);
}