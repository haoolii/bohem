"use server";

const API_URL = process.env.API_URL;

export async function GetShortenAction(uniqueId: string) {
  const resolveResponse = await fetch(`${API_URL}/api/v2/shorten/${uniqueId}`);

  const resolveJson = await resolveResponse.json();

  return resolveJson;
}
