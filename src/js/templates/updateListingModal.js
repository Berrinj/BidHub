import { updateListing } from "../api/listings/update.js";

/**
 * @name updateListingModal
 * @description Update the listing with the listing data, title, description and tags
 * @param {*} listing - The listing data to be updated
 * @returns updated listing
 */

export function updateListingModal(listing) {
  const updateListingModal = document.querySelector("#updateListingModal");
  const form = updateListingModal.querySelector("form");
  const title = form.querySelector("#title");
  const description = form.querySelector("#description");
  const tags = form.querySelector("#tags");
  updateListingModal.setAttribute("data-id", listing.id);
  updateListingModal.setAttribute("data-title", listing.title);
  updateListingModal.setAttribute("data-description", listing.description);
  updateListingModal.setAttribute("data-tags", listing.tags);
  updateListingModal.setAttribute("data-endsAt", listing.endsAt);
  updateListingModal.setAttribute("data-media", listing.media);
  title.value = listing.title;
  description.value = listing.description;
  tags.value = listing.tags;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = {
      title: title.value,
      description: description.value,
      tags: tags.value.split(","),
    };
    try {
      await updateListing(listing.id, data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  });
}
