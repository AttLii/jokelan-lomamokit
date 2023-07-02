import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import z from "zod";

const transformString = (s: string) => "'" + s;

const formSchema = z.object({
  name: z.string().transform(transformString),
  email: z.string().email().transform(transformString),
  tel: z.string().transform(transformString),
  message: z.string().transform(transformString),
});

type FormSchema = z.infer<typeof formSchema>;

export async function POST(request: Request) {
  let result: FormSchema;
  try {
    const body = await request.json();
    result = formSchema.parse(body);
  } catch {
    return new Response("Provided body is in unexpected form", {
      status: 422,
    });
  }

  try {
    const doc = new GoogleSpreadsheet(
      process.env.GOOGLE_SHEETS_ID,
      new JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      })
    );

    await doc.loadInfo();

    const row = {
      ...result,
      date: new Date().toISOString(),
    };

    const title = "Contact";
    let sheet = doc.sheetsByTitle[title];
    if (!sheet) {
      sheet = await doc.addSheet({
        title,
        headerValues: Object.keys(row),
      });
    }

    await sheet.addRow(row);
  } catch {
    return new Response("Couldn't save the form data", {
      status: 500,
    });
  }

  return new Response("Form saved successfully", {
    status: 201,
  });
}
