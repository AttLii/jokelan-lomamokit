import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { verify } from "hcaptcha";
import { GoogleSpreadsheet } from "google-spreadsheet";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  tel: z.string(),
  message: z.string(),
  "h-captcha-response": z.string().min(1),
  date: z.string().optional(),
});

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
    return fn(req, res);
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

  const validatedBody = formSchema.safeParse(body);
  if (!validatedBody.success) {
    return processResponse(422, "Provided body is in unexpected form");
  }

  const { "h-captcha-response": token, ...bodyWithoutHCaptcha } =
    validatedBody.data;

  const hCaptchaVerification = await verify(
    process.env.VITE_HCAPTCHA_SECRET + "",
    token
  );

  if (!hCaptchaVerification.success) {
    return processResponse(422, "Provided body is in unexpected form");
  }

  try {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID);
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "",
      private_key: process.env.GOOGLE_PRIVATE_KEY || "",
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    bodyWithoutHCaptcha["date"] = new Date().toISOString();
    if (!sheet.headerValues) {
      await sheet.setHeaderRow(Object.keys(bodyWithoutHCaptcha));
    }
    await sheet.addRow(bodyWithoutHCaptcha);
  } catch {
    return processResponse(500, "Couldn't save the form data");
  }

  return processResponse(201, "Form saved successfully");
};

export default process.env.NODE_ENV === "production"
  ? handler
  : allowCors(handler);
