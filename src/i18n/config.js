import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// !!! Folowing line used for debugging purposes only
// document.documentElement.setAttribute("lang", 'he-IL');

const currentLang = document.documentElement.lang
// console.log(`Locale used: ${currentLang}`) //for debug only

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
    },
    'it-IT': {
      translations: require('./locales/it-IT/translations.json')
    },
    'pt-PT': {
      translations: require('./locales/pt-PT/translations.json')
    },
    'hu-HU': {
      translations: require('./locales/hu-HU/translations.json')
    },
    'he-IL': {
      translations: require('./locales/he-IL/translations.json')
    },
    'fr-FR': {
      translations: require('./locales/fr-FR/translations.json')
    },
    'de-DE': {
      translations: require('./locales/de-DE/translations.json')
    },
  },
  ns: ['translations'],
  defaultNS: 'translations'
});

i18n.languages = ['en-GB', 'nl-BE', 'fr-BE', 'es-ES', 'it-IT', 'pt-PT', 'hu-HU', 'he-IL', 'fr-FR', 'de-DE'];

export default i18n;
