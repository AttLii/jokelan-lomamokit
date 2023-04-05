export const config = {
  runtime: "edge",
};

const wrongMethodResponse = (expected: string) => {
  return new Response(
    JSON.stringify({
      message: `${expected}-method expected to this endpoint`,
    }),
    {
      status: 404,
      headers: {
        "content-type": "application/json",
      },
    }
  );
};

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return wrongMethodResponse("POST");
  }

  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  return new Response(
    JSON.stringify({
      message: "Hello, " + name,
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    }
  );
}
