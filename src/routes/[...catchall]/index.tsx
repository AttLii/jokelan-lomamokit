import { component$ } from '@builder.io/qwik';
import type { StaticGenerateHandler } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import { ErrorPage } from '~/components/ErrorPage';
import { getContentByPath, getPageContent } from '~/repositories/contentful';
import type { Page } from '~/types/Contentful';
import { fixOnStaticGeneratePath, fixRouteLoaderPathname } from '~/utils/qwik';


export default component$(() => {
  const content = usePageContent()

  if (!content.value) {
    return <ErrorPage />
  }

  return <pre>{JSON.stringify(content.value, null, 2)}</pre>;
});


export const usePageContent = routeLoader$(async ({ url, status }) => {
  const path = fixRouteLoaderPathname(url.pathname)
  let content: Page | null = null
  try {
    const _content = await getContentByPath(path)
    if (!_content) {
      status(404)
    } else {
      content = _content.fields
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
        catchall: fixOnStaticGeneratePath(c.fields.path)
      }
    })
  };
};