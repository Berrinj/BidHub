import { API_URL_LISTINGS } from "../constants.js";
import { authFetch } from "../authFetch.js";
import { errorTemplate } from "../../templates/error.js";

const bids = "_bids=true";
const seller = "_seller=true";

// /**
//  * Fetches all listings from the API
//  * @returns {promise} result of the get
//  * @throws {Error} If the name parameter is empty or an error occurs during the process.
//  */

export async function displayListings() {
  try {
    const displayListingsURL = `${API_URL_LISTINGS}?${bids}&${seller}`;
    const response = await authFetch(displayListingsURL);
    if (response.ok) {
      return await response.json();
    }
    if (response.status !== 200) {
      errorTemplate();
      throw new Error("Listings not found");
    }
  } catch (error) {
    errorTemplate();
    console.error(error);
    throw new Error("Failed to display listings");
  }
}

export async function displayListing(id) {
  try {
    if (!id) {
      throw new Error("get requires a listing id");
    }
    const displayListingURL = `${API_URL_LISTINGS}/${id}?${bids}&${seller}`;
    const response = await authFetch(displayListingURL);
    if (response.ok) {
      return await response.json();
    }
    if (response.status !== 200) {
      errorTemplate();
      throw new Error("Listing not found");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to display listing");
  }
}
