import { API_URL_LISTINGS } from "../constants.js";
import { API_URL_SEARCH } from "../constants.js";
import { authFetch } from "../authFetch.js";
import { errorTemplate } from "../../templates/error.js";

const bids = "_bids=true";
const seller = "_seller=true";

/**
 * @description Fetches all listings from the API
 * @param {number} page - the page number to fetch
 * @param {string} sort - the field to sort by
 * @param {string} sortOrder - the order to sort by
 * @param {HTMLElement} container - the container to display the listings
 * @returns {promise} result of the get
 * @throws {Error} If the name parameter is empty or an error occurs during the process.
 */

export async function displayListings(page, sort, sortOrder, container) {
  try {
    const displayListingsURL = `${API_URL_LISTINGS}?${bids}&${seller}&sort=${sort}&sortOrder=${sortOrder}&page=${page}`;
    const response = await authFetch(displayListingsURL);
    if (response.ok) {
      return await response.json();
    }
    if (response.status !== 200) {
      throw new Error("Listings not found");
    }
  } catch (error) {
    errorTemplate(container);
    console.error(error);
    throw new Error("Failed to display listings");
  }
}

/**
 * @name displayListing
 * @description Fetches a single listing from the API
 * @param {*} id - the listing id
 * @param {*} container - the container to display the listing
 * @returns - the listing data
 */

export async function displayListing(id, container) {
  try {
    if (!id) {
      throw new Error("get requires a listing id");
    }
    const displayListingURL = `${API_URL_LISTINGS}/${id}?${bids}&${seller}`;
    const response = await authFetch(displayListingURL);
    if (response.ok) {
      return await response.json();
    }
    if (response.status !== 200) {
      throw new Error("Listing not found");
    }
  } catch (error) {
    errorTemplate(container);
    console.error(error);
    throw new Error("Failed to display listing");
  }
}

/**
 * @name displayListingsBySearch
 * @param {*} page - the page number to fetch
 * @param {*} searchValue - the search value to fetch
 * @param {*} container - the container to display the listings
 * @returns the listings data based on the search value
 */

export async function displayListingsBySearch(page, searchValue, container) {
  try {
    if (!searchValue) {
      throw new Error("get requires a title or description");
    }
    const displayListingsBySearchURL = `${API_URL_SEARCH}?q=${searchValue}&${bids}&${seller}&page=${page}`;
    const response = await authFetch(displayListingsBySearchURL);
    if (response.ok) {
      return await response.json();
    }
    if (response.status !== 200) {
      throw new Error("Listings not found");
    }
  } catch (error) {
    errorTemplate(container);
    console.error(error);
    throw new Error("Failed to display listings by search");
  }
}
