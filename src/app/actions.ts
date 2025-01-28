"use server";

import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

export async function GetShortenAction(uniqueId: string) {
  try {
    const currentCookies = await cookies();

    const resolveResponse = await fetch(`${API_URL}/api/shorten/${uniqueId}`, {
      headers: {
        Cookie: `Authorization=${
          currentCookies.get("Authorization")?.value || ""
        }`,
      },
    });

    const resolveJson = await resolveResponse.json();

    return resolveJson;
  } catch (err) {
    return null;
  }
}
