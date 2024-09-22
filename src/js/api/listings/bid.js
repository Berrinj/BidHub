import { API_URL_LISTINGS } from "../constants.js";
import { authFetch } from "../authFetch.js";

/**
 * @name placeBid
 * @description a function that places a bid
 * @param {string} id - the listing id
 * @param {number} amount - the amount to bid
 * @throws {Error} if the POST fails or an error occurs during the process.
 * @returns - the response of the bid
 */

export async function placeBid(id, amount) {
  try {
    if (!id) {
      throw new Error("missing ID, can't place bid");
    }
    if (!amount) {
      throw new Error("missing amount, can't place bid");
    }
    const placeBidURL = `${API_URL_LISTINGS}/${id}/bids`;
    const response = await authFetch(placeBidURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount }),
    });
    if (response.status === 201) {
      return await response.json();
    }
    if (response.status !== 200) {
      throw new Error("Bid not placed");
    }
  } catch (error) {
    const errorMsg = document.querySelector(".bid-error");
    errorMsg.style.display = "block";
    errorMsg.textContent = error.message;
    throw new Error("Failed to place bid");
  }
}
