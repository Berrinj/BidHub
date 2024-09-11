import { load } from "../storage/index.js";
const topNav = document.querySelector(".top-menu ul");

export function navListener() {
  if (load("token")) {
    // change the links in the topNav
    topNav.innerHTML = `
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="modal" data-bs-target="#newListingModal"><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 14 14">
<path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-linejoin="round" 
d="M13.5 10.5v2a1 1 0 0 1-1 1h-2m0-13h2a1 1 0 0 1 1 1v2m-13 0v-2a1 1 0 0 1 1-1h2m0 13h-2a1 1 0 0 1-1-1v-2" />
<path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-width="1.5"
d="M7 4v6M4 7h6" />
</svg>&nbsp;New Listing</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="myProfile" href="/profile"><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 14 14">
<path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5v2a1 1 0 0 1-1 1h-2m0-13h2a1 1 0 0 1 1 1v2m-13 0v-2a1 1 0 0 1 1-1h2m0 13h-2a1 1 0 0 1-1-1v-2m6.5-4a2 2 0 1 0 0-4a2 2 0 0 0 0 4m3.803 4.5a3.994 3.994 0 0 0-7.606 0z" />
</svg>&nbsp;My profile</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="hamburger"><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
<path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5" />
</svg></a>
        </li>
`;
  }
}
