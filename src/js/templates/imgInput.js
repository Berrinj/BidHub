/**
 * @name assImgInput
 * @description Add image URL and image ALT text input fields to the form, this happens upon clicking the "Add more images" button
 * @returns {object} - The image URL and image ALT text input fields
 */

export function addImgInput() {
  const imagesContainer = document.querySelector(".images-container");
  const imageURL = document.createElement("div");
  imageURL.classList.add("form-group", "mb-2");

  const imageURLLabel = document.createElement("label");
  imageURLLabel.setAttribute("for", "imageURL");
  imageURLLabel.textContent = "Image URL";

  const imageURLInput = document.createElement("input");
  imageURLInput.classList.add("form-control");
  imageURLInput.setAttribute("type", "url");
  imageURLInput.setAttribute("id", "imageURL");
  imageURLInput.setAttribute("name", "imageURL");
  imageURLInput.setAttribute("placeholder", "Enter a http:// or https:// URL");

  imageURL.appendChild(imageURLLabel);
  imageURL.appendChild(imageURLInput);

  const imageAltText = document.createElement("div");
  const imageAltTextArrow = `../../../src/images/svg/clarity--child-arrow-line.svg`;
  imageAltText.classList.add("form-group", "mb-2");

  const imageAltTextLabel = document.createElement("label");
  imageAltTextLabel.classList.add("ps-2", "small");
  imageAltTextLabel.setAttribute("for", "imageAltText");
  imageAltTextLabel.innerHTML = `<img src="${imageAltTextArrow}"> Add ALT text for image`;

  const imageAltTextInput = document.createElement("input");
  imageAltTextInput.classList.add("form-control");
  imageAltTextInput.setAttribute("type", "text");
  imageAltTextInput.setAttribute("id", "imageAltText");
  imageAltTextInput.setAttribute("name", "imageAltText");
  imageAltTextInput.setAttribute(
    "placeholder",
    "Enter a description for the image",
  );

  imageAltText.appendChild(imageAltTextLabel);
  imageAltText.appendChild(imageAltTextInput);

  imagesContainer.appendChild(imageURL);
  imagesContainer.appendChild(imageAltText);

  const addMoreImagesBtn = document.createElement("p");
  addMoreImagesBtn.classList.add(
    "small",
    "btn",
    "btn-nav-footer-custom",
    "mt-2",
  );
  addMoreImagesBtn.textContent = "+ Add more images";
  addMoreImagesBtn.addEventListener("click", (e) => {
    addMoreImagesBtn.style.display = "none";
    e.preventDefault();
    addImgInput();
  });
  imagesContainer.appendChild(addMoreImagesBtn);

  return { imageURL, imageAltText };
}
