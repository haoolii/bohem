import { ORIGIN } from "@/core/env";
import { GetShortenResponse, PostGetShortenResponse, PostShortenImageBody, PostShortenImageResponse, PostShortenMediaBody, PostShortenMediaResponse, PostShortenUrlBody, PostShortenUrlResponse } from "./types";

const headers = new Headers();

export async function postShortenUrl(body: PostShortenUrlBody): Promise<PostShortenUrlResponse> {
    const shortenResponse = await fetch(`${ORIGIN}/p/api/shorten/url`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    });

    const shortenJson = await shortenResponse.json();

    return shortenJson;
}

export async function postShortenImage(body: PostShortenImageBody): Promise<PostShortenImageResponse> {
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

export async function postShortenMedia(body: PostShortenMediaBody): Promise<PostShortenMediaResponse> {
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

export async function getShorten(uniqueId: string): Promise<GetShortenResponse> {

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

export async function postGetShorten(uniqueId: string, password: string): Promise<PostGetShortenResponse> {
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
