import { load } from "../storage/index.js";
import { API_KEY } from "./constants.js";
/**
 * @name headers
 * @description a function that loads the token from local storage and returns it and stores the API key with it in the headers
 * @returns {object} headers
 */

export function headers() {
  const token = load("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-Key": API_KEY,
  };
}

/**
 * a function that fetches data from the api with the authorization token
 * @param {string} url API url
 * @param {object} options data
 * @returns {promise} result of the fetch
 */

export async function authFetch(url, options = {}) {
  return await fetch(url, {
    ...options,
    headers: {
      ...headers(),
      ...options.headers,
    },
  });
}
