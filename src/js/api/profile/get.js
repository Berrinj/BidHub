import { API_URL_PROFILE } from "../constants.js";
import { API_KEY } from "../constants.js";
import { load } from "../../storage/index.js";

export async function getProfile(name) {
  const response = await fetch(API_URL_PROFILE + `/` + name, {
    headers: {
      Authorization: `Bearer ${load("token")}`,
      "X-Noroff-API-Key": API_KEY,
    },
  });
  return await response.json();
}
