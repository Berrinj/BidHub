import { API_URL_LISTINGS } from "../constants.js";
import { authFetch } from "../authFetch.js";

/**
 * @name deleteListing
 * @description a function that deletes a listing
 * @param {*} id - the listing id to delete
 * @returns  - the response from the fetch
 */

export async function deleteListing(id) {
  if (!id) {
    throw new Error("delete requires a listing id");
  }
  const deleteListingURL = `${API_URL_LISTINGS}/${id}`;
  const response = await authFetch(deleteListingURL, {
    method: "DELETE",
  });
  return response;
}
