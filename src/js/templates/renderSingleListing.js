import { displayListing } from "../api/listings/display.js";
import { countdownTimer } from "../handlers/timeDate.js";

export async function renderSingleListing() {
  //get id from url
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  const response = await displayListing(id);
  const listing = response.data;
  const listingContainer = document.querySelector(".single-listings-container");
  console.log(listing);
  const coinSVG = `../../../src/images/svg/noto--coin.svg`;

  let lastBidAmount = 0;
  let lastBidder = "";
  let bidderName = "";
  if (listing.bids && listing.bids.length > 0) {
    const lastBid = listing.bids[listing.bids.length - 1];
    lastBidAmount = lastBid.amount;
    lastBidder = `(@${lastBid.bidder.name})`;
    bidderName = lastBid.bidder.name;
  }

  const listingCard = document.createElement("div");
  listingCard.classList.add(
    "listing-card",
    "card",
    "col-10",
    "text-truncate",
    "rounded",
    "m-1",
    "p-0",
    "bg-light",
    "shadow-sm",
    "m-4",
  );

  let mediaURL = "";
  if (listing.media.length > 0) {
    mediaURL = `${listing.media[0].url}`;
  } else {
    mediaURL = `../../../src/images/placeholder-images/token-branded--bidz.png`;
  }

  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header", "position-relative", "p-0");

  // Create the listing header image container
  const listingHeaderImg = document.createElement("div");
  listingHeaderImg.classList.add("listing-header-img");

  // Create and append the image
  const headerImg = document.createElement("img");
  headerImg.src = mediaURL;
  headerImg.classList.add("border-bottom", "header-img");
  listingHeaderImg.appendChild(headerImg);

  // Create the countdown container
  const countdownContainer = document.createElement("div");
  countdownContainer.classList.add(
    "countdown",
    "position-absolute",
    "top-0",
    "start-0",
    "mt-1",
    "ms-1",
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

  // Append image and countdown to the card header
  cardHeader.appendChild(listingHeaderImg);
  cardHeader.appendChild(countdownContainer);

  // Create the card body
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "pb-0", "pt-0");

  // Create the title
  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("text-wrap", "card-title");
  cardTitle.textContent = listing.title;
  cardBody.appendChild(cardTitle);

  // Create the bids container
  const bidsContainer = document.createElement("div");
  bidsContainer.classList.add("d-flex", "bids");

  // Create the price text
  const priceText = document.createElement("p");
  priceText.classList.add("card-text", "d-flex", "align-items-center");
  priceText.textContent = "Price: ";

  // Create the coin image
  const coinImg = document.createElement("img");
  coinImg.src = coinSVG;
  coinImg.alt = "coin icon";
  coinImg.classList.add("bids-img", "ms-1");
  priceText.appendChild(coinImg);

  // Append the last bid amount
  const lastBidAmountText = document.createTextNode(lastBidAmount);
  priceText.appendChild(lastBidAmountText);

  // Create the last bidder text
  const lastBidderLink = document.createElement("a");
  lastBidderLink.classList.add("card-text", "fst-italic", "ms-1");
  lastBidderLink.textContent = lastBidder;
  lastBidderLink.href = `/profile/?name=${bidderName}`;

  // Append price and last bidder to bids container
  bidsContainer.appendChild(priceText);
  bidsContainer.appendChild(lastBidderLink);

  // Append bids container to card body
  cardBody.appendChild(bidsContainer);

  // Create the number of bids text
  const bidsCount = document.createElement("p");
  bidsCount.classList.add("card-text");
  bidsCount.textContent = `Bids: ${listing._count.bids}`;
  cardBody.appendChild(bidsCount);

  // Create the listing buttons container
  const listingBtns = document.createElement("div");
  listingBtns.classList.add(
    "listing-btns",
    "d-flex",
    "align-items-center",
    "justify-content-around",
  );

  // Create the bid now button
  const bidBtn = document.createElement("a");
  bidBtn.href = "#";
  bidBtn.classList.add("btn", "btn-secondary-custom", "bid-btn");
  bidBtn.textContent = "Bid now";

  // Append listing buttons to the card body
  cardBody.appendChild(bidBtn);

  // Append everything to the card
  listingCard.appendChild(cardHeader);
  listingCard.appendChild(cardBody);

  listingContainer.appendChild(listingCard);
  const getCoundown = listingCard.querySelector(".countdown p");
  countdownTimer(listing.endsAt, getCoundown);
}
