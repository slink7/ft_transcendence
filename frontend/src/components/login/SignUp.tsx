import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
	const navigate = useNavigate();
	const {t} = useTranslation();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSignup = () => {
		if (!username || !password) {
			alert(t("login.error"));
			return;
		}

		const user = { username, password };
		localStorage.setItem("user_credentials", JSON.stringify(user));

		alert(t("login.created"));
		navigate("/login");
	};

	return (
		<div className="flex flex-col items-center gap-4 mt-20">
			<h1 className="text-2xl">{t("login.up")}</h1>

			<input className="border p-2" placeholder={t("login.user")} value={username}
				onChange={(e) => setUsername(e.target.value)}/>

			<input className="border p-2" type="password" placeholder={t("login.pass")} value={password}
				onChange={(e) => setPassword(e.target.value)}/>

			<button className="bg-blue-500 text-white px-4 py-2 rounded"
				onClick={handleSignup}>
				{t("login.create")}
			</button>
		</div>
	);
}