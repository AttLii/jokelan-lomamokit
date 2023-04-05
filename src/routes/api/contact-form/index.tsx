import type { RequestHandler } from '@builder.io/qwik-city';

// Called with every HTTP request (regardless of method)
export const onRequest: RequestHandler = async ({ json }) => {
  json(200, { hello: 'world' });
}