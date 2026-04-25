import { useTranslation } from "react-i18next";

export default function Footer() {
	const { i18n } = useTranslation();

	function changeLanguage(e) {
		i18n.changeLanguage(e.target.value);
	};

	return (
		<footer>
			<button onClick={changeLanguage} value='en'>English</button>
			<button onClick={changeLanguage} value='fr'>Français</button>
		</footer>
	);
}
