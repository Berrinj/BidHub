import { displayListings } from "../api/listings/display.js";
import { countdownTimer } from "../handlers/timeDate.js";
import { openBidModal } from "../handlers/bidModal.js";
import { truncateText } from "../handlers/truncateText.js";
import { load } from "../storage/index.js";
const token = load("token");

/**
 * @name renderListingsLandingPage
 * @description Renders the landing page with the most wanted, newest and ending soon listings
 * @param {*} param0 - object with the number of listings to display for mostBids, newest and endingSoon
 * @returns {void} - No return value, but renders the listings on the landing page with the renderListings function
 * @example this renders the landing page with 3 most wanted, 3 newest and 5 ending soon listings
 */

export async function renderListingsLandingPage({
  mostBids = 3,
  newest = 3,
  endingSoon = 5,
} = {}) {
  const errorMsg = document.querySelector(".main-content");
  try {
    const firstResponse = await displayListings(1, "created", "desc", errorMsg);
    const pageCount = firstResponse.meta.pageCount;
    let allListings = [...firstResponse.data];

    for (let i = 2; i <= pageCount; i++) {
      const response = await displayListings(i, "created", "desc", errorMsg);
      allListings = allListings.concat(response.data);
    }

    const activeListings = allListings.filter(
      (listing) =>
        new Date(listing.endsAt) >= new Date() &&
        listing.title.toLowerCase() !== "test" &&
        listing.title.toLowerCase() !== "test123" &&
        listing.seller.name !== "hjibfasduifd",
    );
    const mostBidsListings = activeListings
      .sort((a, b) => b.bids.length - a.bids.length)
      .slice(0, mostBids);

    const newestListings = activeListings
      .sort((a, b) => new Date(b.created) - new Date(a.created))
      .slice(0, newest);

    const endingSoonListings = activeListings
      .sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt))
      .slice(0, endingSoon);

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
  const coinSVG = `../../../src/images/svg/noto--coin.svg`;

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
      "mx-auto",
      "col-12",
      "col-lg-10",
      "col-xl-12",
    );

    const listingID = listing.id;
    listingCard.dataset.id = listingID;
    const cardHeader = document.createElement("div");
    cardHeader.classList.add(
      "card-header",
      "position-relative",
      "p-0",
      "mx-auto",
      "border-0",
      "link",
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

    if (selectContainer === ".ending-soon-listings") {
      const endingSoonListings = document.querySelector(
        ".ending-soon-listings",
      );
      endingSoonListings.classList.add(
        "d-flex",
        "flex-row",
        "flex-wrap",
        "justify-content-around",
      );
      listingCard.classList.remove("col-xl-12");
      listingCard.classList.add("ending-soon-card", "col-xl-2", "m-1");

      listingCard.classList.remove("mx-auto");
      cardHeader.classList.add("ending-soon-card-header");
      listingImage.classList.remove("landing-listing-img");
      listingImage.classList.add("img-fluid", "ending-soon-img");
    }

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
    countdownSVG.alt = "hourglass icon";
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

    cardHeader.appendChild(countdownContainer);

    listingCard.appendChild(cardHeader);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "p-2");
    const cardTitle = document.createElement("h3");
    cardTitle.classList.add("card-title", "text-wrap", "h5");
    //listen for window resize
    window.addEventListener("resize", () => {
      if (
        selectContainer === ".ending-soon-listings" &&
        window.innerWidth > 1200
      ) {
        const listingTitle = truncateText(listing.title, 14);
        cardTitle.textContent = listingTitle;
      } else {
        const listingTitle = truncateText(listing.title, 20);
        cardTitle.textContent = listingTitle;
      }
    });
    const listingTitle = truncateText(listing.title, 20);
    cardTitle.textContent = listingTitle;
    cardBody.appendChild(cardTitle);

    const bidContainer = document.createElement("div");
    bidContainer.classList.add("d-flex", "flex-row", "flex-wrap");
    const currentBid = document.createElement("p");
    currentBid.classList.add("card-text");
    let lastBidAmount = 0;

    if (listing.bids && listing.bids.length > 0) {
      const lastBid = listing.bids[listing.bids.length - 1];
      lastBidAmount = lastBid.amount;
    }
    const priceContainer = document.createElement("div");
    priceContainer.classList.add("d-inline-flex", "card-text");
    const priceText = document.createElement("p");
    priceText.classList.add(
      "card-text",
      "d-flex",
      "align-items-center",
      "fw-semibold",
    );
    priceText.textContent = "Price: ";
    const coinImg = document.createElement("img");
    coinImg.src = coinSVG;
    coinImg.alt = "coin icon";
    coinImg.classList.add("bids-img", "ms-1");
    priceText.appendChild(coinImg);
    const lastBidAmountText = document.createTextNode(lastBidAmount);
    priceText.appendChild(lastBidAmountText);
    priceContainer.appendChild(priceText);
    bidContainer.appendChild(priceContainer);

    cardBody.appendChild(bidContainer);
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
    bidBtn.classList.add(
      "btn",
      "btn-secondary-custom",
      "bid-btn",
      "text-uppercase",
      "text-nav-footer-custom",
    );
    bidBtn.dataset.id = listingID;
    bidBtn.setAttribute("data-bs-target", "#bidModal");
    bidBtn.setAttribute("data-bs-toggle", "modal");
    if (!token) {
      bidBtn.disabled = true;
      bidBtn.title = "Login to bid";
    }

    bidBtn.addEventListener("click", () => {
      openBidModal(listing, listingID, mediaURL, lastBidAmount);
    });

    if (
      selectContainer === ".ending-soon-listings" &&
      window.innerWidth > 1200
    ) {
      listingBtns.classList.add("flex-column");
      bidBtn.classList.add("mb-2");
    }

    window.addEventListener("resize", () => {
      if (
        selectContainer === ".ending-soon-listings" &&
        window.innerWidth < 1200
      ) {
        listingBtns.classList.remove("flex-column");
        bidBtn.classList.remove("mb-2");
      } else if (
        selectContainer === ".ending-soon-listings" &&
        window.innerWidth > 1200
      ) {
        listingBtns.classList.add("flex-column");
        bidBtn.classList.add("mb-2");
      }
    });
    cardHeader.addEventListener("click", () => {
      window.location.href = `/listings/listing/?id=${listingID}`;
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
