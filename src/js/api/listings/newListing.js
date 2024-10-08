import { API_URL_LISTINGS } from "../constants.js";
import { authFetch } from "../authFetch.js";

/**
 * @name newListing
 * @description a function that creates a new listing
 * @throws {Error} if the POST fails or an error occurs during the process.
 * @returns - the new listing
 */

export async function newListing() {
  try {
    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const tags = document.querySelector("#tags").value.split(",");

    const media = [];
    const imageURLs = document.querySelectorAll('input[name="imageURL"]');
    const imageAltTexts = document.querySelectorAll(
      'input[name="imageAltText"]',
    );

    imageURLs.forEach((imageURL, index) => {
      const url = imageURL.value;
      const alt = imageAltTexts[index]?.value || "";
      if (url) {
        media.push({ url, alt });
      }
    });

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
      throw new Error("Listing not created");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create listing");
  }
}
