import * as handlers from "./handlers/index.js";
import * as templates from "./templates/index.js";

const placeBidBtn = document.querySelector(".place-bid-btn");
if (placeBidBtn) {
  handlers.placeListingBid();
}

handlers.registerFormListener();
handlers.loginFormListener();
handlers.navListener();

//create switch path for the pages
const path = location.pathname;

switch (path) {
  case "/":
    handlers.headerListener();
    templates.renderListingsLandingPage();
    break;
  case "/profile/":
    templates.renderProfile();
    break;
  case "/listings/":
    templates.renderAllListings();
    templates.renderListingsBySearch();
    // handlers.listenForFiltering();
    break;
  case "/listings/listing/":
    templates.renderSingleListing();
    break;
}
