import { API_URL_PROFILE } from "../constants.js";
import { API_KEY } from "../constants.js";
import { load } from "../../storage/index.js";

export async function getProfile() {
  const name = load("profile").name;
  const response = await fetch(API_URL_PROFILE + `/` + name, {
    headers: {
      Authorization: `Bearer ${load("token")}`,
      "X-Noroff-API-Key": API_KEY,
    },
  });
  return await response.json();
}

const profile = await getProfile();
console.log(profile);
console.log(profile.data.name);
console.log(profile.data.bio);
console.log(profile.data.avatar.url);

console.log(profile.data.credits);
