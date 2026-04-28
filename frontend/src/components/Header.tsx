import { useTranslation } from "react-i18next";

function Title() {
	const {t, i18n} = useTranslation();
	return (
		<>
			<h1 >{t("header.title")}</h1>
			<p style={{fontSize: 12}}>{t('header.subtitle')}</p>
		</>
	)
}

export default function Header() {
	return (
		<header>
			<Title />
		</header>
	);
}
