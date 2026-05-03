import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { useState } from "react";

import SignIn from "../components/login/SignIn.tsx";
import SignUp from "../components/login/SignUp.tsx";
import { useAuth } from "../auth/AuthContext.tsx";


export default function Login() {
	const {t} = useTranslation();
	const { isAuthenticated } = useAuth();
	const [mode, setMode] = useState<"signin" | "signup">("signin");
		
	if (isAuthenticated) {
		return (
			<Navigate to="/" replace />
		)
	}

	if (mode === "signin") {
		return (
			<div className="grow text-center flex flex-col gap-10 items-center justify-center">
				<SignIn/>
				<p
					className="text-sm cursor-pointer underline"
					onClick={() => setMode("signup")}
				>
					{t("login.dont")}
				</p>
			</div>
		)
	}

	return (
		<div className="grow text-center flex flex-col gap-10 items-center justify-center">
			<SignUp/>
			<p
				className="text-sm cursor-pointer underline"
				onClick={() => setMode("signin")}
			>
				{t("login.already")}
			</p>
		</div>
	);
}
