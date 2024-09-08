import * as handlers from "./handlers/index.js";
import * as status from "./status/landingpage.js";
// import { getAPIKey } from "./api/auth/apikey.js";

handlers.registerFormListener();
handlers.loginFormListener();
status.checkLoggedInStatus();

// getAPIKey();
