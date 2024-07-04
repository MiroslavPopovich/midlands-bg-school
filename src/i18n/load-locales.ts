import { availableLocales, locales } from "../utils/i18n-util.js";
import { fetchLocale } from "./fetch-locale.js";

export const loadLocales = async (): Promise<void> => {
    for (const locale of availableLocales) {
        locales[locale] = await fetchLocale(locale);
    }
};
