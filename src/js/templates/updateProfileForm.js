export function updateProfileForm(container, oldUrl) {
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
