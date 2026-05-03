// react-i18next i18next to add as npm dependencies

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslations from "./locales/en/translations.json"
import frTranslations from "./locales/fr/translations.json"
import esTranslations from "./locales/es/translations.json"

i18n
	.use(initReactI18next)
	.init({
		resources: {
			en: {
				translations: enTranslations
			},
			fr: {
				translations: frTranslations
			},
			es: {
				translations: esTranslations
			}
		},
		supportedLngs : ['en', 'fr', 'es'],
		lng: "en",
		interpolation: {
			escapeValue: false
		},
		ns: ['translations'],
		defaultNS: 'translations'
	});


export default i18n;
