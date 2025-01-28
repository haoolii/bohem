import { ORIGIN } from "@/core/env";

type PostShortenUrlBody = {
  content: string;
  type: string;
  expireIn: number;
};
export async function postShortenUrl(body: PostShortenUrlBody) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const shortenResponse = await fetch(`${ORIGIN}/p/api/shorten/url`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  const shortenJson = await shortenResponse.json();

  return shortenJson;
}

type PostShortenImageBody = {
  type: string;
  passwordRequired: boolean;
  password: string;
  prompt: string;
  expireIn: number;
  files: File[];
};
export async function postShortenImage(body: PostShortenImageBody) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const formData = new FormData();

  formData.append("type", body.type);
  formData.append("passwordRequired", `${body.passwordRequired}`);
  formData.append("password", body.password);
  formData.append("prompt", body.prompt);
  formData.append("expireIn", body.expireIn.toString());

  body.files.forEach((file) => {
    formData.append("files", file);
  });

  const shortenResponse = await fetch(`${ORIGIN}/p/api/shorten/image`, {
    method: "POST",
    body: formData,
  });

  const shortenJson = await shortenResponse.json();

  return shortenJson;
}

type PostShortenMediaBody = {
  type: string;
  passwordRequired: boolean;
  password: string;
  prompt: string;
  expireIn: number;
  files: File[];
};
export async function postShortenMedia(body: PostShortenMediaBody) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const formData = new FormData();

  formData.append("type", body.type);
  formData.append("passwordRequired", `${body.passwordRequired}`);
  formData.append("password", body.password);
  formData.append("prompt", body.prompt);
  formData.append("expireIn", body.expireIn.toString());

  body.files.forEach((file) => {
    formData.append("files", file);
  });

  const shortenResponse = await fetch(`${ORIGIN}/p/api/shorten/media`, {
    method: "POST",
    body: formData,
  });

  const shortenJson = await shortenResponse.json();

  return shortenJson;
}

export async function getShorten(uniqueId: string) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const shortenResponse = await fetch(
    `${ORIGIN}/p/api/shorten/${uniqueId}`,
    {
      method: "GET",
      headers,
    }
  );

  const shortenJson = await shortenResponse.json();

  return shortenJson;
}

export async function postShorten(uniqueId: string, password: string) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const shortenResponse = await fetch(
    `${ORIGIN}/p/api/shorten/${uniqueId}`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ password }),
    }
  );

  const shortenJson = await shortenResponse.json();

  return shortenJson;
}
