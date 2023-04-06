import { z } from "@builder.io/qwik-city";
import v from "validator";
import { GoogleSpreadsheet } from "google-spreadsheet";

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

  try {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID);
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "",
      private_key: process.env.GOOGLE_PRIVATE_KEY || "",
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    if (!sheet.headerValues) {
      await sheet.setHeaderRow(Object.keys(dataObj));
    }
    sheet.addRow(dataObj);
  } catch {
    return composeResponse("Couldn't save the form data", 500);
  }

  return composeResponse("Form saved successfully", 201);
}
