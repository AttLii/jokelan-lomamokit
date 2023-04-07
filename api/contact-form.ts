import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import v from "validator";
import { GoogleSpreadsheet } from "google-spreadsheet";

const allowCors =
  (fn: (req: VercelRequest, res: VercelResponse) => void) =>
  async (req: VercelRequest, res: VercelResponse) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }
    return await fn(req, res);
  };

const handler = async (
  { method, body }: VercelRequest,
  response: VercelResponse
) => {
  const processResponse = (status: number, message: string) =>
    response.status(status).json({ message });

  if (method !== "POST") {
    return processResponse(404, "Unsupported method");
  }

  try {
    z.object({
      name: z.string(),
      email: z.string().email(),
      tel: z.string().refine(v.isMobilePhone).optional(),
      message: z.string(),
    }).parse(body);
  } catch (e) {
    return processResponse(422, "Provided body is in unexpected form");
  }

  try {
    body["date"] = new Date().toISOString();
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID);
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "",
      private_key: process.env.GOOGLE_PRIVATE_KEY || "",
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    if (!sheet.headerValues) {
      await sheet.setHeaderRow(Object.keys(body));
    }
    await sheet.addRow(body);
  } catch {
    return processResponse(500, "Couldn't save the form data");
  }

  return processResponse(201, "Form saved successfully");
};

export default allowCors(handler);
