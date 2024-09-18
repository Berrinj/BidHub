import { load } from "../storage/index.js";
import { remove } from "../storage/index.js";
import { displayProfile } from "../api/profile/display.js";
import { updateProfileForm } from "./updateProfileForm.js";
import { setUpdateProfileFormListener } from "../handlers/updateProfile.js";
// import { login } from "../api/auth/login.js";
// import { getProfile } from "../profile/get.js";

export async function renderProfile() {
  const placeholders = {
    avatar: "../../../src/images/placeholder-images/avatar.jpg",
    bidImg: "../../../src/images/placeholder-images/token-branded--bidz.png",
    bidSVG: "../../../src/images/svg/token--bidz.svg",
  };
  const loadingText = document.querySelector(".loading-text");
  const errorMsg = document.querySelector(".main-content");
  const storage = load("profile");
  if (!storage) {
    loadingText.style.display = "none";
    const errorProfile = document.createElement("div");
    errorProfile.classList.add("error-profile");
    const errorText = document.createElement("p");
    errorText.classList.add("text-center", "display-6");
    errorText.textContent = "You need to be logged in to view this page!";
    const loginRegister = document.createElement("div");
    loginRegister.classList.add(
      "d-flex",
      "justify-content-center",
      "mt-4",
      "flex-wrap",
    );
    const loginBtn = document.createElement("a");
    loginBtn.classList.add(
      "btn",
      "btn-primary-custom",
      "d-inline-block",
      "m-2",
    );
    loginBtn.setAttribute("data-bs-toggle", "modal");
    loginBtn.setAttribute("data-bs-target", "#loginModal");
    loginBtn.textContent = "Log in";
    const registerBtn = document.createElement("a");
    registerBtn.classList.add(
      "btn",
      "btn-primary-custom",
      "d-inline-block",
      "m-2",
    );
    registerBtn.setAttribute("data-bs-toggle", "modal");
    registerBtn.setAttribute("data-bs-target", "#registerModal");
    registerBtn.textContent = "Register";
    errorProfile.appendChild(errorText);
    loginRegister.appendChild(loginBtn);
    loginRegister.appendChild(registerBtn);
    errorProfile.appendChild(loginRegister);
    errorMsg.appendChild(errorProfile);
    return;
  }
  const url = new URL(location.href);
  const getName = url.searchParams.get("name") || storage.name;
  const profileInfo = await displayProfile(getName, errorMsg);
  console.log(profileInfo);
  loadingText.style.display = "none";
  const avatarURL = profileInfo.data.avatar.url || placeholders.avatar;
  const profileImg = document.querySelector(".profile-img");
  const profileBody = document.querySelector(".profile-body");
  profileBody.innerHTML = "";

  // create the profile image
  const profileImage = document.createElement("img");
  profileImage.classList.add(
    "profile-avatar",
    "rounded-circle",
    "object-fit-cover",
    "mx-auto",
  );
  profileImage.src = avatarURL;
  profileImage.alt = profileInfo.data.avatar.alt || "Profile image";
  const editProfileBtn = document.createElement("p");
  editProfileBtn.classList.add(
    "edit-profile",
    "text-primary",
    "fw-light",
    "fst-italic",
    "mx-auto",
  );
  editProfileBtn.textContent = "Edit Profile";
  editProfileBtn.style.cursor = "pointer";
  const exitEditMode = document.createElement("p");
  exitEditMode.classList.add(
    "exit-edit-mode",
    "text-primary",
    "fw-light",
    "fst-italic",
    "mx-auto",
    "d-none",
  );
  exitEditMode.textContent = "Exit Edit Mode";
  exitEditMode.style.cursor = "pointer";

  editProfileBtn.addEventListener("click", () => {
    editProfileBtn.classList.add("d-none");
    exitEditMode.classList.remove("d-none");
    updateProfileForm(profileBody, avatarURL);
    setUpdateProfileFormListener();
    // https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  });
  exitEditMode.addEventListener("click", () => {
    window.location.reload();
  });

  //create profile name
  const profileName = document.createElement("h2");
  profileName.classList.add("profile-name", "mb-0", "display-6");
  profileName.textContent = profileInfo.data.name.toUpperCase();

  //create profile email
  const profileEmail = document.createElement("p");
  profileEmail.classList.add(
    "profile-email",
    "fst-italic",
    "fwt-light",
    "text-primary-custom",
  );
  profileEmail.innerHTML = `Contact: <a href="mailto:${profileInfo.data.email}">${profileInfo.data.email}</a>`;

  //create profile bio
  const profileBio = document.createElement("p");
  profileBio.classList.add("profile-bio", "lead", "text-primary-custom");
  if (!profileInfo.data.bio) {
    profileBio.classList.add("fst-italic");
    profileBio.textContent = "No bio available";
  } else {
    profileBio.textContent = `Bio: ${profileInfo.data.bio}`;
  }

  //create credits
  const profileCredits = document.createElement("p");
  profileCredits.classList.add(
    "profile-credits",
    "text-primary-custom",
    "fst-italic",
    // "mb-0",
    // "fw-light",
  );
  profileCredits.textContent = `${profileInfo.data.credits} credits available`;

  //create listings info from the profile
  const listings = profileInfo.data._count.listings;
  const listingsContainer = document.querySelector(".profile-listings");

  // create number of listings from the profile
  const listingsSumContainer = document.createElement("div");
  listingsSumContainer.classList.add(
    "profile-listings-sum",
    "d-flex",
    "align-items-center",
    "col-md-6",
    "col-12",
    "justify-content-center",
    "mt-4",
  );
  const listingsImg = document.createElement("img");
  listingsImg.classList.add("profile-listings-img");
  listingsImg.src = placeholders.bidSVG;
  const listingsInfo = document.createElement("div");
  listingsInfo.classList.add("profile-listings-info");
  const listingsValue = document.createElement("p");
  listingsValue.classList.add("profile-listings", "lead", "mb-1");
  listingsValue.textContent = `${listings} Listings`;
  const viewAllBtn = document.createElement("a");
  // viewAllBtn.classList.add("btn", "btn-primary", "btn-sm");
  viewAllBtn.classList.add("p-0", "lead", "text-primary");
  viewAllBtn.style.cursor = "pointer";
  viewAllBtn.textContent = "View all";
  viewAllBtn.addEventListener("click", () => {
    window.location.href = "./listings/index.html";
  });
  listingsSumContainer.appendChild(listingsImg);
  listingsInfo.appendChild(listingsValue);
  listingsInfo.appendChild(viewAllBtn);
  listingsSumContainer.appendChild(listingsInfo);
  listingsContainer.appendChild(listingsSumContainer);

  //create listings wins from the profile
  const wins = profileInfo.data._count.wins;
  const listingsWinsContainer = document.createElement("div");
  listingsWinsContainer.classList.add(
    "profile-listings-wins",
    "d-flex",
    "align-items-center",
    "col-md-6",
    "col-12",
    "justify-content-center",
    "mt-4",
  );
  const listingsWinsImg = document.createElement("img");
  listingsWinsImg.classList.add("profile-listings-img");
  listingsWinsImg.src = placeholders.bidSVG;
  const listingsWinsInfo = document.createElement("div");
  listingsWinsInfo.classList.add("profile-listings-info");
  const listingsWinsValue = document.createElement("p");
  listingsWinsValue.classList.add("profile-listings", "lead", "mb-1");
  listingsWinsValue.textContent = `${wins} Wins`;
  const viewAllWinsBtn = document.createElement("a");
  viewAllWinsBtn.classList.add("p-0", "lead", "text-primary");
  viewAllWinsBtn.style.cursor = "pointer";
  viewAllWinsBtn.textContent = "View all";
  listingsWinsContainer.appendChild(listingsWinsImg);
  listingsWinsInfo.appendChild(listingsWinsValue);
  listingsWinsInfo.appendChild(viewAllWinsBtn);
  listingsWinsContainer.appendChild(listingsWinsInfo);
  listingsContainer.appendChild(listingsWinsContainer);

  // add logout button
  const logoutBtn = document.querySelector(".logout");
  const logoutBtnLink = document.createElement("p");
  logoutBtnLink.classList.add("link", "fst-italic");
  logoutBtnLink.textContent = "Log out";
  logoutBtn.addEventListener("click", () => {
    remove("profile");
    remove("token");
    window.location.href = "/";
  });

  // append everything to the profile
  profileImg.appendChild(profileImage);
  profileBody.appendChild(profileName);
  if (storage.name === profileInfo.data.name) {
    profileImg.appendChild(editProfileBtn);
    profileImg.appendChild(exitEditMode);
    profileBody.appendChild(profileCredits);
    logoutBtn.appendChild(logoutBtnLink);
    listingsContainer.appendChild(logoutBtn);
  }
  profileBody.appendChild(profileBio);
  profileBody.appendChild(profileEmail);
  //   listingsContainer.appendChild(listingsImg);
  //   listingsInfo.appendChild(listingsValue);
  //   listingsInfo.appendChild(viewAllBtn);
  //   listingsContainer.appendChild(listingsInfo);
}
