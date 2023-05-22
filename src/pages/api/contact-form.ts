import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { GoogleSpreadsheet } from "google-spreadsheet";

const handler = async (
  { method, body }: VercelRequest,
  response: VercelResponse
) => {
  if (method !== "POST") {
    return response.status(404).json({ message: "Unsupported method" });
  }

  // converts malicious google sheet formula to string
  const transformString = (s: string) => "'" + s;

  const result = z
    .object({
      name: z.string().transform(transformString),
      email: z.string().email().transform(transformString),
      tel: z.string().transform(transformString),
      message: z.string().transform(transformString),
    })
    .safeParse(body);

  if (!result.success) {
    return response
      .status(422)
      .json({ message: "Provided body is in unexpected form" });
  }

  try {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID);
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    });
    await doc.loadInfo();

    const title = "Contact";
    const row = {
      ...result.data,
      date: new Date().toISOString(),
    };

    let sheet = doc.sheetsByTitle[title];
    if (!sheet) {
      sheet = await doc.addSheet({
        title,
        headerValues: Object.keys(row),
      });
    }

    await sheet.addRow(row);
  } catch {
    return response
      .status(500)
      .json({ message: "Couldn't save the form data" });
  }

  return response.status(201).json({ message: "Form saved successfully" });
};

export default handler;
