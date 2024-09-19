import { displayListings } from "../api/listings/display.js";
// import { countdownTimer } from "../handlers/timeDate.js";
// import { openBidModal } from "../handlers/bidModal.js";
// import { truncateText } from "../handlers/truncateText.js";
import { renderListingCard } from "./listingCard.js";
import { showMoreBtn, hideShowMoreBtn } from "../templates/showMoreBtn.js";

let currentPage = 1;
let totalPageCount = 1;

export async function renderAllListings() {
  const errorMsg = document.querySelector(".main-content");
  const listingsContainer = document.querySelector(
    ".all-listings-container .row",
  );
  const showMoreBtnContainer = document.querySelector(".load-more");

  await loadListingsPage(listingsContainer, errorMsg);

  if (currentPage < totalPageCount) {
    showMoreBtn(showMoreBtnContainer, loadMoreListings);
  } else {
    hideShowMoreBtn();
  }
}

async function loadListingsPage(container, errorMsg) {
  const response = await displayListings(currentPage, errorMsg);
  totalPageCount = response.meta.pageCount;

  let allListings = [...response.data];
  for (let i = 2; i <= totalPageCount; i++) {
    const response = await displayListings(i, errorMsg);
    console.log(`Page ${i} data:`, response);
    allListings = allListings.concat(response.data);
  }
  console.log("All listings in API:", allListings);
  const listingsArray = response.data;
  // listingsArray.sort((a, b) => new Date(b.created) - new Date(a.created));

  const activeListings = listingsArray.filter(
    (listing) =>
      new Date(listing.endsAt) >= new Date() &&
      listing.title.toLowerCase() !== "test" &&
      listing.title.toLowerCase() !== "test123",
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

async function loadMoreListings() {
  currentPage++;

  const listingsContainer = document.querySelector(
    ".all-listings-container .row",
  );
  const errorMsg = document.querySelector(".main-content");

  if (currentPage <= totalPageCount) {
    await loadListingsPage(listingsContainer, errorMsg);

    if (currentPage >= totalPageCount) {
      hideShowMoreBtn();
    }
  }
}

// export async function renderAllListings() {
//   goBackBtn();
//   const errorMsg = document.querySelector(".main-content");
//   const firstResponse = await displayListings(1, errorMsg);
//   const pageCount = firstResponse.meta.pageCount;
//   let allListings = [...firstResponse.data];

//   for (let i = 2; i <= pageCount; i++) {
//     const response = await displayListings(i, errorMsg);
//     console.log(`Page ${i} data:`, response);
//     allListings = allListings.concat(response.data);
//   }

//   const listingsArray = allListings;
//   listingsArray.sort((a, b) => new Date(b.created) - new Date(a.created));

//   const activeListings = listingsArray.filter(
//     (listing) =>
//       new Date(listing.endsAt) >= new Date() &&
//       listing.title.toLowerCase() !== "test" &&
//       listing.title.toLowerCase() !== "test123",
//   );
//   console.log("Active listings:", activeListings);

//   const listingsHeader = document.querySelector(".listings-header");
//   listingsHeader.classList.remove("d-none");
//   const listingsContainer = document.querySelector(
//     ".all-listings-container .row",
//   );

//   const loading = document.querySelector(".loading-text");
//   loading.innerHTML = "";
//   if (activeListings.length === 0) {
//     loading.textContent = "No active listings found.";
//   }
//   activeListings.forEach((listing) => {
//     renderListingCard(listingsContainer, listing);
//   });
// }
