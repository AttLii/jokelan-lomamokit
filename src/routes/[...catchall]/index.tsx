import { component$ } from "@builder.io/qwik";
import type {
  DocumentHead,
  StaticGenerateHandler,
} from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { ErrorPage } from "~/components/ErrorPage";
import { SectionsSelector } from "~/components/SectionsSelector";
import { parseContent } from "~/parsers/contentful";
import { appContentful } from "~/factories/contentful";
import { normalizePath, fixRouteLoaderPathname } from "~/utils/qwik";
import { translations } from "~/constants/translations";
import type { ParsedPageOrCabin } from "~/parsers/contentful";
import { isParsedPage } from "~/typeguards/contentful";
import { CabinPage } from "~/components/CabinPage";

export default component$(() => {
  const content = usePageContent();

  if (!content.value) {
    return <ErrorPage />;
  }

  if (isParsedPage(content.value)) {
    return <SectionsSelector sections={content.value.sections} />
  } else {
    return <CabinPage content={content.value} />
  }
});

export const usePageContent = routeLoader$(async ({ url, status }) => {
  const path = fixRouteLoaderPathname(url.pathname);
  let content: ParsedPageOrCabin | null = null;
  try {
    const _content = await appContentful.getContentByPath(path);
    if (!_content) {
      status(404);
    } else {
      content = parseContent(_content);
      if (!content) {
        status(404)
      }
    }
  } catch {
    status(500);
  }

  return content;
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
  if (!page) {
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

  const { title, description, robots, keywords, image } = page.seoFields;

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
