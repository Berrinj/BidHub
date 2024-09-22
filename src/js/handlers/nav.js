import { load } from "../storage/index.js";
import { openNewListingModal } from "./newListingModal.js";
const topNav = document.querySelector(".navbar-nav");

export function navListener() {
  if (load("token")) {
    // change the links in the topNav
    topNav.innerHTML = "";
    const newListItem = document.createElement("li");
    newListItem.classList.add("nav-item");

    const profileListItem = document.createElement("li");
    profileListItem.classList.add("nav-item");

    const logoutListItem = document.createElement("li");
    logoutListItem.classList.add("nav-item");

    const newListItemLink = document.createElement("a");
    newListItemLink.classList.add("nav-link", "d-flex", "align-items-center");
    newListItemLink.setAttribute("data-bs-target", "#newListingModal");
    newListItemLink.setAttribute("data-bs-toggle", "modal");
    newListItemLink.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 14 14">
    <path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-linejoin="round" 
    d="M13.5 10.5v2a1 1 0 0 1-1 1h-2m0-13h2a1 1 0 0 1 1 1v2m-13 0v-2a1 1 0 0 1 1-1h2m0 13h-2a1 1 0 0 1-1-1v-2" />
    <path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-width="1.5"
    d="M7 4v6M4 7h6" />
  </svg>
  &nbsp;New Listing
`;
    newListItem.addEventListener("click", openNewListingModal);

    const profileListItemLink = document.createElement("a");
    profileListItemLink.classList.add(
      "nav-link",
      "d-flex",
      "align-items-center",
    );
    profileListItemLink.id = "myProfile";
    profileListItemLink.href = "/profile";
    profileListItemLink.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 14 14">
    <path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-linejoin="round" 
    d="M13.5 10.5v2a1 1 0 0 1-1 1h-2m0-13h2a1 1 0 0 1 1 1v2m-13 0v-2a1 1 0 0 1 1-1h2m0 13h-2a1 1 0 0 1-1-1v-2m6.5-4a2 2 0 1 0 0-4a2 2 0 0 0 0 4m3.803 4.5a3.994 3.994 0 0 0-7.606 0z" />
  </svg>
  &nbsp;My profile
`;

    const logoutListItemLink = document.createElement("a");
    logoutListItemLink.classList.add("nav-link");
    logoutListItemLink.id = "logOut";
    logoutListItemLink.innerHTML = `Logout&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" viewBox="0 0 21 21">
	<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m14.595 13.5l2.905-3l-2.905-3m2.905 3h-9m6-7l-8 .002c-1.104.001-2 .896-2 2v9.995a2 2 0 0 0 2 2h8.095" />
</svg>`;
    logoutListItemLink.addEventListener("click", () => {
      localStorage.removeItem("profile");
      localStorage.removeItem("token");
      window.location.href = "/";
    });

    newListItem.appendChild(newListItemLink);
    profileListItem.appendChild(profileListItemLink);
    logoutListItem.appendChild(logoutListItemLink);

    topNav.appendChild(newListItem);
    topNav.appendChild(profileListItem);
    topNav.appendChild(logoutListItem);
  } else {
    topNav.innerHTML = ` <li class="nav-item logged-out login">
              <a class="nav-link" data-bs-toggle="modal" data-bs-target="#loginModal">Login</a>
            </li>
            <li class="nav-item logged-out register">
              <a class="nav-link" id="registerBtn" data-bs-toggle="modal" data-bs-target="#registerModal">Sign up</a>
            </li>`;
  }
}
