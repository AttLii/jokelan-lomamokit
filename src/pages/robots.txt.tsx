import type { GetServerSideProps } from "next";
import allContentPreval from "../prevals/allContent.preval";
import { buildLocalUrlFromRelativePath } from "../utils/seo";

const RobotsTxt = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const contents = allContentPreval
    .filter(
      (content) =>
        content.seoFields.robots.includes("noindex") ||
        content.seoFields.robots.includes("nofollow")
    )
    .map((content) => `Disallow: ${content.path}`);

  if (contents.length === 0) {
    contents.push("Disallow: ");
  }

  contents.unshift("User-agent: *");

  contents.push(`Sitemap: ${buildLocalUrlFromRelativePath("/sitemap.xml")}`);

  res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate");
  res.setHeader("Content-Type", "text/plain");
  res.write(contents.join("\n"));
  res.end();

  return {
    notFound: true,
  };
};

export default RobotsTxt;
