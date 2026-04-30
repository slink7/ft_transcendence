import { useTranslation } from "react-i18next";

export default function Subtitle() {
	const { t } = useTranslation();
	
	return (
		<div>
			<h2>{t('header.subtitle')}</h2>
		</div>
	)
}
