import { API_URL_LISTINGS } from "../constants.js";
import { authFetch } from "../authFetch.js";

export async function deleteListing(id) {
  try {
    if (!id) {
      throw new Error("delete requires a listing id");
    }
    const deleteListingURL = `${API_URL_LISTINGS}/${id}`;
    const response = await authFetch(deleteListingURL, {
      method: "DELETE",
    });
    if (response.status !== 200) {
      throw new Error("Listing not deleted");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete listing");
  }
}
