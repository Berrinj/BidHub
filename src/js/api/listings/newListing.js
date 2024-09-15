import { API_URL_LISTINGS } from "../constants.js";
import { authFetch } from "../authFetch.js";

export async function newListing() {
  try {
    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const tags = document.querySelector("#tags").value.split(",");

    const media = [
      {
        url: document.querySelector("#media").value,
      },
    ];
    const endsAt = document.querySelector("#endsAt").value;

    if (!title) {
      throw new Error("missing title, can't create listing");
    }
    if (!endsAt) {
      throw new Error("missing endsAt, can't create listing");
    }

    const endsAtISO = new Date(endsAt).toISOString();

    const response = await authFetch(API_URL_LISTINGS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tags: tags,
        media: media,
        endsAt: endsAtISO,
      }),
    });
    if (response.status === 201) {
      return await response.json();
    }
    if (response.status !== 200) {
      console.log("OH NOOOO");
      throw new Error("Listing not created");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create listing");
  }
}
