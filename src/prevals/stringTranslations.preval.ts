import preval from 'next-plugin-preval';
import client from '../factories/contentfulClient';
import { reduceStringTranslationsToObject } from '../parsers/contentful';
import { stringTranslationsSchema } from '../stores/stringTranslations';

async function stringTranslations() {
  return client
    .getStringTranslations()
    .then(reduceStringTranslationsToObject)
    .then(stringTranslationsSchema.parse);
}

export default preval(stringTranslations());
