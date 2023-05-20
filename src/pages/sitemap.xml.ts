import type { GetServerSideProps } from "next";
import allContentPreval from "../prevals/allContent.preval";
import { buildLocalUrlFromRelativePath } from "../utils/seo";

const SitemapXml = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allContentPreval
        .filter((content) => !content.seoFields.robots.includes("noindex"))
        .map((content) => {
          return `
            <url>
              <loc>${buildLocalUrlFromRelativePath(content.path)}</loc>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `.trim();

  res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate");
  res.setHeader("Content-Type", "text/xml");
  res.write(xml);
  res.end();

  return {
    notFound: true,
  };
};

export default SitemapXml;
