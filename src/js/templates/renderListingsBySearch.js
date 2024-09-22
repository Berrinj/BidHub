import { displayListingsBySearch } from "../api/listings/display.js";
import { renderListingCard } from "./listingCard.js";

/**
 * @name renderListingsBySearch
 * @description renders listings by search
 * @returns {void} - No return value but renders listings by search to the page with the renderListingCard function
 */

export async function renderListingsBySearch() {
  const container = document.querySelector(".all-listings-container .row");
  const searchHeader = document.querySelector(".search-header");
  const errorMsg = document.querySelector(".error-search");
  const searchInput = document.querySelector("input[name='search']");
  const searchBtn = document.querySelector(".search-btn");
  const filter = document.querySelector(".filter-listings-container");
  const showMore = document.querySelector(".load-more");

  async function handleSearch() {
    filter.classList.add("d-none");
    if (showMore) {
      showMore.classList.add("d-none");
    }
    const searchValue = searchInput.value;
    searchHeader.textContent = `Search results for: ${searchValue}`;
    errorMsg.innerHTML = "";
    if (!errorMsg.classList.contains("d-none")) {
      errorMsg.classList.add("d-none");
    }
    if (searchValue === "") {
      errorMsg.classList.remove("d-none");
      errorMsg.innerHTML = "You must enter a search value";
    }
    container.innerHTML = "";
    const url = `${window.location.pathname}?q=${searchValue}`;

    window.history.pushState({ path: url }, "", url);

    const listings = await displayListingsBySearch(1, searchValue, errorMsg);

    const pageCount = listings.meta.pageCount;
    let allListings = [...listings.data];
    for (let i = 2; i <= pageCount; i++) {
      const response = await displayListingsBySearch(i, searchValue, errorMsg);
      allListings = allListings.concat(response.data);
    }
    const listingsArray = allListings;
    listingsArray.sort((a, b) => new Date(b.created) - new Date(a.created));

    const activeListings = listingsArray.filter(
      (listing) =>
        new Date(listing.endsAt) >= new Date() &&
        listing.title.toLowerCase() !== "test" &&
        listing.title.toLowerCase() !== "test123",
    );
    if (activeListings.length === 0) {
      errorMsg.classList.remove("d-none");
      errorMsg.innerHTML = "No active listings found.";
    }
    activeListings.forEach((listing) => {
      renderListingCard(container, listing);
    });
  }

  searchBtn.addEventListener("click", handleSearch);
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  });
}
