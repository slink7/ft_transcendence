import { useTranslation } from "react-i18next";

export default function LngButton() {
	const { t, i18n } = useTranslation();
	
	function changeLanguage(e) {
		i18n.changeLanguage(e.target.value);
	};
	return (
		<div className="flex gap-2 text-sm">
			<button className="bg-orange-500 transition hover:bg-orange-600 text-yellow-50 py-2 px-4 rounded" onClick={changeLanguage} value='en'>
				{t('lng.en')}
			</button>
			<button className="bg-orange-500 transition hover:bg-orange-600 text-yellow-50 py-2 px-4 rounded" onClick={changeLanguage} value='fr'>
				{t('lng.fr')}
			</button>
		</div>
	)
}
