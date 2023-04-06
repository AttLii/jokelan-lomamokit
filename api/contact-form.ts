import { z } from "@builder.io/qwik-city";
import v from "validator";

export const config = {
  runtime: "edge",
};

const composeResponse = (message: string, status: number) => {
  return new Response(JSON.stringify({ message }), {
    status,
    headers: {
      "content-type": "application/json",
    },
  });
};

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return composeResponse(`POST-method expected to this endpoint`, 404);
  }

  const dataObj: { [key: string]: string } = {};
  try {
    const data = await req.formData();
    for (const [key, value] of data.entries()) {
      if (typeof value !== "string") {
        throw new Error("form value is not a string");
      }
      dataObj[key] = value;
    }
  } catch {
    return composeResponse("Couldn't parse form data", 400);
  }

  try {
    z.object({
      name: z.string(),
      email: z.string().email(),
      tel: z.string().refine(v.isMobilePhone).optional(),
      message: z.string(),
    }).parse(dataObj);
  } catch {
    return composeResponse("Couldn't parse form data", 400);
  }

  return new Response(
    JSON.stringify({
      message: "Hello, ",
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    }
  );
}
