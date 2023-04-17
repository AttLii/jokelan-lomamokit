import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { ErrorPage } from "~/components/ErrorPage";
import { SectionsSelector } from "~/components/SectionsSelector";
import { appContentful } from "~/factories/contentful";
import { CabinPage } from "~/components/CabinPage";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { parseBreadcrumbs, parseContent } from "~/parsers/contentful";
import { normalizePath, fixRouteLoaderPathname } from "~/utils/qwik";
import { isParsedCabin, isParsedPage } from "~/typeguards/contentful";
import { translations } from "~/constants/translations";
import type {
  DocumentHead,
  StaticGenerateHandler,
} from "@builder.io/qwik-city";
import type { ParsedPageOrCabin, Breadcrumb } from "~/parsers/contentful";

export default component$(() => {
  const page = usePageContent();

  const { content, breadcrumbs } = page.value
  if (!content) {
    return <ErrorPage />;
  }

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {isParsedPage(content)
        ? <SectionsSelector sections={content.sections} />
        : isParsedCabin(content)
          ? <CabinPage content={content} />
          : null
      }
    </>
  )
});

export const usePageContent = routeLoader$(async ({ url, status }) => {
  const path = fixRouteLoaderPathname(url.pathname);
  let content: ParsedPageOrCabin | null = null;
  let breadcrumbs: Breadcrumb[] = [];
  try {
    const _content = await appContentful.getContentByPath(path);
    if (!_content) {
      status(404);
    } else {
      content = parseContent(_content);
      if (!content) {
        status(404)
      }

      const _breadcrumbs = await appContentful.getBreadcrumbs(path);
      breadcrumbs = parseBreadcrumbs(_breadcrumbs)
    }
  } catch {
    status(500);
  }

  return { content, breadcrumbs };
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
      title: translations["404Title"],
      meta: [
        {
          name: translations["404Description"],
          content: translations["404Content"],
        },
      ],
    };
  }

  const { title, description, robots, keywords, image } = page.content.seoFields;

  const _title = `${translations.seoTitle} | ${title}`;

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
