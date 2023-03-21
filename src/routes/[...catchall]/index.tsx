import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import type { StaticGenerateHandler } from '@builder.io/qwik-city';
import { getPageContent } from '~/repositories/contentful';

export default component$(() => {
  const { params } = useLocation();
  return <div>Jokelan lomamökir: {params.catchall}</div>;
});

export const onStaticGenerate: StaticGenerateHandler = async () => {
  const content = await getPageContent()
  return {
    params: content.map(c => {
      const { path } = c.fields.path.fields
      return {
        catchall: path === "/" ? "" : path,
      }
    })
  };
};