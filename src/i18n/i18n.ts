const availableLocales: string[] = ["en", "bg"];
const defaultLanguage: string = navigator.language.split("-")[0];

import en from "../locales/en.json" with { type: "json" };
import bg from "../locales/bg.json" with { type: "json" };

const locales: { [key: string]: { [key: string]: any } } = { en, bg };

const detectLanguage = (): string => {
  let language: string = (
    navigator.language || (navigator as any).userLanguage
  ).substr(0, 2);

  const urlParams: URLSearchParams = new URLSearchParams(
    window.location.search,
  );
  const langFromUrl: string | null = urlParams.get("lang");
  if (langFromUrl && availableLocales.indexOf(langFromUrl) !== -1) {
    language = langFromUrl;
  }

  return availableLocales.indexOf(language) !== -1 ? language : defaultLanguage;
};

const getNestedProperty = (obj: any, key: string): string | null => {
  return key
    .split(".")
    .reduce((o, k) => (o && o[k] !== "undefined" ? o[k] : null), obj);
};

const updatePageLanguage = (lang: string): void => {
  const pageLanguage: string =
    availableLocales.indexOf(lang) !== -1 ? lang : defaultLanguage;
  const elements: NodeListOf<HTMLElement> =
    document.querySelectorAll("[data-i18n]");

  try {
    const json: { [key: string]: any } = locales[pageLanguage];

    elements.forEach((element) => {
      const key: string | null = element.getAttribute("data-i18n");
      if (!key) return;

      let text: string | null = getNestedProperty(json, key);
      if (!text) return;

      const variables: RegExpMatchArray | null = text.match(/{(.*?)}/g);
      if (variables) {
        variables.forEach((variable) => {
          const datasetEntries: [string, string][] = Object.keys(
            element.dataset,
          ).map((key) => [key, element.dataset[key]!]);
          datasetEntries.forEach(([dataKey, value]) => {
            if (`{${dataKey}}` === variable) {
              try {
                text = text!.replace(
                  `${variable}`,
                  new Function(`return (${value})`)(),
                );
              } catch (error) {
                text = text!.replace(`${variable}`, value);
              }
            }
          });
        });
      }

      element.innerHTML = text;
    });

    const htmlElement: HTMLElement | null = document.querySelector("html");
    if (htmlElement) {
      htmlElement.setAttribute("lang", pageLanguage);
    }
  } catch (error) {
    console.error(`Error updating page language to ${lang}:`, error);
  }
};

const language: string = detectLanguage();
updatePageLanguage(language);

document.querySelectorAll(".change-language").forEach((button) => {
  button.addEventListener("click", (event: Event) => {
    const target = event.target as HTMLElement;
    const newLanguage: string | null = target.getAttribute("data-language");
    if (newLanguage && availableLocales.indexOf(newLanguage) !== -1) {
      updatePageLanguage(newLanguage);
    }
  });
});
