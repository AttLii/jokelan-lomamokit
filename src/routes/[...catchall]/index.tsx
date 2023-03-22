import { component$ } from '@builder.io/qwik';
import type { DocumentHead, StaticGenerateHandler } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import { ErrorPage } from '~/components/ErrorPage';
import type { ParsedPage } from '~/parsers/contentful';
import { parseContent } from '~/parsers/contentful';
import { getContentByPath, getPageContent } from '~/repositories/contentful';
import { normalizePath, fixRouteLoaderPathname } from '~/utils/qwik';


export default component$(() => {
  const content = usePageContent()

  if (!content.value) {
    return <ErrorPage />
  }

  return <pre>{JSON.stringify(content.value, null, 2)}</pre>;
});


export const usePageContent = routeLoader$(async ({ url, status }) => {
  const path = fixRouteLoaderPathname(url.pathname)
  let content: ParsedPage | null = null
  try {
    const _content = await getContentByPath(path)
    if (!_content) {
      status(404)
    } else {
      content = parseContent(_content)
    }
  } catch {
    status(500)
  }

  return content
});

export const onStaticGenerate: StaticGenerateHandler = async () => {
  const content = await getPageContent()
  return {
    params: content.map(c => {
      return {
        catchall: normalizePath(c.fields.path)
      }
    })
  };
};

export const head: DocumentHead = ({ resolveValue, url }) => {
  const page = resolveValue(usePageContent);
  if (!page) {
    return {
      title: "404", // TODO: string translations
      meta: [
        {
          name: "description",
          content: "Sivua ei löytynyt"
        }
      ]
    }
  }

  const { title, description, robots, keywords, image } = page.seoFields

  const _title = `Jokelan Lomamökit | ${title}`

  let _url = import.meta.env.VITE_ORIGIN
  const path = normalizePath(url.pathname)
  if (path !== "") {
    _url += `/${path}`
  }
  return {
    title: _title,
    links: [
      {
        rel: "canonical",
        href: _url
      }
    ],
    meta: [
      {
        property: 'og:title',
        content: _title,
      },
      {
        property: 'og:url',
        content: _url,
      },
      {
        property: 'og:type',
        content: "website",
      },
      {
        name: 'description',
        content: description,
      },
      {
        property: 'og:description',
        content: description,
      },
      {
        name: 'robots',
        content: robots,
      },
      {
        name: 'keywords',
        content: keywords
      },
      {
        name: 'og:image',
        content: image.src
      },
      {
        name: 'og:image:alt',
        content: image.alt
      },
      {
        name: 'og:image:width',
        content: image.width
      },
      {
        name: 'og:image:height',
        content: image.height
      }
    ],
  };
};