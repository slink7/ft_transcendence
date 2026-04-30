import { useTranslation } from "react-i18next";

export default function Title() {
	const { t } = useTranslation();
	
	return (
		<div>
			<h1>{t('navbar.title')}</h1>
		</div>
	)
}

