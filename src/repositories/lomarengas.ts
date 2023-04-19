import { z } from "@builder.io/qwik-city";
import { parse } from "node-html-parser";

const ratingSchema = z.object({
  average: z.number(),
  count: z.number(),
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

    // I'm only expecting this to break in Future. When that happens, find a better solution. this is MVP anyway to get reviews to the page.
    reviews = ratingSchema.parse(
      json?.props?.pageProps?.initialState?.pageAccommodation?.reviews_data
        ?.averageRating
    );
  } catch (e) {
    console.log(`Error happened while scraping reviews for url '${url}'`, e);
  }

  return reviews;
};
