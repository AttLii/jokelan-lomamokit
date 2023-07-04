import { redirect } from "next/navigation";
import { draftMode } from "next/headers";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const path = url.searchParams.get("path");
  draftMode().disable();
  redirect(path || "/");
}
