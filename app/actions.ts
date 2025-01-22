"use server";

export async function create(formData: FormData) {
  const file = formData.get("file") as Blob;

  const data = new FormData();

  data.append("file", file);

  const response = await fetch("https://bohem-api.vercel.app/api/v1/upload", {
    method: "POST",
    body: data,
  });

  const json = await response.json();
  console.log("json", json);
  const url = json?.data?.blob?.url;
  const fileName = url.match(/[^/]+$/)?.[0];
  console.log("filename", fileName);
  const payload = {
    original: fileName,
    type: "image",
    passwordRequired: true,
    password: "test",
    prompt: "hello world",
    expireIn: 8640000,
  };

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const shortenResponse = await fetch(
    "https://bohem-api.vercel.app/api/v1/shorten",
    {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(payload),
    }
  );

  const shortenJson = await shortenResponse.json();

  return shortenJson;
}

export async function getResolve(uniqueId: string) {
  const response = await fetch(
    `https://bohem-api.vercel.app/api/v1/resolve/${uniqueId}`,
    {
      method: "GET",
    }
  );
  const json = await response.json();

  return json;
}

export async function postResolve(uniqueId: string, password: string) {
  const myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");

  const response = await fetch(
    `https://bohem-api.vercel.app/api/v1/resolve/${uniqueId}`,
    {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ password }),
    }
  );
  const json = await response.json();

  return json;
}
