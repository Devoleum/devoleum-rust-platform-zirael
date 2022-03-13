function getInterfaceLanguage() {
  const defaultLang = "en-US";
  if (typeof navigator === "undefined") {
    return defaultLang;
  }
  const nav = navigator; // eslint-disable-line no-undef
  if (nav) {
    if (nav.language) {
      return nav.language;
    }
    if (!!nav.languages && !!nav.languages[0]) {
      return nav.languages[0];
    }
    if (nav.userLanguage) {
      return nav.userLanguage;
    }
    if (nav.browserLanguage) {
      return nav.browserLanguage;
    }
  }
  return defaultLang;
}

export function returnLang() {
  const language = getInterfaceLanguage();
  const idx = language.indexOf("-");
  let auxLang = idx >= 0 ? language.substring(0, idx) : language;
  auxLang = auxLang ? auxLang : "en";
  return auxLang;
}

const returnMatchLang = async (uri) => {
  const language = getInterfaceLanguage();
  const idx = language.indexOf("-");
  let auxLang = idx >= 0 ? language.substring(0, idx) : language;
  auxLang = auxLang ? auxLang : "en";

  let response = await fetch(uri);
  let fetchedData = await response.json();
  let localizedData;
    if (fetchedData.hasOwnProperty(auxLang)) {
      localizedData = fetchedData[auxLang];
    }
    else if (!fetchedData.hasOwnProperty(auxLang) && fetchedData.hasOwnProperty("en") ) {
      localizedData = fetchedData.en;
    }
    else {
      localizedData = fetchedData;
    }
  return {localizedData, fetchedData}
}

export default returnMatchLang;