import * as handlers from "./handlers/index.js";
import * as status from "./status/index.js";
import * as profile from "./api/profile/display.js";
// import { getAPIKey } from "./api/auth/apikey.js";

handlers.registerFormListener();
handlers.loginFormListener();
status.headerListener();
status.navListener();
profile.getProfile();

// getAPIKey();
