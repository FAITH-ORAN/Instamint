import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import translationEn from "../public/locales/en/translation.json"
import translationEs from "../public/locales/es/translation.json"
import translationFr from "../public/locales/fr/translation.json"

const resources = {
  en: {
    translation: translationEn,
  },
  fr: {
    translation: translationFr,
  },
  es: {
    translation: translationEs,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: "fr",

  interpolation: {
    escapeValue: false,
  },
})

export default i18n
