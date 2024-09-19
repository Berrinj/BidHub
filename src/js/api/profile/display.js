import { API_URL_PROFILE } from "../constants.js";
import { authFetch } from "../authFetch.js";
import { errorTemplate } from "../../templates/error.js";

const bids = "_bids=true";
const listings = "_listings=true";
const wins = "_wins=true";
const seller = "_seller=true";

/**
 * Fetches a single profile from the API
 * @param {string} name username of the profile to fetch
 * @returns {promise} result of the get
 * @throws {Error} If the name parameter is empty or an error occurs during the process.
 */

export async function displayProfile(name, container) {
  try {
    if (!name) {
      throw new Error("get requires a profile name");
    }
    const displayProfileURL = `${API_URL_PROFILE}/${name}?${listings}&${bids}&${wins}`;
    console.log(displayProfileURL);
    const response = await authFetch(displayProfileURL);
    if (response.ok) {
      return await response.json();
    }
    if (response.status !== 200) {
      errorTemplate(container);
      throw new Error("profile not found");
    }
  } catch (error) {
    errorTemplate(container);
    console.error(error);
    throw new Error("Failed to display profile");
  }
}

export async function displayProfileListings(name, data, container) {
  try {
    if (!name) {
      throw new Error("get requires a profile name");
    }
    const displayProfileURL = `${API_URL_PROFILE}/${name}/${data}?${listings}&${bids}&${seller}`;
    const response = await authFetch(displayProfileURL);
    if (response.ok) {
      return await response.json();
    }
    if (response.status !== 200) {
      errorTemplate(container);
      throw new Error("profile not found");
    }
  } catch (error) {
    errorTemplate(container);
    console.error(error);
    throw new Error("Failed to display profile");
  }
}
