import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import v from "validator";
import { GoogleSpreadsheet } from "google-spreadsheet";

export default async function handler(
  { method, body }: VercelRequest,
  response: VercelResponse
) {
  const processResponse = (status: number, message: string) =>
    response.status(status).json({ message });

  if (method !== "POST") {
    return processResponse(404, "Unsupported method");
  }

  let json: { [key in string]: string } = {};
  try {
    json = JSON.parse(body) as { [key in string]: string };

    z.object({
      name: z.string(),
      email: z.string().email(),
      tel: z.string().refine(v.isMobilePhone).optional(),
      message: z.string(),
    }).parse(json);
  } catch {
    return processResponse(422, "Provided body is in unexpected form");
  }

  try {
    json["date"] = new Date().toISOString();
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID);
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "",
      private_key: process.env.GOOGLE_PRIVATE_KEY || "",
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    if (!sheet.headerValues) {
      await sheet.setHeaderRow(Object.keys(json));
    }
    await sheet.addRow(json);
  } catch {
    return processResponse(500, "Couldn't save the form data");
  }

  return processResponse(201, "Form saved successfully");
}
