import { useTranslation } from "react-i18next";

export default function ProfileButton() {
	const { t } = useTranslation();
	
	return (
		<div className="cursor-pointer bg-dark-red-500 transition hover:bg-dark-red-600 py-2 px-4 rounded">
			<p>{t('navbar.profile')}</p>
		</div>
	)
}

