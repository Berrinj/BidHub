import { API_URL_LISTINGS } from "../constants.js";
import { authFetch } from "../authFetch.js";

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
