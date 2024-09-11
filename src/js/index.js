import * as handlers from "./handlers/index.js";
import * as status from "./status/index.js";
// import * as profile from "./api/profile/display.js";
import * as templates from "./api/templates/renderProfile.js";
// import { getAPIKey } from "./api/auth/apikey.js";

handlers.registerFormListener();
handlers.loginFormListener();
status.headerListener();
status.navListener();

//create path for the pages
const path = window.location.pathname;
if (path === "/profile/") {
  templates.renderProfile();
}

// getAPIKey();
