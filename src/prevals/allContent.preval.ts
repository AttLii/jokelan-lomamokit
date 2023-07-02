import preval from "next-plugin-preval";
import client from "../factories/contentfulClient";
import { parseContent } from "../parsers/contentful";
import { notEmpty } from "../utils/typescript";

async function allContent() {
  return client
    .getAllContent()
    .then((all) => all.map(parseContent).filter(notEmpty));
}

export default preval(allContent());
