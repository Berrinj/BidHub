import * as handlers from "./handlers/index.js";
// import * as profile from "./api/profile/display.js";
import * as templates from "./templates/index.js";
// import { getAPIKey } from "./api/auth/apikey.js";
// import { deleteListing } from "./api/listings/delete.js";

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
    break;
  case "/listings/listing/":
    templates.renderSingleListing();
    break;
}

// if (path === "/profile/") {
//   templates.renderProfile();
// }
// if (path === "/listings/") {
//   templates.renderAllListings();
// }

// getAPIKey();

//for testing deleteListing
// deleteListing("47faabe9-252a-4fc4-95f7-b3a2cd8f8e1a");
