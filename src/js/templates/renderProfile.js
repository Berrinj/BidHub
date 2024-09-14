import { load } from "../storage/index.js";
import { remove } from "../storage/index.js";
import { displayProfile } from "../api/profile/display.js";
// import { getProfile } from "../profile/get.js";

export async function renderProfile() {
  const placeholders = {
    avatar: "../../../src/images/placeholder-images/avatar.jpg",
    bidImg: "../../../src/images/placeholder-images/token-branded--bidz.png",
    bidSVG: "../../../src/images/svg/token--bidz.svg",
  };
  const storage = load("profile");
  const url = new URL(location.href);
  const getName = url.searchParams.get("name") || storage.name;
  const profileInfo = await displayProfile(getName);
  console.log(profileInfo);
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

  //create profile name
  const profileName = document.createElement("h2");
  profileName.classList.add("profile-name", "display-6", "mb-0");
  profileName.textContent = profileInfo.data.name;

  //create profile bio
  const profileBio = document.createElement("p");
  profileBio.classList.add("profile-bio", "lead");
  profileBio.textContent = `Bio: ${profileInfo.data.bio}`;

  //create credits
  const profileCredits = document.createElement("p");
  profileCredits.classList.add("profile-credits", "fw-light", "fst-italic");
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
  listingsValue.classList.add("profile-listings", "lead");
  listingsValue.textContent = `${listings} Listings`;
  const viewAllBtn = document.createElement("a");
  viewAllBtn.classList.add("btn", "btn-primary", "btn-sm");
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
  listingsWinsValue.classList.add("profile-listings", "lead");
  listingsWinsValue.textContent = `${wins} Wins`;
  const viewAllWinsBtn = document.createElement("a");
  viewAllWinsBtn.classList.add("btn", "btn-primary", "btn-sm");
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
  logoutBtn.appendChild(logoutBtnLink);
  logoutBtn.addEventListener("click", () => {
    remove("profile");
    remove("token");
    window.location.href = "/";
  });

  listingsContainer.appendChild(logoutBtn);

  // append everything to the profile
  profileImg.appendChild(profileImage);
  profileBody.appendChild(profileName);
  if (storage.name === profileInfo.data.name) {
    profileImg.appendChild(editProfileBtn);
    profileBody.appendChild(profileCredits);
  }
  profileBody.appendChild(profileBio);
  //   listingsContainer.appendChild(listingsImg);
  //   listingsInfo.appendChild(listingsValue);
  //   listingsInfo.appendChild(viewAllBtn);
  //   listingsContainer.appendChild(listingsInfo);
}
