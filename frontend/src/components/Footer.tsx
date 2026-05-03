import { useTranslation } from "react-i18next";

export default function Footer() {
	const {t} = useTranslation();
	
	return (
		<footer className="flex-none text-center text-sm text-gray-500">
			<p>
				{t("legal.privacy")} · {t("legal.terms")}
			</p>
		</footer>
	);
}
