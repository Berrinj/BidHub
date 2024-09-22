import { API_URL_LISTINGS } from "../constants.js";
import { authFetch } from "../authFetch.js";

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
