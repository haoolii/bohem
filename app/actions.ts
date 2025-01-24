"use server";

export async function create(formData: FormData) {
  const file = formData.get("file") as Blob;
  const prompt = formData.get("prompt") as string;
  const expireIn = formData.get("expireIn") as string;
  const passwordRequired = formData.get("passwordRequired") as string;
  const password = formData.get("password") as string;

  console.log({
    file,
    prompt,
    expireIn,
    passwordRequired,
    password,
  });
  const data = new FormData();

  data.append("file", file);

  const response = await fetch("https://bohem-api.vercel.app/api/v1/upload", {
    method: "POST",
    body: data,
  });

  const json = await response.json();
  // console.log("json", json);
  const url = json?.data?.blob?.url;
  const fileName = url.match(/[^/]+$/)?.[0];
  // console.log("filename", fileName);
  const payload = {
    original: fileName,
    type: "image",
    passwordRequired: passwordRequired === "on",
    password,
    prompt,
    expireIn: +expireIn,
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

  console.log('shortenResponse', shortenResponse)

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
