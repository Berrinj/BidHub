import { displayListings } from "../api/listings/display.js";
// import { formatDate } from "../../handlers/timeDate.js";
import { countdownTimer } from "../handlers/timeDate.js";

export async function renderAllListings() {
  const listings = await displayListings();

  console.log(listings);

  const listingsArray = listings.data;
  if (!Array.isArray(listingsArray)) {
    console.error("Expected an array but got:", listingsArray);
    return;
  }

  const listingsContainer = document.querySelector(
    ".all-listings-container .row",
  );

  listingsArray.forEach((listing) => {
    // const endsAt = formatDate(listing.endsAt);
    const coinSVG = `../../../src/images/svg/noto--coin.svg`;
    let lastBidAmount = 0;
    let lastBidder = "";
    if (listing.bids && listing.bids.length > 0) {
      const lastBid = listing.bids[listing.bids.length - 1];
      lastBidAmount = lastBid.amount;
      lastBidder = `(@${lastBid.bidder.name})`;
    }
    //skip if listing has a title of test
    if (listing.title === "test") {
      return;
    }
    //if endsAt is in the past, skip
    if (new Date(listing.endsAt) < new Date()) {
      return;
    }

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

    let mediaURL = "";
    if (listing.media.length > 0) {
      mediaURL = `${listing.media[0].url}`;
    } else {
      mediaURL = `../../../src/images/placeholder-images/token-branded--bidz.png`;
    }

    listingCard.innerHTML = `
    <div class="card-header position-relative p-0">
    <div class="listing-header-img">
        <img src="${mediaURL}" class="border-bottom header-img"/>
        </div>
        <div class="countdown position-absolute top-0 start-0 mt-1 ms-1">
        <p class="card-text countdown rounded bg-accent-custom d-inline-block ps-1 pe-1">..Loading</p>
        </div>
        </div>
        <div class="card-body pb-0 pt-0">
        <h5 class="text-wrap card-title">${listing.title}</h5>
        <div class="d-flex bids">
        <p class="card-text d-flex align-items-center">Price: <img src="${coinSVG}" alt="coin icon" class="bids-img ms-1">${lastBidAmount}</p>
        <p class="card-text fst-italic ms-1">${lastBidder}</p>
        </div>
        <p class="card-text">Bids: ${listing._count.bids}</p>
        <div class="listing-btns d-flex align-items-center justify-content-around">
        <a href="#" class="btn btn-secondary-custom bid-btn">Bid now</a>
                <a href="#" class="btn btn-primary-custom view-btn">View listing</a>
        </div>
        </div>
      `;
    listingsContainer.appendChild(listingCard);
    const getCoundown = listingCard.querySelector(".countdown p");
    countdownTimer(listing.endsAt, getCoundown);
  });
}

{
  /* <p class="fst-italic card-text">By: ${listing.seller.name}</p> */
  //   <button class="btn btn-primary-custom">View Listing</button>
}
