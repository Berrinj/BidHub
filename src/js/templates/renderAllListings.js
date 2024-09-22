import { displayListings } from "../api/listings/display.js";
import { renderListingCard } from "./listingCard.js";

let currentPage = 1;
let totalPageCount = 1;

export async function renderAllListings() {
  const errorMsg = document.querySelector(".main-content");
  const listingsContainer = document.querySelector(
    ".all-listings-container .row",
  );
  listingsContainer.innerHTML = "";

  await loadListingsPage(listingsContainer, errorMsg);

  addSortListener(listingsContainer, errorMsg);
}

function addSortListener(listingsContainer, errorMsg) {
  const sortElement = document.querySelector("#sort");

  sortElement.addEventListener("change", async () => {
    await loadListingsPage(listingsContainer, errorMsg);
  });
}

async function loadListingsPage(container, errorMsg) {
  currentPage = 1;
  const listingsContainer = document.querySelector(
    ".all-listings-container .row",
  );
  listingsContainer.innerHTML = "";

  const sortElement = document.querySelector("#sort");
  let sortOrder = "desc";
  let sortValue = sortElement.value;
  let sortField = "created";

  switch (sortValue) {
    case "created":
      sortField = "created";
      sortOrder = "desc";
      break;
    case "oldest":
      sortField = "created";
      sortOrder = "asc";
      break;
    case "ending-soon":
      sortField = "endsAt";
      sortOrder = "asc";
      break;
    case "ended":
      sortField = "endsAt";
      sortOrder = "desc";
      break;
    default:
      sortField = "created";
      sortOrder = "desc";
  }

  const response = await displayListings(
    currentPage,
    sortField,
    sortOrder,
    errorMsg,
  );

  totalPageCount = response.meta.pageCount;

  let allListings = [...response.data];
  for (let i = 2; i <= totalPageCount; i++) {
    const response = await displayListings(i, sortField, sortOrder, errorMsg);
    allListings = allListings.concat(response.data);
  }

  let filteredListings = [];
  if (sortValue === "most-wanted") {
    filteredListings = allListings.sort(
      (a, b) => b.bids.length - a.bids.length,
    );
  }
  if (sortValue === "price-low") {
    filteredListings = allListings.sort((a, b) => {
      const lastBidA = a.bids.length > 0 ? a.bids[a.bids.length - 1].amount : 0;
      const lastBidB = b.bids.length > 0 ? b.bids[b.bids.length - 1].amount : 0;
      return lastBidA - lastBidB;
    });
  }
  if (sortValue === "price-high") {
    filteredListings = allListings.sort((a, b) => {
      const lastBidA = a.bids.length > 0 ? a.bids[a.bids.length - 1].amount : 0;
      const lastBidB = b.bids.length > 0 ? b.bids[b.bids.length - 1].amount : 0;
      return lastBidB - lastBidA;
    });
  }

  if (sortValue === "ended") {
    filteredListings = allListings.filter(
      (listing) => new Date(listing.endsAt) < new Date(),
    );
    filteredListings.sort((a, b) => new Date(b.endsAt) - new Date(a.endsAt));
  } else {
    filteredListings = allListings.filter(
      (listing) => new Date(listing.endsAt) >= new Date(),
    );
  }

  const activeListings = filteredListings.filter(
    (listing) =>
      listing.title.toLowerCase() !== "test" &&
      listing.title.toLowerCase() !== "test123" &&
      listing.seller.name !== "hjibfasduifd",
  );

  const listingsHeader = document.querySelector(".listings-header");
  listingsHeader.classList.remove("d-none");

  const loading = document.querySelector(".loading-text");
  loading.innerHTML = "";
  if (activeListings.length === 0) {
    loading.textContent = "No active listings found.";
  }

  activeListings.forEach((listing) => {
    renderListingCard(container, listing);
  });
}
