import { displayListing } from "../api/listings/display.js";
import { countdownTimer } from "../handlers/timeDate.js";
import { formatDate } from "../handlers/timeDate.js";
import { load } from "../storage/index.js";
import { openBidModal } from "../handlers/bidModal.js";
import { deleteListing } from "../api/listings/delete.js";
import { updateListingModal } from "./updateListingModal.js";

/**
 * @name renderSingleListing
 * @description Renders a single listing on the listing/index.html page
 * @returns {void} - No return value, but renders the listing on the page
 */

export async function renderSingleListing() {
  //get id from url
  const errorMsg = document.querySelector(".main-content");
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  const response = await displayListing(id, errorMsg);
  const listing = response.data;
  const listingHeader = document.querySelector(".single-listing-header");
  const listingBody = document.querySelector(".single-listing-body");
  listingBody.innerHTML = "";

  const coinSVG = `../../../src/images/svg/noto--coin.svg`;

  const listingSellerAvatar = listing.seller.avatar.url || "";

  let lastBidAmount = 0;
  if (listing.bids && listing.bids.length > 0) {
    const lastBid = listing.bids[listing.bids.length - 1];
    lastBidAmount = lastBid.amount;
  }

  //Create Listing Title
  const listingTitle = document.createElement("h1");
  listingTitle.classList.add(
    "listing-title",
    "text-center",
    "display-3",
    "mb-0",
  );
  listingTitle.textContent = listing.title;

  //Create Listing Seller
  const listingSeller = document.createElement("a");
  listingSeller.classList.add(
    "mx-auto",
    "text-center",
    "d-block",
    "mb-2",
    "mt-1",
  );
  listingSeller.innerHTML = `<img src="${listingSellerAvatar}" alt="seller avatar" class="rounded-circle avatar-listing"> ${listing.seller.name}`;
  listingSeller.href = `/profile/?name=${listing.seller.name}`;

  //append listing title and seller to header
  listingHeader.appendChild(listingTitle);
  listingHeader.appendChild(listingSeller);

  //Create Image Gallery Carousel
  const imageGalleryContainer = document.createElement("div");
  imageGalleryContainer.classList.add("carousel-container", "mx-auto");
  const carousel = document.createElement("div");
  carousel.classList.add("carousel", "slide", "carousel-fade");
  carousel.id = "carouselControls";
  carousel.setAttribute("data-bs-ride", "carousel");

  //indicators
  const carouselIndicators = document.createElement("div");
  carouselIndicators.classList.add("carousel-indicators");

  //Carousel inner
  const carouselInner = document.createElement("div");
  carouselInner.classList.add(
    "carousel-inner",
    "rounded",
    "bg-nav-footer-custom",
  );

  //Carousel items
  listing.media.forEach((media, index) => {
    const carouselIndicator = document.createElement("button");
    carouselIndicator.classList.add("carousel-indicator");
    carouselIndicator.setAttribute("type", "button");
    carouselIndicator.setAttribute("data-bs-target", "#carouselControls");
    carouselIndicator.setAttribute("data-bs-slide-to", index);
    carouselIndicator.setAttribute("aria-label", `Slide ${index + 1}`);

    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");
    if (index === 0) {
      carouselIndicator.classList.add("active");
      carouselItem.classList.add("active");
    }
    //if there is only one image, hide the indicators
    if (listing.media.length <= 1) {
      carouselIndicator.classList.add("d-none");
    }
    const carouselImg = document.createElement("img");

    carouselImg.src = media.url;

    carouselImg.classList.add("d-block", "w-100", "listing-image", "rounded");
    carouselImg.alt = "listing image";
    carouselIndicators.appendChild(carouselIndicator);
    carouselItem.appendChild(carouselImg);
    carouselInner.appendChild(carouselItem);
  });

  if (carouselInner.children.length === 0) {
    const carouselItem = document.createElement("div");
    carouselItem.classList.add(
      "carousel-item",
      "active",
      "listing-placeholer-img",
      "position-relative",
    );
    const carouselImg = document.createElement("img");
    carouselImg.src = `../../../src/images/placeholder-images/banner.jpg`;
    carouselImg.classList.add(
      "d-block",
      "w-100",
      "listing-image",
      "rounded",
      "opacity-50",
    );
    carouselImg.alt = "no listing image found, placeholder image";
    const noImageText = document.createElement("p");
    noImageText.classList.add(
      "no-image-text",
      "position-absolute",
      "top-50",
      "start-50",
      "translate-middle",
      "fst-italic",
      "mb-0",
      "bg-neutral-custom",
      "bg-opacity-50",
      "p-2",
      "rounded",
      "text-center",
    );
    noImageText.textContent = "No image available";
    carouselItem.appendChild(carouselImg);
    carouselItem.appendChild(noImageText);
    carouselInner.appendChild(carouselItem);
  }

  carousel.appendChild(carouselIndicators);
  carousel.appendChild(carouselInner);
  //Carousel controls
  const carouselPrev = document.createElement("button");
  carouselPrev.classList.add("carousel-control-prev");
  carouselPrev.setAttribute("type", "button");
  carouselPrev.setAttribute("data-bs-target", "#carouselControls");
  carouselPrev.setAttribute("data-bs-slide", "prev");
  const carouselPrevIcon = document.createElement("span");
  carouselPrevIcon.classList.add("carousel-control-prev-icon");
  carouselPrevIcon.setAttribute("aria-hidden", "true");
  const carouselPrevText = document.createElement("span");
  carouselPrevText.classList.add("visually-hidden");
  carouselPrevText.textContent = "Previous";
  carouselPrev.appendChild(carouselPrevIcon);
  carouselPrev.appendChild(carouselPrevText);
  const carouselNext = document.createElement("button");
  carouselNext.classList.add("carousel-control-next");
  carouselNext.setAttribute("type", "button");
  carouselNext.setAttribute("data-bs-target", "#carouselControls");
  carouselNext.setAttribute("data-bs-slide", "next");
  const carouselNextIcon = document.createElement("span");
  carouselNextIcon.classList.add("carousel-control-next-icon");
  carouselNextIcon.setAttribute("aria-hidden", "true");
  const carouselNextText = document.createElement("span");
  carouselNextText.classList.add("visually-hidden");
  carouselNextText.textContent = "Next";
  carouselNext.appendChild(carouselNextIcon);
  carouselNext.appendChild(carouselNextText);
  carousel.appendChild(carouselPrev);
  carousel.appendChild(carouselNext);
  if (carouselInner.children.length <= 1) {
    carouselPrev.classList.add("d-none");
    carouselNext.classList.add("d-none");
    carouselInner.classList.remove("bg-nav-footer-custom");
  }

  imageGalleryContainer.appendChild(carousel);
  listingBody.appendChild(imageGalleryContainer);

  //create listing details container
  const listingDetailsContainer = document.createElement("div");
  listingDetailsContainer.classList.add("listing-details");

  const listingDetails = document.createElement("div");
  listingDetails.classList.add("card-body", "p-2", "text-wrap");

  // Create the countdown container
  const countdownContainer = document.createElement("div");
  countdownContainer.classList.add("countdown", "text-center", "mb-2");

  //create img and text div for countdown
  const countdownSvgText = document.createElement("div");
  countdownSvgText.classList.add(
    "rounded",
    "d-inline-block",
    "shadow-sm",
    "bg-accent-custom",
    "bg-opacity-50",
  );

  // Create the countdown SVG
  const countdownSVG = document.createElement("img");
  countdownSVG.src = `../../../src/images/svg/eos-icons--hourglass.svg`;
  countdownSVG.classList.add("countdown-svg", "pb-1", "ps-1", "pe-1");

  // Create the countdown text
  const countdownText = document.createElement("p");
  countdownText.classList.add(
    "countdown-p",
    // "rounded",
    // "bg-accent-custom",
    "d-inline-block",
    "pe-1",
    "m-0",
  );
  countdownText.textContent = "..Loading";
  countdownSvgText.appendChild(countdownSVG);
  countdownSvgText.appendChild(countdownText);
  countdownContainer.appendChild(countdownSvgText);

  // countdownContainer.appendChild(countdownText);

  listingDetails.appendChild(countdownContainer);

  // Create the listing details
  const listingDescription = document.createElement("p");
  listingDescription.classList.add("card-text", "listing-description");
  if (listing.description === "") {
    listing.description = "No description provided";
  }
  listingDescription.innerHTML = `<b>Description:</b> ${listing.description}`;
  listingDetails.appendChild(listingDescription);
  listingDetailsContainer.appendChild(listingDetails);
  listingBody.appendChild(listingDetailsContainer);

  const Qs = document.createElement("p");
  Qs.innerHTML = `<strong>Questions?</strong> Send an email to the seller: <a href="mailto:${listing.seller.email}">${listing.seller.email}</a>`;
  listingDetails.appendChild(Qs);

  const listingStats = document.createElement("div");
  listingStats.classList.add("listing-stats", "d-flex", "flex-column", "mb-2");

  const createdDate = formatDate(listing.created);
  const updatedDate = formatDate(listing.updated);
  const created = document.createElement("p");
  created.classList.add("card-text", "created", "mb-0", "fst-italic");
  created.innerHTML = `<strong>Created:</strong> ${createdDate}`;
  const updated = document.createElement("p");
  updated.classList.add("card-text", "updated", "mb-0", "fst-italic");
  updated.innerHTML = `<strong>Updated:</strong> ${updatedDate}`;
  listingStats.appendChild(created);
  if (listing.updated > listing.created) {
    listingStats.appendChild(updated);
  }
  listingDetails.appendChild(listingStats);

  const tagsContainer = document.createElement("div");
  tagsContainer.classList.add("tags", "mb-2", "d-inline-block", "col-12");
  if (listing.tags.length === 0) {
    const noTags = document.createElement("p");
    noTags.textContent = "No tags provided";
    tagsContainer.appendChild(noTags);
  }
  listing.tags.forEach((tag) => {
    const tags = document.createElement("span");
    tags.classList.add(
      "badge",
      "bg-accent-custom",
      "opacity-75",
      "me-1",
      "mb-1",
      "text-dark",
    );
    tags.textContent = tag;
    tagsContainer.appendChild(tags);
  });
  listingDetails.appendChild(tagsContainer);

  const editListingBtns = document.createElement("div");
  editListingBtns.classList.add(
    "edit-listing-btns",
    "d-flex",
    "flex-column",
    "align-items-center",
    "mb-2",
  );

  const deleteListingBtn = document.createElement("button");
  deleteListingBtn.classList.add(
    "btn",
    "btn-outline-danger",
    "delete-listing-btn",
  );
  deleteListingBtn.textContent = "Delete Listing";
  deleteListingBtn.dataset.id = listing.id;
  deleteListingBtn.addEventListener("click", async () => {
    const response = await deleteListing(listingID);
    if (response) {
      window.location.href = "/listings";
    }
  });

  const updateListingBtn = document.createElement("button");
  updateListingBtn.classList.add(
    "btn",
    "btn-outline-primary",
    "update-listing-btn",
    "mt-2",
  );
  updateListingBtn.textContent = "Update Listing";
  updateListingBtn.dataset.id = listing.id;
  updateListingBtn.setAttribute("data-bs-target", "#updateListingModal");
  updateListingBtn.setAttribute("data-bs-toggle", "modal");
  updateListingBtn.addEventListener("click", () => {
    updateListingModal(listing);
  });

  editListingBtns.appendChild(deleteListingBtn);
  editListingBtns.appendChild(updateListingBtn);

  if (load("profile") && listing.seller.name === load("profile").name) {
    listingDetails.appendChild(editListingBtns);
  }

  const bidsContainer = document.createElement("div");
  bidsContainer.classList.add("d-flex", "flex-column", "bids");

  const bids = document.createElement("div");
  bids.classList.add("bids", "d-flex", "flex-column", "align-items-center");
  const highestBid = document.createElement("p");
  highestBid.classList.add(
    "card-text",
    "highest-bid",
    "display-6",
    "d-flex",
    "align-items-center",
  );
  highestBid.innerHTML = `Current Bid: <img src="${coinSVG}" class="current-bid-svg ps-1 pe-1"> ${lastBidAmount}`;

  const bidButton = document.createElement("button");
  bidButton.classList.add("btn", "btn-secondary-custom", "bid-btn", "mb-3");
  bidButton.textContent = "Bid Now";
  bidButton.dataset.id = listing.id;
  bidButton.setAttribute("data-bs-target", "#bidModal");
  bidButton.setAttribute("data-bs-toggle", "modal");
  const listingID = listing.id;
  let mediaURL = "";
  if (listing.media.length === 0) {
    mediaURL = "../../../src/images/placeholder-images/banner.jpg";
  } else {
    mediaURL = listing.media[0].url;
  }

  bidButton.addEventListener("click", () => {
    openBidModal(listing, listingID, mediaURL, lastBidAmount);
  });

  const bidHistoryTitle = document.createElement("p");
  bidHistoryTitle.classList.add("h6");
  bidHistoryTitle.textContent = "Bid History:";
  bidHistoryTitle.classList.add("bid-history-title");
  const bidHistoryUl = document.createElement("ol");
  bidHistoryUl.classList.add("bid-history-list");
  if (listing.bids && listing.bids.length > 0) {
    listing.bids.forEach((bid) => {
      const bidSet = formatDate(bid.created);
      const bidHistoryLi = document.createElement("li");
      bidHistoryLi.setAttribute("data-toggle", "tooltip");
      bidHistoryLi.setAttribute("data-placement", "top");
      bidHistoryLi.setAttribute("title", `Bid placed at: ${bidSet}`);
      bidHistoryLi.classList.add("bid-history-item");
      bidHistoryLi.innerHTML = `<img src="${coinSVG}" alt="" class="pb-1">
                                <strong>${bid.amount}</strong> Bid by: <a href="/profile/?name=${bid.bidder.name}" aria-label="Profile of ${bid.bidder.name}">@${bid.bidder.name}</a>`;

      bidHistoryUl.appendChild(bidHistoryLi);
    });
  } else {
    const noBids = document.createElement("li");
    noBids.textContent = "No bids yet";
    bidHistoryUl.appendChild(noBids);
  }

  bids.appendChild(highestBid);
  if (load("profile")) {
    bids.appendChild(bidButton);
    bids.appendChild(bidHistoryTitle);
    bids.appendChild(bidHistoryUl);
  } else {
    const loginToBid = document.createElement("p");
    loginToBid.classList.add("fst-italic");
    loginToBid.textContent = "Login to place a bid and view stats";
    bids.appendChild(loginToBid);
  }
  bidsContainer.appendChild(bids);
  listingDetails.appendChild(bidsContainer);

  // Target the countdown element and start the countdown
  const getCoundown = listingBody.querySelector(".countdown p");
  countdownTimer(listing.endsAt, getCoundown);
}
