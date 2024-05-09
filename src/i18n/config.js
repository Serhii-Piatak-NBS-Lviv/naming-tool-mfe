import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const currentLang = document.documentElement.lang;

i18n.use(initReactI18next).init({
  fallbackLng: 'en-GB',
  lng: currentLang,
  resources: {
    'en-GB': {
      translations: require('./locales/en-gb/translations.json')
    },
    'fr-BE': {
      translations: require('./locales/fr-BE/translations.json')
    },
    'nl-BE': {
      translations: require('./locales/nl-BE/translations.json')
    },
    'es-ES': {
      translations: require('./locales/es-ES/translations.json')
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
});

i18n.languages = ['en-GB', 'nl-BE', 'fr-BE', 'es-ES'];

export default i18n;
