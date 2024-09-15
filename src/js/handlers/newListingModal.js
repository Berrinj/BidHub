import { newListing } from "../api/listings/newListing.js";

export async function openNewListingModal() {
  const modal = document.querySelector("#newListingModal");
  const modalHeader = modal.querySelector(".modal-header");
  const modalTitle = modalHeader.querySelector(".modal-title");
  modalTitle.textContent = "Create a new listing";
  modalTitle.classList.add("new-listing-modal-title", "text-center");
  modalHeader.appendChild(modalTitle);
  const modalBody = modal.querySelector(".modal-body");
  modalBody.innerHTML = "";
  const form = document.createElement("form");
  form.classList.add("new-listing-form", "w-75", "mx-auto");
  const title = document.createElement("div");
  title.classList.add("form-group");
  const titleLabel = document.createElement("label");
  titleLabel.setAttribute("for", "title");
  titleLabel.textContent = "Title";
  const titleInput = document.createElement("input");
  titleInput.classList.add("form-control");
  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("id", "title");
  titleInput.setAttribute("name", "title");
  titleInput.setAttribute("required", true);
  titleInput.setAttribute("placeholder", "Listing title");
  titleInput.setAttribute("maxlength", 30);
  title.appendChild(titleLabel);
  title.appendChild(titleInput);
  form.appendChild(title);
  const description = document.createElement("div");
  description.classList.add("form-group");
  const descriptionLabel = document.createElement("label");
  descriptionLabel.setAttribute("for", "description");
  descriptionLabel.textContent = "Description";
  const descriptionInput = document.createElement("textarea");
  descriptionInput.classList.add("form-control");
  descriptionInput.setAttribute("id", "description");
  descriptionInput.setAttribute("name", "description");
  //   descriptionInput.setAttribute("required", false);
  description.appendChild(descriptionLabel);
  description.appendChild(descriptionInput);
  form.appendChild(description);
  const tags = document.createElement("div");
  tags.classList.add("form-group");
  const tagsLabel = document.createElement("label");
  tagsLabel.setAttribute("for", "tags");
  tagsLabel.textContent = "Tags";
  const tagsInput = document.createElement("input");
  tagsInput.classList.add("form-control");
  tagsInput.setAttribute("type", "text");
  tagsInput.setAttribute("id", "tags");
  tagsInput.setAttribute("name", "tags");
  tags.appendChild(tagsLabel);
  tags.appendChild(tagsInput);
  form.appendChild(tags);

  const media = document.createElement("div");
  media.classList.add("form-group");
  const mediaLabel = document.createElement("label");
  mediaLabel.setAttribute("for", "media");
  mediaLabel.textContent = "Media";
  const mediaInput = document.createElement("input");
  mediaInput.classList.add("form-control");
  mediaInput.setAttribute("type", "url");
  mediaInput.setAttribute("id", "media");
  mediaInput.setAttribute("name", "media");

  const mediaInputTwo = document.createElement("input");
  mediaInputTwo.classList.add("form-control", "mt-2");
  mediaInputTwo.setAttribute("type", "url");
  mediaInputTwo.setAttribute("id", "media");
  mediaInputTwo.setAttribute("name", "media");

  media.appendChild(mediaLabel);
  media.appendChild(mediaInput);
  media.appendChild(mediaInputTwo);

  form.appendChild(media);
  const endsAt = document.createElement("div");
  endsAt.classList.add("form-group");
  const endsAtLabel = document.createElement("label");
  endsAtLabel.setAttribute("for", "endsAt");
  endsAtLabel.textContent = "Ends At";
  const endsAtInput = document.createElement("input");
  endsAtInput.classList.add("form-control");
  endsAtInput.setAttribute("type", "datetime-local");
  endsAtInput.setAttribute("id", "endsAt");
  endsAtInput.setAttribute("name", "endsAt");
  endsAtInput.setAttribute("required", true);
  //   const error = document.createElement("div");
  //   error.classList.add("invalid-entry");
  //   error.textContent =
  //     "Please enter a valid date and time, it must be in the future";
  //   error.style.display = "none";
  endsAt.appendChild(endsAtLabel);
  endsAt.appendChild(endsAtInput);
  //   endsAt.appendChild(error);
  form.appendChild(endsAt);
  const errorMsg = document.createElement("div");
  errorMsg.classList.add("error-message");
  errorMsg.style.display = "none";
  errorMsg.textContent = "Oh no! Something went wrong. Please try again.";
  form.appendChild(errorMsg);
  const addListingBtn = document.createElement("button");
  addListingBtn.classList.add(
    "btn",
    "btn-secondary-custom",
    "text-white",
    "mt-2",
    "w-100",
  );
  addListingBtn.setAttribute("type", "submit");
  addListingBtn.textContent = "Create Listing";
  form.appendChild(addListingBtn);
  addListingBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const title = formData.get("title");
    const description = formData.get("description");
    const tags = formData.get("tags").split(",");
    const media = formData.get("media");
    const endsAt = formData.get("endsAt");
    const newListingData = {
      title,
      description,
      tags,
      media,
      endsAt,
    };
    const response = await newListing(newListingData);
    if (response.error) {
      errorMsg.style.display = "block";
    } else {
      errorMsg.style.display = "none";
      console.log(response);
      form.reset();
    }
  });
  modalBody.appendChild(form);
}
