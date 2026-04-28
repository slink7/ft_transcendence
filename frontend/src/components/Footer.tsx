import { useTranslation } from "react-i18next";


function Button() {
	const { i18n } = useTranslation();
	
	function changeLanguage(e) {
		i18n.changeLanguage(e.target.value);
	};
	return (
		<div>
			<button onClick={changeLanguage} value='en'>English</button>
			<button onClick={changeLanguage} value='fr'>Français</button>
		</div>
	)
}

export default function Footer() {
	return (
		<footer>
			<Button/>
		</footer>
	);
}
