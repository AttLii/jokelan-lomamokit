import preval from "next-plugin-preval";
import { parseEntryGlobalContent } from "../parsers/contentful";
import { getGlobalContent } from "../repositories/contentful";

async function globalContent() {
  return getGlobalContent().then(parseEntryGlobalContent);
}

export default preval(globalContent());
