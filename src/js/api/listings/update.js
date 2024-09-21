import { authFetch } from "../authFetch.js";
import { API_URL_LISTINGS } from "../constants.js";
/**
 * a function that updates a listing
 * @param {string} id - the listing id
 * @param {object} data - the listing data
 * @throws {Error} if the PUT fails or an error occurs during the process.
 * @returns
 */

export async function updateListing(id, data) {
  try {
    if (!id) {
      throw new Error("update requires a listing id");
    }
    const updateListingURL = `${API_URL_LISTINGS}/${id}`;
    const response = await authFetch(updateListingURL, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (response.status !== 200) {
      throw new Error("Listing not updated");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update listing");
  }
}
