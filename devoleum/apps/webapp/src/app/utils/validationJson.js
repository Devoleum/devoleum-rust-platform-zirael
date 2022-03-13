const uriCorrection = (uri) => {
  let correctUri = uri.replace(
    "https://github.com/",
    "https://raw.githubusercontent.com/"
  );
  correctUri = correctUri.replace("blob/", "");
  return correctUri;
}

const validationJson = (localizedData, fetchedData, section, errorMsgCallback) => {
  if (!localizedData.name) {
    errorMsgCallback("Not a valid JSON section, please insert " + section);
    return false;
  }
  if (fetchedData.section !== section) {
    errorMsgCallback("Wrong section, please insert " + section);
    return false;
  }
  return true;
};

export { uriCorrection, validationJson };
