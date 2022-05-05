import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationLT from "./lt/translation.json";

const resources = {
  lt: {
    translation: translationLT,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "lt",
  lng: "lt",
  debug: true,

  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18n;
