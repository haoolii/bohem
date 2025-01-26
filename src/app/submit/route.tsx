export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as Blob;

  fetch("https://bohem-api.vercel.app/api/v1/upload", {
    method: "POST",
  });

  console.log('file', file);

  const data = new FormData();

  data.append("file", file);

  const response = await fetch("https://bohem-api.vercel.app/api/v1/upload", {
    method: "POST",
    body: data,
  });

  const json = await response.json();

  console.log(`json`, json);

  return new Response(null, {
    status: 302,
    headers: { Location: "/" },
  });
}
