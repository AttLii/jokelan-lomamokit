import preval from "next-plugin-preval";
import { getAllContent } from "../repositories/contentful";
import { parseContent } from "../parsers/contentful";
import { notEmpty } from "../utils/typescript";

async function allContent() {
  return getAllContent().then((all) => all.map(parseContent).filter(notEmpty));
}

export default preval(allContent());
