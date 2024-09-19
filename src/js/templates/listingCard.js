import { countdownTimer } from "../handlers/timeDate.js";
import { openBidModal } from "../handlers/bidModal.js";
import { truncateText } from "../handlers/truncateText.js";
import { load } from "../storage/index.js";
const token = load("token");

// const listingsContainer = document.querySelector(
//   ".all-listings-container .row",
// );

export async function renderListingCard(container, listing) {
  const coinSVG = `../../../src/images/svg/noto--coin.svg`;
  const listingID = listing.id;
  let lastBidAmount = 0;
  let lastBidder = "";
  let bidderName = "";
  if (listing.bids && listing.bids.length > 0) {
    const lastBid = listing.bids[listing.bids.length - 1];
    lastBidAmount = lastBid.amount;
    lastBidder = `(@${lastBid.bidder.name})`;
    bidderName = lastBid.bidder.name;
  }

  //Listing Card and its components
  const listingCard = document.createElement("div");
  listingCard.classList.add(
    "listing-card",
    "card",
    "col-10",
    "col-sm-5",
    "col-md-4",
    "col-lg-3",
    "col-xl-3",
    "text-truncate",
    "rounded",
    "m-1",
    "p-0",
    "bg-light",
    "shadow-sm",
    "m-4",
  );
  // if (new Date(listing.endsAt) < new Date()) {
  //   listingCard.classList.add("d-none");
  // }
  listingCard.dataset.id = listingID;
  let mediaURL = "";

  if (listing.media.length > 0) {
    mediaURL = `${listing.media[0].url}`;
  } else {
    mediaURL = `../../../src/images/placeholder-images/token-branded--bidz.png`;
  }

  const cardHeader = document.createElement("div");
  cardHeader.classList.add(
    "all-listings-card-header",
    "position-relative",
    "p-0",
  );
  cardHeader.style.cursor = "pointer";
  // listing header image container
  const listingHeaderImg = document.createElement("div");
  listingHeaderImg.classList.add("all-listings-header-img");

  // append the image
  const headerImg = document.createElement("img");
  headerImg.src = mediaURL;
  headerImg.classList.add("border-bottom", "header-img");
  listingHeaderImg.appendChild(headerImg);

  cardHeader.appendChild(listingHeaderImg);
  // countdown container and its components
  const countdownContainer = document.createElement("div");
  countdownContainer.classList.add(
    "countdown",
    "position-absolute",
    "top-0",
    "start-0",
    "mt-1",
    "ms-1",
  );

  //create img and text div for countdown
  const countdownSvgText = document.createElement("div");
  countdownSvgText.classList.add(
    "rounded",
    "d-inline-block",
    "shadow-sm",
    "bg-accent-custom",
  );

  // Create the countdown SVG
  const countdownSVG = document.createElement("img");
  countdownSVG.src = `../../../src/images/svg/eos-icons--hourglass.svg`;
  countdownSVG.classList.add("countdown-svg", "pb-1", "ps-1", "pe-1");

  const countdownText = document.createElement("p");
  countdownText.classList.add(
    "card-text",
    "countdown-text",
    "rounded",
    "d-inline-block",
    "pe-1",
  );
  countdownText.textContent = "..Loading";
  countdownSvgText.appendChild(countdownSVG);
  countdownSvgText.appendChild(countdownText);
  countdownContainer.appendChild(countdownSvgText);

  // countdownContainer.appendChild(countdownText);
  cardHeader.appendChild(countdownContainer);

  // Card body and its components
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "pb-0", "pt-0");

  // title
  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("text-wrap", "card-title");
  const titleText = truncateText(listing.title, 30);
  cardTitle.textContent = titleText;
  cardBody.appendChild(cardTitle);

  // bids
  const bidsContainer = document.createElement("div");
  bidsContainer.classList.add("d-flex", "bids", "flex-column");

  const priceContainer = document.createElement("div");
  priceContainer.classList.add("d-inline-flex", "card-text");

  // price
  const priceText = document.createElement("p");
  priceText.classList.add(
    "card-text",
    "d-flex",
    "align-items-center",
    "fw-semibold",
  );
  priceText.textContent = "Price: ";

  // svg
  const coinImg = document.createElement("img");
  coinImg.src = coinSVG;
  coinImg.alt = "coin icon";
  coinImg.classList.add("bids-img", "ms-1");
  priceText.appendChild(coinImg);

  // last bid amount
  const lastBidAmountText = document.createTextNode(lastBidAmount);
  priceText.appendChild(lastBidAmountText);

  // last bidder @
  const lastBidderLink = document.createElement("a");
  lastBidderLink.classList.add("card-text", "fst-italic", "ms-1");
  lastBidderLink.textContent = lastBidder;
  lastBidderLink.href = `/profile/?name=${bidderName}`;

  priceContainer.appendChild(priceText);
  priceContainer.appendChild(lastBidderLink);
  bidsContainer.appendChild(priceContainer);

  // number of bids
  const bidsCount = document.createElement("p");
  bidsCount.classList.add("card-text");
  bidsCount.textContent = `Bids: ${listing._count.bids}`;
  bidsContainer.appendChild(bidsCount);

  // Append bids container to card body
  cardBody.appendChild(bidsContainer);

  // cardBody.appendChild(bidsCount);

  // listing owner
  const listingOwner = document.createElement("div");
  listingOwner.classList.add(
    "d-flex",
    "justify-content-center",
    "align-items-center",
    "mb-2",
  );
  const listingOwnerUsername = document.createElement("p");
  listingOwnerUsername.classList.add(
    "card-text",
    "fst-italic",
    "listing-owner",
  );
  listingOwnerUsername.textContent = `${listing.seller.name}`;
  const listingOwnerAvatar = document.createElement("img");
  listingOwnerAvatar.src = `${listing.seller.avatar.url}`;
  listingOwnerAvatar.classList.add(
    "listing-owner-avatar",
    "rounded-circle",
    "me-1",
  );
  listingOwnerAvatar.alt =
    listing.seller.avatar.alt || "avatar of profile owner";
  listingOwner.appendChild(listingOwnerAvatar);
  listingOwner.appendChild(listingOwnerUsername);
  // cardBody.appendChild(listingOwner);

  // Create the listing buttons container
  const listingBtns = document.createElement("div");
  listingBtns.classList.add(
    "listing-btns",
    "d-flex",
    "align-items-center",
    "justify-content-around",
  );

  // Create the bid now button
  const bidBtn = document.createElement("button");
  bidBtn.classList.add("btn", "btn-secondary-custom", "bid-btn");
  bidBtn.textContent = "Bid now";
  bidBtn.dataset.id = listingID;
  bidBtn.setAttribute("data-bs-target", "#bidModal");
  bidBtn.setAttribute("data-bs-toggle", "modal");
  if (!token) {
    bidBtn.disabled = true;
    bidBtn.classList.add("disabled");
    bidBtn.title = "You need to be logged in to bid";
  }
  bidBtn.addEventListener("click", () => {
    openBidModal(listing, listingID, mediaURL, lastBidAmount);
  });

  // Create the view listing button
  const viewBtn = document.createElement("a");
  viewBtn.href = `/listings/listing/?id=${listingID}`;
  viewBtn.classList.add("btn", "btn-primary-custom", "view-btn");
  viewBtn.textContent = "View listing";

  // Append buttons to the listing buttons container
  if (new Date(listing.endsAt) < new Date()) {
    bidBtn.disabled = true;
    bidBtn.classList.add("disabled");
  }
  listingBtns.appendChild(bidBtn);
  listingBtns.appendChild(viewBtn);

  // Append listing buttons to the card body
  cardBody.appendChild(listingBtns);
  cardBody.appendChild(listingOwner);

  // Append everything to the card
  listingCard.appendChild(cardHeader);
  listingCard.appendChild(cardBody);
  //get current url
  cardHeader.addEventListener("click", () => {
    window.location.href = `/listings/listing/?id=${listingID}`;
  });

  container.appendChild(listingCard);
  const getCoundown = listingCard.querySelector(".countdown p");
  countdownTimer(listing.endsAt, getCoundown);

  return listingCard;
}
