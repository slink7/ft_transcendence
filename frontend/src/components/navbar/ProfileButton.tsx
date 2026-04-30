import { useTranslation } from "react-i18next";

export default function ProfileButton() {
	const { t } = useTranslation();
	
	return (
		<div>
			<p>{t('navbar.profile')}</p>
		</div>
	)
}

