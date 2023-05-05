import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import ErrorPage from "~/routes/404";
import { PageContent } from "~/components/PageContent";
import { CabinContent } from "~/components/CabinContent";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { appContentful } from "~/factories/contentful";
import { parseBreadcrumbs, parseContent } from "~/parsers/contentful";
import { normalizePath, fixRouteLoaderPathname, buildUrlFromRelativePath } from "~/utils/qwik";
import { parsedCabinToApartmentJsonLD, parsedPageToFAQPageJsonLD, parsedPageToWebPageJsonLD } from "~/utils/seo";
import { isFAQPage, isParsedCabin, isParsedPage } from "~/typeguards/contentful";
import { scrapeReviews } from "~/repositories/lomarengas";
import type {
  DocumentHead,
  StaticGenerateHandler,
} from "@builder.io/qwik-city";
import type { ParsedPageOrCabin, Breadcrumb } from "~/parsers/contentful";
import type { Reviews } from "~/repositories/lomarengas";

export default component$(() => {
  const page = usePageContent();
  if (!page.value.content) {
    return <ErrorPage />;
  }

  const { content, breadcrumbs, reviews, jsonLd } = page.value

  return (
    <>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={JSON.stringify(jsonLd)} />
      )}
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {isParsedCabin(content)
        ? <CabinContent content={content} reviews={reviews} />
        : isParsedPage(content)
          ? <PageContent content={content} />
          : null
      }
    </>
  )
});

const composeJsonLDfromContent = (content: ParsedPageOrCabin, reviews: Reviews | null) => {
  if (isParsedCabin(content)) {
    return parsedCabinToApartmentJsonLD(content, reviews)
  } else if (isFAQPage(content)) {
    return parsedPageToFAQPageJsonLD(content)
  } else if (isParsedPage(content)) {
    return parsedPageToWebPageJsonLD(content)
  } else {
    return null;
  }
}

export const usePageContent = routeLoader$(async ({ url, status }) => {
  const path = fixRouteLoaderPathname(url.pathname);
  let content: ParsedPageOrCabin | null = null;
  let breadcrumbs: Breadcrumb[] = [];
  let reviews: Reviews | null = null;
  let jsonLd: null | ReturnType<typeof composeJsonLDfromContent> = null;
  try {
    const _content = await appContentful.getContentByPath(path);
    if (!_content) {
      status(404);
    } else {
      content = parseContent(_content);
      if (content) {
        if (isParsedCabin(content) && content.tourBookingPage) {
          reviews = await scrapeReviews(content.tourBookingPage)
        }
        jsonLd = composeJsonLDfromContent(content, reviews)
      } else {
        status(404)
      }

      const _breadcrumbs = await appContentful.getBreadcrumbs(path);
      breadcrumbs = parseBreadcrumbs(_breadcrumbs)
    }
  } catch {
    status(500);
  }

  return { content, breadcrumbs, reviews, jsonLd };
});

export const onStaticGenerate: StaticGenerateHandler = async () => {
  const content = await appContentful.getPageContent();
  return {
    params: content.map((c) => {
      return {
        catchall: normalizePath(c.fields.path),
      };
    }),
  };
};

export const head: DocumentHead = ({ resolveValue, url }) => {
  const page = resolveValue(usePageContent);
  if (!page.content) {
    return {
      title: "404",
      meta: [
        {
          name: "description",
          content: "Sivua ei löytynyt",
        },
      ],
    };
  }

  const { title, description, robots, keywords, image } = page.content.seoFields;
  const _url = buildUrlFromRelativePath(url.pathname);

  const imageUrl = image.src + "&w=1200&h=630&fit=fill"
  return {
    title: title,
    links: [
      {
        rel: "canonical",
        href: _url,
      },
    ],
    meta: [
      {
        name: "robots",
        content: robots,
      },
      {
        name: "keywords",
        content: keywords,
      },
      {
        property: "og:title",
        content: title,
      },
      {
        property: "og:description",
        content: description,
      },
      {
        property: "og:url",
        content: _url,
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "description",
        content: description,
      },
      {
        name: "og:image",
        content: imageUrl,
      },
      {
        name: "og:image:alt",
        content: image.alt,
      },
      {
        name: "og:image:width",
        content: "1200",
      },
      {
        name: "og:image:height",
        content: "630",
      },
      {
        name: "twitter:card",
        content: "summary",
      },
      {
        name: "twitter:image",
        content: imageUrl,
      },
      {
        name: "twitter:title",
        content: title,
      },
      {
        name: "twitter:description",
        content: description,
      },
    ],
  };
};
