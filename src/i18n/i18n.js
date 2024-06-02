const availableLocales = ["en", "bg"];
const defaultLanguage = navigator.language.split("-")[0];
import en from "../locales/en.json" with { type: "json" };
import bg from "../locales/bg.json" with { type: "json" };
const locales = { en, bg };
const detectLanguage = () => {
    let language = (navigator.language || navigator.userLanguage).substr(0, 2);
    const urlParams = new URLSearchParams(window.location.search);
    const langFromUrl = urlParams.get("lang");
    if (langFromUrl && availableLocales.indexOf(langFromUrl) !== -1) {
        language = langFromUrl;
    }
    return availableLocales.indexOf(language) !== -1 ? language : defaultLanguage;
};
const getNestedProperty = (obj, key) => {
    return key
        .split(".")
        .reduce((o, k) => (o && o[k] !== "undefined" ? o[k] : null), obj);
};
const updatePageLanguage = (lang) => {
    const pageLanguage = availableLocales.indexOf(lang) !== -1 ? lang : defaultLanguage;
    const elements = document.querySelectorAll("[data-i18n]");
    try {
        const json = locales[pageLanguage];
        elements.forEach((element) => {
            const key = element.getAttribute("data-i18n");
            if (!key)
                return;
            let text = getNestedProperty(json, key);
            if (!text)
                return;
            const variables = text.match(/{(.*?)}/g);
            if (variables) {
                variables.forEach((variable) => {
                    const datasetEntries = Object.keys(element.dataset).map((key) => [key, element.dataset[key]]);
                    datasetEntries.forEach(([dataKey, value]) => {
                        if (`{${dataKey}}` === variable) {
                            try {
                                text = text.replace(`${variable}`, new Function(`return (${value})`)());
                            }
                            catch (error) {
                                text = text.replace(`${variable}`, value);
                            }
                        }
                    });
                });
            }
            element.innerHTML = text;
        });
        const htmlElement = document.querySelector("html");
        if (htmlElement) {
            htmlElement.setAttribute("lang", pageLanguage);
        }
    }
    catch (error) {
        console.error(`Error updating page language to ${lang}:`, error);
    }
};
const language = detectLanguage();
updatePageLanguage(language);
document.querySelectorAll(".change-language").forEach((button) => {
    button.addEventListener("click", (event) => {
        const target = event.target;
        const newLanguage = target.getAttribute("data-language");
        if (newLanguage && availableLocales.indexOf(newLanguage) !== -1) {
            updatePageLanguage(newLanguage);
        }
    });
});
