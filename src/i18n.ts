import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ko',
    debug: false,
    ns: ['common', 'projects'],  // 사용할 namespace들
    defaultNS: 'common',

    backend: {
      loadPath: '/portfolio/locales/{{lng}}/{{ns}}.json'  // 경로에 ns 포함
    },

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
