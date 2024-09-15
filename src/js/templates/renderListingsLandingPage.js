import { displayListings } from "../api/listings/display.js";
import { countdownTimer } from "../handlers/timeDate.js";
import { openBidModal } from "../handlers/bidModal.js";

export async function renderListingsLandingPage({
  mostBids = 3,
  newest = 3,
  endingSoon = 5,
} = {}) {
  let page = 1;
  try {
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

    // const listings = response.data;
    // console.log(listings);
    const mostBidsListings = allListings
      .sort((a, b) => b.bids.length - a.bids.length)
      .slice(0, mostBids);

    const newestListings = allListings
      .sort((a, b) => new Date(b.endsAt) - new Date(a.endsAt))
      .slice(0, newest);
    console.log(newestListings);

    const endingSoonListings = allListings
      .sort((a, b) => new Date(a.bids.endsAt) - new Date(b.bids.endsAt))
      .slice(0, endingSoon);
    console.log(endingSoonListings);

    renderListings(mostBidsListings, ".most-wanted-listings");
    renderListings(newestListings, ".newest-listings");
    renderListings(endingSoonListings, ".ending-soon-listings");
  } catch (error) {
    console.error(error);
  }
}

function renderListings(listings, selectContainer) {
  const container = document.querySelector(selectContainer);
  container.innerHTML = "";
  listings.forEach((listing) => {
    const listingCard = document.createElement("div");
    listingCard.classList.add(
      "card",
      "d-flex",
      "flex-row",
      "mb-3",
      "bg-light",
      "shadow-sm",
      "flex-wrap",
    );

    const listingID = listing.id;
    listingCard.dataset.id = listingID;
    const cardHeader = document.createElement("div");
    cardHeader.classList.add(
      "card-header",
      "position-relative",
      "p-0",
      "mx-auto",
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
    cardHeader.appendChild(listingImage);

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

    listingCard.appendChild(cardHeader);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = listing.title;
    cardBody.appendChild(cardTitle);
    const currentBid = document.createElement("p");
    currentBid.classList.add("card-text");
    let lastBidAmount = 0;
    let lastBidder = "";
    let bidderName = "";
    if (listing.bids && listing.bids.length > 0) {
      const lastBid = listing.bids[listing.bids.length - 1];
      lastBidAmount = lastBid.amount;
      lastBidder = `(@${lastBid.bidder.name})`;
      bidderName = lastBid.bidder.name;
    }
    currentBid.textContent = `Price: ${lastBidAmount} credits`;
    const lastBidderLink = document.createElement("a");
    lastBidderLink.classList.add("card-text", "fst-italic", "ms-1");
    lastBidderLink.textContent = lastBidder;
    lastBidderLink.href = `/profile/?name=${bidderName}`;
    currentBid.appendChild(lastBidderLink);
    cardBody.appendChild(currentBid);
    const bids = document.createElement("p");
    bids.classList.add("card-text");
    bids.textContent = `Bids: ${listing.bids.length}`;
    cardBody.appendChild(bids);

    const listingBtns = document.createElement("div");
    listingBtns.classList.add(
      "listing-btns",
      "d-flex",
      "align-items-center",
      "justify-content-around",
      "mt-2",
    );
    const bidBtn = document.createElement("button");
    bidBtn.classList.add("btn", "btn-secondary-custom", "bid-btn");
    bidBtn.dataset.id = listingID;
    bidBtn.setAttribute("data-bs-target", "#bidModal");
    bidBtn.setAttribute("data-bs-toggle", "modal");

    bidBtn.addEventListener("click", () => {
      openBidModal(listing, listingID, mediaURL, lastBidAmount);
    });
    listingBtns.appendChild(bidBtn);
    bidBtn.textContent = "Bid now";
    const viewListingBtn = document.createElement("button");
    viewListingBtn.classList.add("btn", "btn-primary-custom", "view-btn");
    viewListingBtn.textContent = "View listing";
    viewListingBtn.addEventListener("click", () => {
      window.location.href = `./listings/listing/?id=${listingID}`;
    });
    listingBtns.appendChild(viewListingBtn);
    cardBody.appendChild(listingBtns);
    listingCard.appendChild(cardBody);
    container.appendChild(listingCard);

    const getCoundown = listingCard.querySelector(".countdown p");
    countdownTimer(listing.endsAt, getCoundown);
  });
}
