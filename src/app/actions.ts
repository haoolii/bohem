"use server";

import { ImageShortenActionBody } from "@/types/image.types";
import { MediaShortenActionBody } from "@/types/media.types";
import { UrlShortenActionBody } from "@/types/url.types";

const API_URL = process.env.API_URL;

export async function shortenImageAction(body: ImageShortenActionBody) {
  try {
    const uploadFormData = new FormData();

    uploadFormData.append("file", body.file);

    const uploadResponse = await fetch(`${API_URL}/api/v2/asset/upload`, {
      method: "POST",
      body: uploadFormData,
    });

    const uploadJson = await uploadResponse.json();

    if (
      !uploadJson.data ||
      !uploadJson.data.success ||
      !uploadJson.data.success.length
    ) {
      throw new Error("upload failed");
    }

    const pathname = uploadJson.data.success[0].pathname;

    console.log("pathname", pathname);

    const shortenPayload = {
      original: pathname,
      type: body.type,
      passwordRequired: body.passwordRequired,
      password: body.password,
      prompt: body.prompt,
      expireIn: body.expireIn,
    };

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const shortenResponse = await fetch(
      `${API_URL}/api/v2/shorten`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(shortenPayload),
      }
    );

    const shortenJson = await shortenResponse.json();

    return shortenJson;
  } catch (err) {
    console.log("err", err);
  }
}

export async function shortenMediaAction(body: MediaShortenActionBody) {
  try {
    const uploadFormData = new FormData();

    uploadFormData.append("file", body.file);

    return {
      data: {
        uniqueId: "test",
      }
    }
    // const uploadResponse = await fetch(`${API_URL}/api/v2/asset/upload`, {
    //   method: "POST",
    //   body: uploadFormData,
    // });

    // const uploadJson = await uploadResponse.json();

    // if (
    //   !uploadJson.data ||
    //   !uploadJson.data.success ||
    //   !uploadJson.data.success.length
    // ) {
    //   throw new Error("upload failed");
    // }

    // const pathname = uploadJson.data.success[0].pathname;

    // console.log("pathname", pathname);

    // const shortenPayload = {
    //   original: pathname,
    //   type: body.type,
    //   passwordRequired: body.passwordRequired,
    //   password: body.password,
    //   prompt: body.prompt,
    //   expireIn: body.expireIn,
    // };

    // const headers = new Headers();
    // headers.append("Content-Type", "application/json");

    // const shortenResponse = await fetch(
    //   `${API_URL}/api/v2/shorten`,
    //   {
    //     method: "POST",
    //     headers,
    //     body: JSON.stringify(shortenPayload),
    //   }
    // );

    // const shortenJson = await shortenResponse.json();

    // return shortenJson;
  } catch (err) {
    console.log("err", err);
  }
}

export async function shortenUrlAction(body: UrlShortenActionBody) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const shortenPayload = {
    original: body.url,
    type: body.type,
    passwordRequired: false,
    password: "",
    prompt: "",
    expireIn: body.expireIn,
  };
  const shortenResponse = await fetch(`${API_URL}/api/v2/shorten`, {
    method: "POST",
    headers,
    body: JSON.stringify(shortenPayload),
  });

  const shortenJson = await shortenResponse.json();

  return shortenJson;
}

export async function resolveGetAction(uniqueId: string) {
  const resolveResponse = await fetch(`${API_URL}/api/v2/resolve/${uniqueId}`);

  const resolveJson = await resolveResponse.json();

  return resolveJson;
}

export async function resolvePostAction(uniqueId: string, password: string) {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");

  const resolveResponse = await fetch(`${API_URL}/api/v2/resolve/${uniqueId}`, {
    method: "POST",
    headers,
    body: JSON.stringify({ password }),
  });

  const resolveJson = await resolveResponse.json();

  return resolveJson;
}
