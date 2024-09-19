import { renderListingCard } from "./listingCard.js";
import { displayListings } from "../api/listings/display.js";

export function renderListingsFilter(listings) {
  const container = document.querySelector(".all-listings-container .row");
  const loadMore = document.querySelector(".load-more");
  loadMore.classList.add("d-none");
  container.innerHTML = "";

  listings.forEach((listing) => {
    renderListingCard(container, listing);
  });
}

export async function filterListings(filter) {
  const container = document.querySelector(".all-listings-container .row");
  container.innerHTML = "";
  const errorMsg = document.querySelector(".main-content");
  const firstResponse = await displayListings(1, errorMsg);
  const pageCount = firstResponse.meta.pageCount;
  let allListings = [...firstResponse.data];

  for (let i = 2; i <= pageCount; i++) {
    const response = await displayListings(i, errorMsg);
    console.log(`Page ${i} data:`, response);
    allListings = allListings.concat(response.data);
  }

  const listingsArray = allListings;
  listingsArray.sort((a, b) => new Date(b.created) - new Date(a.created));

  let activeListings = listingsArray.filter(
    (listing) =>
      listing.title.toLowerCase() !== "test" &&
      listing.title.toLowerCase() !== "test123",
  );

  if (filter !== "Ended") {
    activeListings = activeListings.filter(
      (listing) => new Date(listing.endsAt) > new Date(),
    );
  }

  let filteredListings;

  switch (filter) {
    case "newest":
      filteredListings = activeListings.sort(
        (a, b) => new Date(b.created) - new Date(a.created),
      );
      break;
    case "oldest":
      filteredListings = activeListings.sort(
        (a, b) => new Date(a.created) - new Date(b.created),
      );
      break;
    case "Most Wanted":
      filteredListings = activeListings.sort(
        (a, b) => b.bids.length - a.bids.length,
      );
      break;
    case "Ending soon":
      filteredListings = activeListings.sort(
        (a, b) => new Date(a.endsAt) - new Date(b.endsAt),
      );
      break;
    case "Ended":
      filteredListings = activeListings.filter(
        (listing) => new Date(listing.endsAt) < new Date(),
      );
      break;
    case "price-low":
      filteredListings = activeListings.sort((a, b) => {
        const lastBidA =
          a.bids.length > 0 ? a.bids[a.bids.length - 1].amount : 0;
        const lastBidB =
          b.bids.length > 0 ? b.bids[b.bids.length - 1].amount : 0;
        return lastBidA - lastBidB;
      });
      break;
    case "price-high":
      filteredListings = activeListings.sort((a, b) => {
        const lastBidA =
          a.bids.length > 0 ? a.bids[a.bids.length - 1].amount : 0;
        const lastBidB =
          b.bids.length > 0 ? b.bids[b.bids.length - 1].amount : 0;
        return lastBidB - lastBidA;
      });
      break;
    default:
      filteredListings = activeListings;
  }
  console.log("All Listings:", allListings);
  console.log("Filtered Listings:", filteredListings);

  renderListingsFilter(filteredListings);
}
