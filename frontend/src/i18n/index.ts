import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import fr from './locales/fr.json';

const STORAGE_KEY = 'edututor-language';
const FALLBACK_LANGUAGE = 'fr';
const SUPPORTED_LANGUAGES = ['fr', 'en'] as const;

function normalizeLanguage(value: string | null | undefined): 'fr' | 'en' {
  if (!value) return FALLBACK_LANGUAGE;
  return value.toLowerCase().startsWith('en') ? 'en' : 'fr';
}

function getInitialLanguage(): 'fr' | 'en' {
  if (typeof window === 'undefined') return FALLBACK_LANGUAGE;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED_LANGUAGES.includes(stored as 'fr' | 'en')) {
    return normalizeLanguage(stored);
  }
  return normalizeLanguage(window.navigator.language);
}

void i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
    en: { translation: en },
  },
  lng: getInitialLanguage(),
  fallbackLng: FALLBACK_LANGUAGE,
  supportedLngs: SUPPORTED_LANGUAGES,
  interpolation: {
    escapeValue: false,
  },
});

export { STORAGE_KEY as LANGUAGE_STORAGE_KEY, normalizeLanguage };
export default i18n;
