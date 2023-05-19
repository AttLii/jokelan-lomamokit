import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { verify } from "hcaptcha";
import { GoogleSpreadsheet } from "google-spreadsheet";

const handler = async (
  { method, body }: VercelRequest,
  response: VercelResponse
) => {
  if (method !== "POST") {
    return response.status(404).json({ message: "Unsupported method" });
  }

  const result = z
    .object({
      name: z.string(),
      email: z.string().email(),
      tel: z.string(),
      message: z.string(),
      "h-captcha-response": z.string(),
    })
    .safeParse(body);

  if (!result.success) {
    return response
      .status(422)
      .json({ message: "Provided body is in unexpected form" });
  }

  const { "h-captcha-response": token, ...dataWithoutToken } = result.data;
  try {
    const tokenResult = await verify(process.env.HCAPTCHA_SECRET + "", token);
    if (!tokenResult.success) {
      return response
        .status(422)
        .json({ message: "Couldn't verify h-captcha response" });
    }
  } catch {
    return response
      .status(500)
      .json({ message: "Couldn't verify h-captcha-response" });
  }

  try {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID);
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "",
      private_key: process.env.GOOGLE_PRIVATE_KEY || "",
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.addRow({
      ...dataWithoutToken,
      date: new Date().toISOString(),
    });
  } catch {
    return response
      .status(500)
      .json({ message: "Couldn't save the form data" });
  }

  return response.status(201).json({ message: "Form saved successfully" });
};

export default handler;
