import i18n, { use } from "i18next";
import { initReactI18next } from "react-i18next";

import en from "src/locales/en/translation.json";

use(initReactI18next).init({
  resources: {
    en: {
      translation: en
    }
  },
  lng: "en",
  interpolation: {
    escapeValue: false
  },
  compatibilityJSON: "v4"
});

export default i18n;
