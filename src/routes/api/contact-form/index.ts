import type { RequestHandler } from "@builder.io/qwik-city";
import handler from "../../../../api/contact-form";

export const onPost: RequestHandler = async ({ send, request }) => {
  send(await handler(request));
};
