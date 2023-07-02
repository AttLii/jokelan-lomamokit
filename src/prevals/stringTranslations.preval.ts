import preval from "next-plugin-preval";
import client from "../factories/contentfulClient";
import { reduceStringTranslationsToObject } from "../parsers/contentful";
import { stringTranslationSchema } from "../contexts/stringTranslations";

async function stringTranslations() {
  return client
    .getStringTranslations()
    .then(reduceStringTranslationsToObject)
    .then(stringTranslationSchema.parse);
}

export default preval(stringTranslations());
