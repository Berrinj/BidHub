const headerTextP1 = document.querySelector(".header-first-p");
const headerTextP2 = document.querySelector(".header-second-p");
const headerBtn = document.querySelector(".header-button");
const intro = document.querySelector(".intro");
import { load } from "../storage/index.js";

// Check if the user is logged in
export function headerListener() {
  if (load("token")) {
    const username = load("profile").name;
    //show username in the header
    if (window.location.pathname === "/") {
      headerTextP1.textContent = `Welcome back, ${username}!`;
      headerTextP2.textContent =
        "-Check out all the latest listings and find your next treasure!";
      headerBtn.innerHTML = `<button type="button" class="btn btn-secondary-custom" id="listingsBtn">See all listings</button>`;
      headerBtn.addEventListener("click", () => {
        window.location.href = "/listings";
      });
      //hide the intro
      intro.setAttribute("hidden", true);
    }
  } else {
    headerTextP1.textContent = "Sign up now";
    headerTextP2.textContent =
      "-And recieve a gift of 1000 credits to buy for!";
  }
}
