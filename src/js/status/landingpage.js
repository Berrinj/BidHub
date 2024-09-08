const headerTextH1 = document.querySelector(".header-text h1");
const headerTextP = document.querySelector(".header-text p");
const headerBtn = document.querySelector(".header-button");
const topNav = document.querySelector(".top-menu ul");
import { load } from "../storage/index.js";

// Check if the user is logged in
export function checkLoggedInStatus() {
  if (load("token")) {
    headerTextH1.textContent = "Welcome back!";
    headerTextP.textContent =
      "Check out all the latest listings and find your next treasure!";
    headerBtn.innerHTML =
      '<button type="button" class="btn btn-secondary-custom" id="listingsBtn">See listings</button>';
    headerBtn.addEventListener("click", () => {
      window.location.href = "/listings.html";
    });
    //change the links in the topNav
    topNav.innerHTML = `
      <li class="nav-item">
        <a class="nav-link" href="/listings.html">Listings</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/profile.html">Profile</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/logout.html">Logout</a>
      </li>
    `;
  } else {
    headerTextH1.textContent = "Sign up now";
    headerTextP.textContent = "-And recieve a gift of 1000 credits to buy for!";
  }
}
