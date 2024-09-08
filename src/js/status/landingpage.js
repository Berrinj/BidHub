const headerTextP1 = document.querySelector(".header-first-p");
const headerTextP2 = document.querySelector(".header-second-p");
const headerBtn = document.querySelector(".header-button");
const topNav = document.querySelector(".top-menu ul");
const intro = document.querySelector(".intro");
// const loggedIn = document.querySelectorAll(".logged-in");
// const loggedOut = document.querySelectorAll(".logged-out");
import { load } from "../storage/index.js";

// Check if the user is logged in
export function checkLoggedInStatus() {
  if (load("token")) {
    const username = load("profile").name;
    //show username in the header
    headerTextP1.textContent = `Welcome back, ${username}!`;
    headerTextP2.textContent =
      "-Check out all the latest listings and find your next treasure!";
    headerBtn.innerHTML = `<button type="button" class="btn btn-secondary-custom" id="listingsBtn">See all listings</button>`;
    headerBtn.addEventListener("click", () => {
      window.location.href = "/listings.html";
    });
    //hide the intro
    intro.setAttribute("hidden", true);
    // //remove all the hidden attributes from the logged in section
    // loggedIn.forEach((element) => {
    //   element.removeAttribute("hidden");
    // });
    // //add hidden attribute to the logged out section
    // loggedOut.forEach((element) => {
    //   element.setAttribute("hidden", true);
    // });

    // change the links in the topNav
    topNav.innerHTML = `
                        <li class="nav-item">
                            <a class="nav-link" data-bs-toggle="modal" data-bs-target="#newListingModal"><img
                                    src="./src/images/svg/new-listing.svg">&nbsp;New Listing</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="myProfile" href="/profile"><img
                                    src="./src/images/svg/avatar.svg">&nbsp;My profile</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="hamburger"><img src="./src/images/svg/hamburger.svg"></a>
                        </li>
    `;
  } else {
    headerTextP1.textContent = "Sign up now";
    headerTextP2.textContent =
      "-And recieve a gift of 1000 credits to buy for!";
  }
}
