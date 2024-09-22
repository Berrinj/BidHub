/**
 * @name updateProfileForm
 * @description Update the profile with the profile data, avatar and bio
 * @param {*} container - The container to update the profile form
 * @param {*} oldUrl - The old avatar url plaved in the input field
 * @param {*} oldBio - The old bio placed in the input field
 * @returns updated profile
 */

export function updateProfileForm(container, oldUrl, oldBio) {
  container.innerHTML = "";
  const form = document.createElement("form");
  form.classList.add("update-profile-form");
  form.setAttribute("id", "updateProfileForm");
  const updateFormGroup = document.createElement("div");
  updateFormGroup.classList.add("form-group", "mb-2");
  const updateLabel = document.createElement("label");
  updateLabel.setAttribute("for", "update-avatar");
  updateLabel.textContent = "Update Profile Avatar";
  const updateInput = document.createElement("input");
  updateInput.classList.add("form-control");
  updateInput.setAttribute("type", "url");
  updateInput.setAttribute("id", "update-avatar");
  updateInput.setAttribute("name", "update-avatar");
  updateInput.setAttribute(
    "title",
    "only accepts an image url, e.g. http:// or https://",
  );
  updateInput.setAttribute("placeholder", "Enter a http:// or https:// URL");
  updateInput.setAttribute("value", oldUrl);
  updateFormGroup.appendChild(updateLabel);
  updateFormGroup.appendChild(updateInput);
  form.appendChild(updateFormGroup);

  const updateBio = document.createElement("div");
  updateBio.classList.add("form-group", "mb-2");
  const bioLabel = document.createElement("label");
  bioLabel.setAttribute("for", "update-bio");
  bioLabel.textContent = "Update Bio";
  const bioInput = document.createElement("textarea");
  bioInput.classList.add("form-control");
  bioInput.setAttribute("id", "update-bio");
  bioInput.setAttribute("type", "text");
  bioInput.setAttribute("name", "update-bio");
  bioInput.setAttribute("title", "Update your bio");
  bioInput.setAttribute("placeholder", "Update your bio");
  bioInput.textContent = oldBio;
  updateBio.appendChild(bioLabel);
  updateBio.appendChild(bioInput);

  form.appendChild(updateBio);

  const submitBtn = document.createElement("button");
  submitBtn.classList.add(
    "update-profile-btn",
    "btn",
    "btn-primary-custom",
    "mt-2",
  );
  submitBtn.textContent = "Update Profile";
  form.appendChild(submitBtn);
  container.appendChild(form);
}
