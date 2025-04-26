import { createI18n } from 'vue-i18n';
import en from '@/locales/en.js'
import zh from '@/locales/zh.js'

const messages = {
    en,
    zh
};

const i18n = createI18n({
    legacy: false,
    locale: 'en', 
    fallbackLocale: 'zh', 
    messages
});

export default i18n;