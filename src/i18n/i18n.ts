import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {en} from '../locales/en.ts'
import {ru} from '../locales/ru.ts'
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources: {
            en: {translation: en},
            ru: {translation: ru},
        },
        lng: 'en', // язык по умолчанию
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,   // экранирует переменные внутри переводов
        },
        detection: {
            order: ['path', 'navigator'],  // сначала ищем язык в URL, потом в браузере
            lookupFromPathIndex: 1,  // язык в пути, после первой косой черты (например, /ru/ или /en/)
        },
    });

// https://react.i18next.com/getting-started