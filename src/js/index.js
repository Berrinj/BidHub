import * as handlers from "./handlers/index.js";
import * as status from "./status/index.js";
// import * as profile from "./api/profile/display.js";
import * as templates from "./templates/index.js";
// import { getAPIKey } from "./api/auth/apikey.js";

handlers.registerFormListener();
handlers.loginFormListener();
status.headerListener();
status.navListener();

//create switch path for the pages
const path = location.pathname;

switch (path) {
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
