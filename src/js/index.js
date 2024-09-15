import * as handlers from "./handlers/index.js";
import * as status from "./status/index.js";
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
status.navListener();

//create switch path for the pages
const path = location.pathname;

switch (path) {
  case "/":
    status.headerListener();
    templates.renderListingsLandingPage();
    break;
  case "/profile/":
    templates.renderProfile();
    break;
  case "/listings/":
    templates.renderAllListings();
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
// deleteListing("8fe770b5-511a-42db-9cdb-190327af6bfa");
