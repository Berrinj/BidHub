import { displayListings } from "../api/listings/display.js";
import { countdownTimer } from "../handlers/timeDate.js";
import { openBidModal } from "../handlers/bidModal.js";

export async function renderAllListings() {
  // const listings = await displayListings();
  let page = 1;
  const firstResponse = await displayListings(1);
  console.log(firstResponse);
  const pageCount = firstResponse.meta.pageCount;
  console.log(`Page count: ${pageCount}`);
  let allListings = [...firstResponse.data];
  console.log(`Page ${page} data:`, firstResponse);

  for (let i = 2; i <= pageCount; i++) {
    const response = await displayListings(i);
    console.log(`Page ${i} data:`, response);
    allListings = allListings.concat(response.data);
    console.log(allListings);
  }

  const listingsArray = allListings;
  listingsArray.sort((a, b) => new Date(b.endsAt) - new Date(a.endsAt));
  console.log(listingsArray);
  // if (!Array.isArray(listingsArray)) {
  //   console.error("Expected an array but got:", listingsArray);
  //   return;
  // }

  const listingsHeader = document.querySelector(".listings-header");
  listingsHeader.classList.remove("d-none");
  const listingsContainer = document.querySelector(
    ".all-listings-container .row",
  );

  const loading = document.querySelector(".loading-text");
  loading.innerHTML = "";
  listingsArray.forEach((listing) => {
    // const endsAt = formatDate(listing.endsAt);
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
    //skip if listing has a title of test
    if (listing.title === "test") {
      return;
    }
    //skip if ended
    if (new Date(listing.endsAt) < new Date()) {
      return;
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
    listingCard.dataset.id = listingID;

    let mediaURL = "";
    if (listing.media.length > 0) {
      mediaURL = `${listing.media[0].url}`;
    } else {
      mediaURL = `../../../src/images/placeholder-images/token-branded--bidz.png`;
    }

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header", "position-relative", "p-0");

    // listing header image container
    const listingHeaderImg = document.createElement("div");
    listingHeaderImg.classList.add("listing-header-img");

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

    cardHeader.appendChild(countdownContainer);

    // Card body and its components
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "pb-0", "pt-0");

    // title
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("text-wrap", "card-title");
    cardTitle.textContent = listing.title;
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

    bidBtn.addEventListener("click", () => {
      openBidModal(listing, listingID, mediaURL, lastBidAmount);
    });

    // Create the view listing button
    const viewBtn = document.createElement("a");
    viewBtn.href = `listing/?id=${listingID}`;
    viewBtn.classList.add("btn", "btn-primary-custom", "view-btn");
    viewBtn.textContent = "View listing";

    // Append buttons to the listing buttons container
    listingBtns.appendChild(bidBtn);
    listingBtns.appendChild(viewBtn);

    // Append listing buttons to the card body
    cardBody.appendChild(listingBtns);

    // Append everything to the card
    listingCard.appendChild(cardHeader);
    listingCard.appendChild(cardBody);

    listingsContainer.appendChild(listingCard);
    const getCoundown = listingCard.querySelector(".countdown p");
    countdownTimer(listing.endsAt, getCoundown);
  });
}
