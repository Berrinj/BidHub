import { filterListings } from "../templates/renderListingsByFilter.js";
export function listenForFiltering() {
  document.querySelector("#sort").addEventListener("change", (event) => {
    const filter = event.target.value;
    filterListings(filter);
  });
}
