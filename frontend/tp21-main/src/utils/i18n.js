/**
 * utils/i18n.js
 *
 * Description:
 *   Sets up Vue I18n for internationalization across the application.
 *   Supports English and Chinese translations with automatic fallback handling.
 *
 * Key Features:
 *   - Uses Composition API mode (`legacy: false`)
 *   - Default locale is English ('en'), with Chinese ('zh') as fallback
 *   - Loads translation message files from `@/locales/en.js` and `@/locales/zh.js`
 *   - Easily extendable to support additional locales
 */

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