import preval from 'next-plugin-preval';
import { parseEntryGlobalContent } from '../parsers/contentful';
import client from '../factories/contentfulClient';

async function globalContent() {
  return client.getGlobalContent().then(parseEntryGlobalContent);
}

export default preval(globalContent());
