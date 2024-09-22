import { load } from "../storage/index.js";
import { remove } from "../storage/index.js";
import { displayProfile } from "../api/profile/display.js";
import { updateProfileForm } from "./updateProfileForm.js";
import { setUpdateProfileFormListener } from "../handlers/updateProfile.js";
import { renderListingCard } from "./listingCard.js";
import { displayProfileListings } from "../api/profile/display.js";
import { goBackBtn } from "../handlers/goBackBtn.js";

/**
 * @name renderProfile
 * @description renders the profile page, with the user's profile information and stats. If the user is not logged in, it will display an error message
 * @returns {void} - No return value, but renders the profile page with the user's information
 * @throws {error} - If the user is not logged in, it will display an error message
 */

export async function renderProfile() {
  goBackBtn();
  const placeholders = {
    avatar: "../../../src/images/placeholder-images/avatar.jpg",
    bidImg: "../../../src/images/placeholder-images/token-branded--bidz.png",
    bidSVG: "../../../src/images/svg/token--bidz.svg",
  };
  const SVG = {
    settings: "../../../src/images/svg/lucide--settings.svg",
    exitSettings: "../../../src/images/svg/fontisto--close.svg",
    logOut: "../../../src/images/svg/system-uicons--exit-left.svg",
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
    "text-primary-custom",
    "fst-italic",
    "mx-auto",
    "d-flex",
  );
  editProfileBtn.innerHTML = `<img class="me-1" src="${SVG.settings}" alt="settings icon">Edit Profile`;
  editProfileBtn.style.cursor = "pointer";
  const exitEditMode = document.createElement("p");
  exitEditMode.classList.add(
    "exit-edit-mode",
    "text-primary-custom",
    "fst-italic",
    "mx-auto",
    "d-flex",
    "d-none",
  );
  exitEditMode.innerHTML = `<img class="me-1" src="${SVG.exitSettings}" alt="exit settings icon">Exit Edit Mode`;
  exitEditMode.style.cursor = "pointer";

  editProfileBtn.addEventListener("click", () => {
    editProfileBtn.classList.add("d-none");
    exitEditMode.classList.remove("d-none");
    updateProfileForm(profileBody, avatarURL, profileInfo.data.bio);
    setUpdateProfileFormListener();
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
    "col-12",
    "col-lg-4",
    "justify-content-center",
    "mt-4",
  );
  const listingsImg = document.createElement("img");
  listingsImg.classList.add("profile-listings-img");
  listingsImg.src = placeholders.bidSVG;
  listingsImg.alt = "listings hammer icon";
  const listingsInfo = document.createElement("div");
  listingsInfo.classList.add("profile-listings-info");
  const listingsValue = document.createElement("p");
  listingsValue.classList.add("profile-listings", "lead", "mb-1");
  listingsValue.textContent = `${listings} Listings`;
  const viewAllBtn = document.createElement("a");
  viewAllBtn.classList.add("p-0", "lead", "text-primary");
  viewAllBtn.style.cursor = "pointer";
  viewAllBtn.textContent = "View all";

  const allListings = await displayProfileListings(
    profileInfo.data.name,
    "listings",
    ".view-listings",
  );

  const closeViewListings = document.createElement("p");
  closeViewListings.classList.add(
    "p-0",
    "d-none",
    "lead",
    "text-primary",
    "close-view",
    "mb-0",
  );
  closeViewListings.style.cursor = "pointer";
  closeViewListings.textContent = "Close view";

  viewAllBtn.addEventListener("click", () => {
    closeViewListings.classList.remove("d-none");
    viewAllBtn.classList.add("d-none");
    if (!closeViewWins.classList.contains("d-none")) {
      closeViewWins.classList.add("d-none");
      viewAllWinsBtn.classList.remove("d-none");
    } else if (!closeViewBids.classList.contains("d-none")) {
      closeViewBids.classList.add("d-none");
      viewAllBidsBtn.classList.remove("d-none");
    }

    viewListings.innerHTML = "";
    allListings.data.forEach((listing) => {
      renderListingCard(viewListings, listing);
    });
  });

  closeViewListings.addEventListener("click", () => {
    closeViewListings.classList.add("d-none");
    viewAllBtn.classList.remove("d-none");
    viewListings.innerHTML = "";
  });

  listingsSumContainer.appendChild(listingsImg);
  listingsInfo.appendChild(listingsValue);
  listingsInfo.appendChild(viewAllBtn);
  listingsInfo.appendChild(closeViewListings);
  listingsSumContainer.appendChild(listingsInfo);
  listingsContainer.appendChild(listingsSumContainer);

  //create listings wins from the profile
  const wins = profileInfo.data._count.wins;
  const listingsWinsContainer = document.createElement("div");
  listingsWinsContainer.classList.add(
    "profile-listings-wins",
    "d-flex",
    "align-items-center",
    "col-12",
    "col-lg-4",
    "justify-content-center",
    "mt-4",
  );
  const listingsWinsImg = document.createElement("img");
  listingsWinsImg.classList.add("profile-listings-img");
  listingsWinsImg.src = placeholders.bidSVG;
  listingsWinsImg.alt = "listings hammer icon";
  const listingsWinsInfo = document.createElement("div");
  listingsWinsInfo.classList.add("profile-listings-info");
  const listingsWinsValue = document.createElement("p");
  listingsWinsValue.classList.add("profile-listings", "lead", "mb-1");
  listingsWinsValue.textContent = `${wins} Wins`;
  const viewAllWinsBtn = document.createElement("a");
  viewAllWinsBtn.classList.add(
    "p-0",
    "lead",
    "text-primary",
    "view-all-listings",
  );
  viewAllWinsBtn.style.cursor = "pointer";
  viewAllWinsBtn.textContent = "View all";

  const viewListings = document.createElement("div");
  viewListings.classList.add(
    "view-listings",
    "col-12",
    "d-inline-flex",
    "flex-wrap",
    "justify-content-center",
  );

  const closeViewWins = document.createElement("p");
  closeViewWins.classList.add(
    "p-0",
    "d-none",
    "lead",
    "text-primary",
    "close-view",
    "mb-0",
  );
  closeViewWins.style.cursor = "pointer";
  closeViewWins.textContent = "Close view";

  listingsWinsContainer.appendChild(listingsWinsImg);
  listingsWinsInfo.appendChild(listingsWinsValue);
  listingsWinsInfo.appendChild(viewAllWinsBtn);
  listingsWinsInfo.appendChild(closeViewWins);
  listingsWinsContainer.appendChild(listingsWinsInfo);
  listingsContainer.appendChild(listingsWinsContainer);

  const allWins = await displayProfileListings(
    profileInfo.data.name,
    "wins",
    ".view-listings",
  );

  viewAllWinsBtn.addEventListener("click", () => {
    closeViewWins.classList.remove("d-none");
    if (!closeViewListings.classList.contains("d-none")) {
      closeViewListings.classList.add("d-none");
      viewAllBtn.classList.remove("d-none");
    } else if (!closeViewBids.classList.contains("d-none")) {
      closeViewBids.classList.add("d-none");
      viewAllBidsBtn.classList.remove("d-none");
    }

    viewAllWinsBtn.classList.add("d-none");
    viewListings.innerHTML = "";
    allWins.data.forEach((listing) => {
      renderListingCard(viewListings, listing);
    });
  });
  closeViewWins.addEventListener("click", () => {
    closeViewWins.classList.add("d-none");
    viewAllWinsBtn.classList.remove("d-none");
    viewListings.innerHTML = "";
  });

  // alll bids by the profile
  const allBids = await displayProfileListings(
    profileInfo.data.name,
    "bids",
    ".view-listings",
  );

  const listingsBidsContainer = document.createElement("div");
  listingsBidsContainer.classList.add(
    "profile-listings-bids",
    "d-flex",
    "align-items-center",
    "col-12",
    "col-lg-4",
    "justify-content-center",
    "mt-4",
  );
  const allBidsSum = allBids.data.length;
  const listingsBidsImg = document.createElement("img");
  listingsBidsImg.classList.add("profile-listings-img");
  listingsBidsImg.src = placeholders.bidSVG;
  listingsBidsImg.alt = "listings hammer icon";
  const listingsBidsInfo = document.createElement("div");
  listingsBidsInfo.classList.add("profile-listings-info");
  const listingsBidsValue = document.createElement("p");
  listingsBidsValue.classList.add("profile-listings", "lead", "mb-1");
  listingsBidsValue.textContent = `${allBidsSum} Bids`;

  const viewAllBidsBtn = document.createElement("a");
  viewAllBidsBtn.classList.add(
    "p-0",
    "lead",
    "text-primary",
    "view-all-listings",
  );
  viewAllBidsBtn.style.cursor = "pointer";
  viewAllBidsBtn.textContent = "View all";

  const viewBids = document.createElement("div");
  viewBids.classList.add(
    "view-listings",
    "col-12",
    "d-inline-flex",
    "flex-wrap",
    "justify-content-center",
  );

  const closeViewBids = document.createElement("p");
  closeViewBids.classList.add(
    "p-0",
    "d-none",
    "lead",
    "text-primary",
    "close-view",
    "mb-0",
  );
  closeViewBids.style.cursor = "pointer";
  closeViewBids.textContent = "Close view";

  listingsBidsContainer.appendChild(listingsBidsImg);
  listingsBidsInfo.appendChild(listingsBidsValue);
  listingsBidsInfo.appendChild(viewAllBidsBtn);
  listingsBidsInfo.appendChild(closeViewBids);
  listingsBidsContainer.appendChild(listingsBidsInfo);
  listingsContainer.appendChild(listingsBidsContainer);

  viewAllBidsBtn.addEventListener("click", () => {
    closeViewBids.classList.remove("d-none");
    if (!closeViewListings.classList.contains("d-none")) {
      closeViewListings.classList.add("d-none");
      viewAllBtn.classList.remove("d-none");
    } else if (!closeViewWins.classList.contains("d-none")) {
      closeViewWins.classList.add("d-none");
      viewAllWinsBtn.classList.remove("d-none");
    }

    viewAllBidsBtn.classList.add("d-none");
    viewListings.innerHTML = "";
    const bidsList = document.createElement("div");
    bidsList.classList.add(
      "view-listings",
      "col-12",
      "d-inline-flex",
      "flex-wrap",
      "justify-content-center",
    );
    const bidsUl = document.createElement("ul");
    bidsUl.classList.add("bids-list", "mt-5");
    viewListings.appendChild(bidsList);
    bidsList.appendChild(bidsUl);
    allBids.data.forEach((bid) => {
      const listingsBidOn = bid.listing;
      const bidLi = document.createElement("li");
      bidLi.classList.add("bid-li");
      const bidLink = document.createElement("a");
      bidLink.classList.add("bid-link");
      bidLink.href = `/listings/listing/?id=${listingsBidOn.id}`;
      bidLink.textContent = `Bid: ${bid.amount} credit, On: ${listingsBidOn.title}`;
      bidLi.appendChild(bidLink);
      bidsUl.appendChild(bidLi);
      viewListings.appendChild(bidsList);
    });
  });
  closeViewBids.addEventListener("click", () => {
    closeViewBids.classList.add("d-none");
    viewAllBidsBtn.classList.remove("d-none");
    viewListings.innerHTML = "";
  });

  //append
  listingsContainer.appendChild(viewListings);

  // add logout button
  const logoutBtn = document.querySelector(".logout");
  const logoutBtnLink = document.createElement("p");
  logoutBtnLink.classList.add(
    "link",
    "fst-italic",
    "d-flex",
    "log-out",
    "text-uppercase",
  );
  logoutBtnLink.innerHTML = `<img class="me-1" src="${SVG.logOut}" alt="log out icon">Log out`;
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
  }
  profileBody.appendChild(profileBio);
  profileBody.appendChild(profileEmail);
}
