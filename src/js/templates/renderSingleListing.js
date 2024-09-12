import { displayListing } from "../api/listings/display.js";
import { countdownTimer } from "../handlers/timeDate.js";
import { formatDate } from "../handlers/timeDate.js";
import { load } from "../storage/index.js";

export async function renderSingleListing() {
  //get id from url
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  const response = await displayListing(id);
  const listing = response.data;
  //   const listingContainer = document.querySelector(".single-listings-container");
  const listingHeader = document.querySelector(".single-listing-header");
  const listingBody = document.querySelector(".single-listing-body");
  listingBody.innerHTML = "";
  //   const listingFooter = document.querySelector(".single-listing-footer");
  console.log(listing);
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
  imageGalleryContainer.classList.add("carousel-container");
  const carousel = document.createElement("div");
  carousel.classList.add("carousel", "slide", "carousel-fade");
  carousel.id = "carouselControls";
  carousel.setAttribute("data-bs-ride", "carousel");
  const carouselInner = document.createElement("div");
  carouselInner.classList.add("carousel-inner");
  //Carousel items
  listing.media.forEach((media, index) => {
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");
    if (index === 0) {
      carouselItem.classList.add("active");
    }
    const carouselImg = document.createElement("img");

    carouselImg.src = media.url;

    carouselImg.classList.add("d-block", "w-100", "listing-image", "rounded");
    carouselImg.alt = "listing image";
    carouselItem.appendChild(carouselImg);
    carouselInner.appendChild(carouselItem);
  });

  if (carouselInner.children.length === 0) {
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item", "active", "opacity-50");
    const carouselImg = document.createElement("img");
    carouselImg.src = `../../../src/images/placeholder-images/banner.jpg`;
    carouselImg.classList.add("d-block", "w-100", "listing-image", "rounded");
    carouselImg.alt = "no listing image found, placeholder image";
    carouselItem.appendChild(carouselImg);
    carouselInner.appendChild(carouselItem);
  }

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
  countdownContainer.classList.add(
    "countdown",
    "text-end",
    // "position-absolute",
    // "top-0",
    // "start-0",
    // "mt-1",
    // "ms-1",
  );

  // Create the countdown text
  const countdownText = document.createElement("p");
  countdownText.classList.add(
    "card-text",
    "countdown",
    "rounded",
    "bg-accent-custom",
    "d-inline-block",
    "ps-1",
    "pe-1",
  );
  countdownText.textContent = "..Loading";
  countdownContainer.appendChild(countdownText);

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
  bidButton.textContent = "Place Bid";

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
    bids.appendChild(bidHistoryTitle);
    bids.appendChild(bidHistoryUl);
    bids.appendChild(bidButton);
  } else {
    const loginToBid = document.createElement("p");
    loginToBid.classList.add("fst-italic");
    loginToBid.textContent = "Login to place a bid and view stats";
    bids.appendChild(loginToBid);
  }
  bidsContainer.appendChild(bids);
  listingDetails.appendChild(bidsContainer);

  //   listingContainer.appendChild(listingBody);
  //create button in footer
  //   const bidButton = document.createElement("button");
  //   bidButton.classList.add("btn", "btn-secondary-custom", "bid-btn");
  //   bidButton.textContent = "Place Bid";
  //   listingFooter.appendChild(bidButton);

  // Target the countdown element and start the countdown
  const getCoundown = listingBody.querySelector(".countdown p");
  countdownTimer(listing.endsAt, getCoundown);
}
