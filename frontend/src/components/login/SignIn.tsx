import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext.tsx";
import { useTranslation } from "react-i18next";

export default function SignIn() {
	const navigate = useNavigate();
	const { login } = useAuth();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		const stored = localStorage.getItem("user_credentials");

		if (!stored) {
			alert("No account found");
			return;
		}

		const user = JSON.parse(stored);

		if (user.username === username && user.password === password) {
			login(username);
			navigate("/");
		} else {
			alert("Invalid credentials");
		}
	};

	return (
		<div className="flex flex-col items-center gap-4 mt-20">
			<h1 className="text-2xl">Sign In</h1>

			<input className="border p-2 rounded" placeholder="Username" value={username}
			onChange={(e) => setUsername(e.target.value)}
			/>

			<input className="border p-2 rounded" type="password" placeholder="Password" value={password}
			onChange={(e) => setPassword(e.target.value)}
			/>

			<button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleLogin}> 
			Login
			</button>
		</div>
	);
}