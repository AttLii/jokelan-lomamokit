import { component$ } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import ErrorPage from "~/routes/404";
import { SectionsSelector } from "~/components/SectionsSelector";
import { appContentful } from "~/factories/contentful";
import { CabinPage } from "~/components/CabinPage";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { parseBreadcrumbs, parseContent } from "~/parsers/contentful";
import { normalizePath, fixRouteLoaderPathname } from "~/utils/qwik";
import { isParsedCabin, isParsedPage } from "~/typeguards/contentful";
import { scrapeReviews } from "~/repositories/lomarengas";
import type {
  DocumentHead,
  StaticGenerateHandler,
} from "@builder.io/qwik-city";
import type { ParsedPageOrCabin, Breadcrumb } from "~/parsers/contentful";
import type { Reviews } from "~/repositories/lomarengas";

export default component$(() => {
  const page = usePageContent();

  const { content, breadcrumbs, reviews } = page.value
  const { url: { pathname } } = useLocation()
  if (!content) {
    return <ErrorPage />;
  }


  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {isParsedCabin(content)
        ? <CabinPage content={content} reviews={reviews} key={pathname} />
        : isParsedPage(content)
          ? <SectionsSelector sections={content.sections} />
          : null
      }
    </>
  )
});

export const usePageContent = routeLoader$(async ({ url, status }) => {
  const path = fixRouteLoaderPathname(url.pathname);
  let content: ParsedPageOrCabin | null = null;
  let breadcrumbs: Breadcrumb[] = [];
  let reviews: Reviews | null = null
  try {
    const _content = await appContentful.getContentByPath(path);
    if (!_content) {
      status(404);
    } else {
      content = parseContent(_content);
      if (!content) {
        status(404)
      } else if (isParsedCabin(content) && content.tourBookingPage) {
        reviews = await scrapeReviews(content.tourBookingPage)
      }

      const _breadcrumbs = await appContentful.getBreadcrumbs(path);
      breadcrumbs = parseBreadcrumbs(_breadcrumbs)
    }
  } catch {
    status(500);
  }

  return { content, breadcrumbs, reviews };
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

  const _title = `Jokelan Lomamökit | ${title}`;

  let _url = import.meta.env.VITE_ORIGIN;
  const path = normalizePath(url.pathname);
  if (path !== "") {
    _url += `/${path}`;
  }
  return {
    title: _title,
    links: [
      {
        rel: "canonical",
        href: _url,
      },
    ],
    meta: [
      {
        property: "og:title",
        content: _title,
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
        property: "og:description",
        content: description,
      },
      {
        name: "robots",
        content: robots,
      },
      {
        name: "keywords",
        content: keywords,
      },
      {
        name: "og:image",
        content: image.src + "&w=1200&h=630&fit=fill",
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
    ],
  };
};
