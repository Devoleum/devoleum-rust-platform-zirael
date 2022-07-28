import { ILod } from "../models/ILod";

const uriCorrection = (uri: string) => {
  let correctUri = uri.replace(
    "https://github.com/",
    "https://raw.githubusercontent.com/"
  );
  correctUri = correctUri.replace("blob/", "");
  return correctUri;
}

const validationJson = (localizedData: ILod, fetchedData: ILod, section: string, errorMsgCallback: any) => {
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
