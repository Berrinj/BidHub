import { API_URL } from "../constants.js";
import { load } from "../../storage/index.js";

const action = "/auth/create-api-key";
const apiKeyURL = API_URL + action;

/**
 * @name getAPIKey
 * @description Fetches a new API key from the API
 * @returns {Promise} The API key
 */

export async function getAPIKey() {
  const response = await fetch(apiKeyURL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${load("token")}`,
    },
    method: "POST",
    body: JSON.stringify({
      name: "test key",
    }),
  });
  if (response.ok) {
    return await response.json();
  }
  console.error(await response.json());
  throw new Error("Failed to get API key");
}
