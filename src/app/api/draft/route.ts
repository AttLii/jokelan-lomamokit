import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import z from 'zod';
import previewClient from '../../../factories/contentfulPreviewClient';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const result = z
    .object({
      path: z.string(),
      secret: z.string(),
    })
    .safeParse(Object.fromEntries(url.searchParams));

  if (!result.success || result.data.secret !== process.env.DRAFT_SECRET) {
    return new Response('Expected GET-params not provided', {
      status: 422,
    });
  }

  const content = await previewClient.getContentByPath(result.data.path);
  if (!content) {
    return new Response("Couldn't find content with provided path", {
      status: 404,
    });
  }

  draftMode().enable();
  redirect(`${content.fields.path}?ts=${Date.now()}`);
}
