import { newListing } from "../api/listings/newListing.js";
import { addImgInput } from "../templates/imgInput.js";

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
  title.classList.add("form-group", "mb-2");
  const titleLabel = document.createElement("label");
  titleLabel.setAttribute("for", "title");
  titleLabel.textContent = "Title*";
  const titleInput = document.createElement("input");
  titleInput.classList.add("form-control");
  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("id", "title");
  titleInput.setAttribute("name", "title");
  titleInput.setAttribute("required", true);
  titleInput.setAttribute("placeholder", "What are you selling?");
  titleInput.setAttribute("maxlength", 30);
  title.appendChild(titleLabel);
  title.appendChild(titleInput);
  form.appendChild(title);

  const description = document.createElement("div");
  description.classList.add("form-group", "mb-2");
  const descriptionLabel = document.createElement("label");
  descriptionLabel.setAttribute("for", "description");
  descriptionLabel.textContent = "Description";
  const descriptionInput = document.createElement("textarea");
  descriptionInput.classList.add("form-control");
  descriptionInput.setAttribute("id", "description");
  descriptionInput.setAttribute("name", "description");
  descriptionInput.setAttribute("placeholder", "Describe your listing");
  descriptionInput.setAttribute("rows", 3);
  description.appendChild(descriptionLabel);
  description.appendChild(descriptionInput);
  form.appendChild(description);

  const tagsContainer = document.createElement("div");
  const addTagsBtn = document.createElement("p");
  addTagsBtn.classList.add("small", "btn", "btn-nav-footer-custom", "mt-2");
  addTagsBtn.textContent = "+ Add tags";
  addTagsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addTagsBtn.style.display = "none";
    const tags = document.createElement("div");
    tags.classList.add("form-group", "mb-2");
    const tagsLabel = document.createElement("label");
    tagsLabel.setAttribute("for", "tags");
    tagsLabel.textContent = "Tags";
    const tagsInput = document.createElement("input");
    tagsInput.classList.add("form-control");
    tagsInput.setAttribute("type", "text");
    tagsInput.setAttribute("id", "tags");
    tagsInput.setAttribute("name", "tags");
    tagsInput.setAttribute("placeholder", "Separate tags with a comma (,)");
    tags.appendChild(tagsLabel);
    tags.appendChild(tagsInput);
    tagsContainer.appendChild(tags);
  });
  form.appendChild(tagsContainer);
  form.appendChild(addTagsBtn);

  //Image input
  const imagesContainer = document.createElement("div");
  imagesContainer.classList.add("images-container");
  const addImagesBtn = document.createElement("p");
  addImagesBtn.classList.add("small", "btn", "btn-nav-footer-custom", "mt-2");
  addImagesBtn.textContent = "+ Add images";
  addImagesBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addImagesBtn.style.display = "none";
    addImgInput();
  });
  form.appendChild(imagesContainer);
  form.appendChild(addImagesBtn);

  const endsAt = document.createElement("div");
  endsAt.classList.add("form-group");
  const endsAtLabel = document.createElement("label");
  endsAtLabel.setAttribute("for", "endsAt");
  endsAtLabel.textContent = "Listing ends at*";
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
