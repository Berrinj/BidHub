import { load } from "../../storage/index.js";
import { displayProfile } from "../profile/display.js";
// import { getProfile } from "../profile/get.js";

export async function renderProfile() {
  const placeholders = {
    avatar: "../../../src/images/placeholder-images/avatar.jpg",
    bidImg: "../../../src/images/placeholder-images/token-branded--bidz.png",
  };
  const storage = load("profile");
  const url = new URL(location.href);
  const getName = url.searchParams.get("name") || storage.name;
  const profileInfo = await displayProfile(getName);
  console.log(profileInfo);
  const avatarURL = profileInfo.data.avatar.url || placeholders.avatar;

  const profileImg = document.querySelector(".profile-img");
  const profileBody = document.querySelector(".profile-body");
  // create the profile image
  const profileImage = document.createElement("img");
  profileImage.classList.add(
    "profile-avatar",
    "rounded-circle",
    "object-fit-cover",
  );
  profileImage.src = avatarURL;
  profileImage.alt = profileInfo.data.avatar.alt || "Profile image";
  const editProfileBtn = document.createElement("p");
  editProfileBtn.classList.add(
    "edit-profile",
    "text-primary",
    "fw-light",
    "fst-italic",
  );
  editProfileBtn.textContent = "Edit Profile";

  //create profile name
  const profileName = document.createElement("h2");
  profileName.classList.add("profile-name", "display-6");
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
  listingsContainer.classList.add("d-flex", "align-items-center");
  const listingsImg = document.createElement("img");
  listingsImg.classList.add("profile-listings-img");
  listingsImg.src = placeholders.bidImg;
  const listingsInfo = document.createElement("div");
  listingsInfo.classList.add("profile-listings-info");
  const listingsValue = document.createElement("p");
  listingsValue.classList.add("profile-listings", "lead");
  listingsValue.textContent = `${listings} Listings`;
  const viewAllBtn = document.createElement("a");
  viewAllBtn.classList.add("btn", "btn-primary", "btn-sm");
  viewAllBtn.textContent = "View all";

  // append everything to the profile
  profileImg.appendChild(profileImage);
  profileImg.appendChild(editProfileBtn);
  profileBody.appendChild(profileName);
  if (storage.name === profileInfo.data.name) {
    profileBody.appendChild(profileCredits);
  }
  profileBody.appendChild(profileBio);
  listingsContainer.appendChild(listingsImg);
  listingsInfo.appendChild(listingsValue);
  listingsInfo.appendChild(viewAllBtn);
  listingsContainer.appendChild(listingsInfo);
}
