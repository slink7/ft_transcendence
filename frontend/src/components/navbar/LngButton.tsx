import { useTranslation } from "react-i18next";

export default function LngButton() {
	const { t, i18n } = useTranslation();
	
	function changeLanguage(e) {
		i18n.changeLanguage(e.target.value);
	};
	return (
		<div>
			<button onClick={changeLanguage} value='en'>{t('lng.en')}</button>
			<button onClick={changeLanguage} value='fr'>{t('lng.fr')}</button>
		</div>
	)
}
