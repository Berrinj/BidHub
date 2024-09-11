import { API_URL_LISTINGS } from "../constants.js";
import { authFetch } from "../authFetch.js";

const bids = "_bids=true";
const seller = "_seller=true";
// const listings = "_listings=true";
// const wins = "_wins=true";

// /**
//  * Fetches all listings from the API
//  * @param {string} name username of the profile to fetch
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
  } catch (error) {
    console.error(error);
    throw new Error("Failed to display listings");
  }
}
// export async function displayProfile(name) {
//   try {
//     if (!name) {
//       throw new Error("get requires a profile name");
//     }
//     const displayProfileURL = `${API_URL_PROFILE}/${name}?${listings}&${bids}&${wins}`;
//     console.log(displayProfileURL);
//     const response = await authFetch(displayProfileURL);
//     if (response.ok) {
//       return await response.json();
//     }
//   } catch (error) {
//     console.error(error);
//     throw new Error("Failed to display profile");
//   }
// }
