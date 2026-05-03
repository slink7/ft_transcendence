import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext.tsx";
import { useTranslation } from "react-i18next";

export default function SignIn() {
	const navigate = useNavigate();
	const { login } = useAuth();
	const {t} = useTranslation();


	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		const stored = localStorage.getItem("user_credentials");

		if (!stored) {
			alert(t("login.notfound"));
			return;
		}

		const user = JSON.parse(stored);

		if (user.username === username && user.password === password) {
			login(username);
			navigate("/");
		} else {
			alert(t("login.invalid"));
		}
	};

	return (
		<div className="flex flex-col items-center gap-4 mt-20">
			<h1 className="text-2xl">{t("login.in")}</h1>

			<input className="border p-2 rounded" placeholder={t("login.user")} value={username}
			onChange={(e) => setUsername(e.target.value)}
			/>

			<input className="border p-2 rounded" type="password" placeholder={t("login.pass")} value={password}
			onChange={(e) => setPassword(e.target.value)}
			/>

			<button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleLogin}> 
			{t("login.log")}
			</button>
		</div>
	);
}