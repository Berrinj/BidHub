import { displayListings } from "../listings/display.js";
import { formatDate } from "../../handlers/timeDate.js";

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
    const endsAt = formatDate(listing.endsAt);
    let lastBidAmount = 0;
    if (listing.bids && listing.bids.length > 0) {
      const lastBid = listing.bids[listing.bids.length - 1];
      lastBidAmount = lastBid.amount;
    }
    //skip if listing has a title of test
    if (listing.title === "test") {
      return;
    }
    const listingCard = document.createElement("div");
    listingCard.classList.add(
      "listing-card",
      "card",
      "col-12",
      "col-sm-5",
      "col-md-4",
      "col-lg-3",
      "col-xl-2",
      "text-truncate",
      "rounded",
      "m-1",
      "p-0",
    );

    let mediaURL = "";
    if (listing.media.length > 0) {
      mediaURL = `${listing.media[0].url}`;
    } else {
      mediaURL = `../../../src/images/placeholder-images/token-branded--bidz.png`;
    }

    listingCard.innerHTML = `
        <img src="${mediaURL}" />
        <div class="card-body">
        <h2 class="text-wrap h5">${listing.title}</h2>
        <p class="fst-italic">By: ${listing.seller.name}</p>
        <p>Bids: ${listing._count.bids}</p>
        <p>Price: ${lastBidAmount}</p>
        <p>Ends: ${endsAt}</p>
        <button class="btn btn-primary-custom">View</button>
        </div>
      `;
    listingsContainer.appendChild(listingCard);
  });
}
