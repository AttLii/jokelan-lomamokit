import preval from "next-plugin-preval";
import { reduceStringTranslationsToObject } from "../parsers/contentful";
import { getStringTranslations } from "../repositories/contentful";
import { stringTranslationSchema } from "../contexts/stringTranslations";

async function stringTranslations() {
  return getStringTranslations()
    .then(reduceStringTranslationsToObject)
    .then(stringTranslationSchema.parse);
}

export default preval(stringTranslations());
