import z from "zod";
import { parse } from "node-html-parser";

const ratingSchema = z.object({
  totalCountRecommendations: z.number(),
  recommendsCount: z.number(),
  averageRating: z.object({
    average: z.number(),
    count: z.number(),
  }),
});
export type Reviews = z.infer<typeof ratingSchema>;

/**
 * We are scraping #__NEXT_DATA__ json blob from passed url, because it shows all reviews.
 */
export const scrapeReviews = async (url: string): Promise<null | Reviews> => {
  let reviews: null | Reviews = null;

  try {
    const html = await fetch(url).then((r) => r.text());
    const data = parse(html).querySelector("#__NEXT_DATA__");

    if (!data) return null;

    const json = JSON.parse(data.innerHTML);

    reviews = ratingSchema.parse(
      json?.props?.pageProps?.initialState?.pageAccommodation?.reviews_data
    );
  } catch (e) {
    console.log(
      `Error happened while scraping reviews from lomarengas '${url}'`,
      e
    );
  }

  return reviews;
};
