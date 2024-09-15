import { displayListings } from "../api/listings/display.js";

export async function renderListingsByBids() {
  try {
    const response = await displayListings();
    const listings = response.data;
    const highestBids = listings
      .sort((a, b) => b.bids.length - a.bids.length)
      .slice(0, 3);
    const highestBidsListings = document.querySelector(".most-wanted-listings");
    highestBidsListings.innerHTML = "";
    highestBids.forEach((listing) => {
      const listingCard = document.createElement("div");
      listingCard.classList.add(
        "card",
        "d-flex",
        "flex-row",
        "mb-3",
        "bg-light",
        "shadow-sm",
      );
      const listingImage = document.createElement("img");
      let mediaURL = "";
      if (listing.media.length > 0) {
        mediaURL = `${listing.media[0].url}`;
      } else {
        mediaURL = `../../../src/images/placeholder-images/token-branded--bidz.png`;
      }
      listingImage.src = mediaURL;
      listingImage.classList.add("img-fluid", "landing-listing-img");
      listingImage.alt = "Listing image";
      listingCard.appendChild(listingImage);
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.textContent = listing.title;
      cardBody.appendChild(cardTitle);
      const currentBid = document.createElement("p");
      currentBid.classList.add("card-text");
      currentBid.textContent = `Current bid: ${listing.bids[listing.bids.length - 1].amount} credits`;
      cardBody.appendChild(currentBid);
      const bids = document.createElement("p");
      bids.classList.add("card-text");
      bids.textContent = `Bids: ${listing.bids.length}`;
      cardBody.appendChild(bids);
      const bidBtn = document.createElement("button");
      bidBtn.classList.add("btn", "btn-secondary-custom", "bid-btn");
      bidBtn.textContent = "Bid now";
      const viewListingBtn = document.createElement("button");
      viewListingBtn.classList.add("btn", "btn-primary-custom");
      viewListingBtn.textContent = "View listing";
      cardBody.appendChild(bidBtn);
      cardBody.appendChild(viewListingBtn);
      listingCard.appendChild(cardBody);
      highestBidsListings.appendChild(listingCard);
    });
  } catch (error) {
    console.error(error);
  }
}
