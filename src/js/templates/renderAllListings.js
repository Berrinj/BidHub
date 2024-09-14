import { displayListings } from "../api/listings/display.js";
// import { formatDate } from "../../handlers/timeDate.js";
import { countdownTimer } from "../handlers/timeDate.js";
// import { getProfile } from "../api/profile/get.js";
import { openBidModal } from "../handlers/bidModal.js";

export async function renderAllListings() {
  const listings = await displayListings();

  console.log(listings);
  // const profile = await getProfile();

  const listingsArray = listings.data;
  if (!Array.isArray(listingsArray)) {
    console.error("Expected an array but got:", listingsArray);
    return;
  }
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
    listingCard.dataset.id = listingID;

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
    const bidBtn = document.createElement("button");
    bidBtn.classList.add("btn", "btn-secondary-custom", "bid-btn");
    bidBtn.textContent = "Bid now";
    bidBtn.dataset.id = listingID;
    bidBtn.setAttribute("data-bs-target", "#bidModal");
    bidBtn.setAttribute("data-bs-toggle", "modal");

    bidBtn.addEventListener("click", () => {
      openBidModal(listing, listingID, mediaURL, lastBidAmount);
      // const modal = document.querySelector("#bidModal");
      // modal.dataset.id = listingID;
      // const modalHeader = modal.querySelector(".modal-header");
      // // const modalFooter = modal.querySelector(".modal-footer");
      // const modalTitle = modalHeader.querySelector("#bidModalLabel");
      // modalTitle.textContent = listing.title;

      // const modalBody = modal.querySelector(".modal-body");
      // modalBody.innerHTML = "";
      // modalTitle.classList.add("bid-modal-title");
      // modalTitle.textContent = listing.title;
      // modalHeader.appendChild(modalTitle);
      // const modalImg = document.createElement("img");
      // modalImg.src = mediaURL;
      // modalImg.classList.add("bid-modal-img", "img-fluid", "rounded");
      // modalBody.appendChild(modalImg);
      // const modalTopBidTitle = document.createElement("h2");
      // modalTopBidTitle.classList.add(
      //   "bid-modal-bids",
      //   "text-center",
      //   "mt-2",
      //   "fs-4",
      // );
      // modalTopBidTitle.textContent = `Current bid:`;
      // const modalTopBidInfo = document.createElement("h3");
      // modalTopBidInfo.classList.add(
      //   "bid-modal-bids",
      //   "text-center",
      //   "text-uppercase",
      // );
      // modalTopBidInfo.textContent = `${lastBidAmount} Credits`;
      // modalBody.appendChild(modalTopBidTitle);
      // modalBody.appendChild(modalTopBidInfo);

      // const bidForm = document.createElement("form");
      // bidForm.classList.add(
      //   "bid-form",
      //   "d-flex",
      //   "flex-column",
      //   "align-items-center",
      // );
      // const bidFormGroup = document.createElement("div");
      // bidFormGroup.classList.add("form-group", "text-center");
      // const bidLabel = document.createElement("label");
      // bidLabel.setAttribute("for", "bidAmount");
      // bidLabel.classList.add("form-label", "text-center", "mt-3", "fs-4");
      // bidLabel.textContent = "Ready to place your bid?";
      // const bidInput = document.createElement("input");
      // bidInput.classList.add("form-control", "text-center");
      // bidInput.type = "number";
      // bidInput.name = "bidAmount";
      // bidInput.id = "bidAmount";
      // bidInput.ariaRequired = true;
      // bidInput.ariaLabel = "Bid amount";
      // bidInput.title = "Bid amount must be greater than the current bid";
      // bidInput.min = lastBidAmount + 1;
      // bidInput.placeholder = "Enter bid amount";
      // const tokensAvailable = document.createElement("p");
      // tokensAvailable.classList.add("text-center", "fst-italic", "mb-0");
      // tokensAvailable.innerHTML = `<small>You have ${profile.data.credits} credits available</small>`;
      // const bidError = document.createElement("p");
      // bidError.classList.add("text-danger", "fst-italic", "mb-2");
      // bidError.textContent = "Bid amount must be greater than the current bid";
      // bidError.style.display = "none";
      // bidFormGroup.appendChild(bidLabel);
      // bidFormGroup.appendChild(bidInput);
      // bidFormGroup.appendChild(bidError);
      // bidFormGroup.appendChild(tokensAvailable);
      // bidForm.appendChild(bidFormGroup);
      // modalBody.appendChild(bidForm);

      // const placeBidBtn = document.createElement("button");
      // placeBidBtn.classList.add(
      //   "btn",
      //   "btn-secondary-custom",
      //   "place-bid-btn",
      //   "text-uppercase",
      //   "text-white",
      //   "mt-2",
      //   "mb-3",
      // );
      // placeBidBtn.textContent = "Place bid";
      // placeBidBtn.dataset.id = listingID;
      // modalBody.appendChild(placeBidBtn);
      // const modalId = document.createElement("p");
      // modalId.classList.add(
      //   "bid-modal-id",
      //   "fst-italic",
      //   "text-center",
      //   "mb-0",
      //   "opacity-75",
      // );
      // modalId.innerHTML = `<small>Listing ID: ${listingID}</small>`;
      // modalBody.appendChild(modalId);
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

    // listingCard.innerHTML = `
    // <div class="card-header position-relative p-0">
    // <div class="listing-header-img">
    //     <img src="${mediaURL}" class="border-bottom header-img"/>
    //     </div>
    //     <div class="countdown position-absolute top-0 start-0 mt-1 ms-1">
    //     <p class="card-text countdown rounded bg-accent-custom d-inline-block ps-1 pe-1">..Loading</p>
    //     </div>
    //     </div>
    //     <div class="card-body pb-0 pt-0">
    //     <h5 class="text-wrap card-title">${listing.title}</h5>
    //     <div class="d-flex bids">
    //     <p class="card-text d-flex align-items-center">Price: <img src="${coinSVG}" alt="coin icon" class="bids-img ms-1">${lastBidAmount}</p>
    //     <p class="card-text fst-italic ms-1">${lastBidder}</p>
    //     </div>
    //     <p class="card-text">Bids: ${listing._count.bids}</p>
    //     <div class="listing-btns d-flex align-items-center justify-content-around">
    //     <a href="#" class="btn btn-secondary-custom bid-btn">Bid now</a>
    //             <a href="#" class="btn btn-primary-custom view-btn">View listing</a>
    //     </div>
    //     </div>
    //   `;

    listingsContainer.appendChild(listingCard);
    const getCoundown = listingCard.querySelector(".countdown p");
    countdownTimer(listing.endsAt, getCoundown);
  });
}

{
  /* <p class="fst-italic card-text">By: ${listing.seller.name}</p> */
  //   <button class="btn btn-primary-custom">View Listing</button>
}
