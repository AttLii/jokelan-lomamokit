import type { NextApiRequest, NextApiResponse } from "next";
import previewClient from "../../factories/previewClient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (
    req.query.secret !== process.env.DRAFT_SECRET ||
    typeof req.query.path !== "string"
  ) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const content = await previewClient.getContentByPath(req.query.path);
  if (!content) {
    return res.status(401).json({ message: "Invalid path" });
  }

  // Redirect the user back to the page they're previewing.
  res.setHeader("Content-Type", "text/html");
  res.setDraftMode({ enable: true });
  res.redirect(302, req.query.path);
};
export default handler;
