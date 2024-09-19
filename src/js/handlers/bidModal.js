import { getProfile } from "../api/profile/get.js";
import { placeBid } from "../api/listings/bid.js";
import { load } from "../storage/index.js";

export async function openBidModal(
  listing,
  listingID,
  mediaURL,
  lastBidAmount,
) {
  // Profile data
  const name = load("profile").name;
  const profile = await getProfile(name);
  console.log("Profile data:", profile);
  const creditsAvailable = profile.data.credits;
  // Modal
  const modal = document.querySelector("#bidModal");
  modal.dataset.id = listingID;

  // Update modal header
  const modalHeader = modal.querySelector(".modal-header");
  const modalTitle = modalHeader.querySelector("#bidModalLabel");
  modalTitle.textContent = listing.title;
  modalTitle.classList.add("bid-modal-title", "text-center");

  // Clear previous content in modal body
  const modalBody = modal.querySelector(".modal-body");
  modalBody.innerHTML = "";

  // listing image
  const modalImg = document.createElement("img");
  modalImg.src = mediaURL;
  modalImg.classList.add(
    "bid-modal-img",
    "img-fluid",
    "rounded",
    "object-fit-cover",
  );
  modalBody.appendChild(modalImg);

  // current bid
  const modalTopBidTitle = document.createElement("h2");
  modalTopBidTitle.classList.add(
    "bid-modal-bids",
    "text-center",
    "mt-2",
    "fs-4",
  );
  modalTopBidTitle.textContent = `Current bid:`;

  const modalTopBidInfo = document.createElement("h3");
  modalTopBidInfo.classList.add(
    "bid-modal-bids",
    "text-center",
    "text-uppercase",
  );
  modalTopBidInfo.textContent = `${lastBidAmount} Credits`;

  modalBody.appendChild(modalTopBidTitle);
  modalBody.appendChild(modalTopBidInfo);

  // bid form
  const bidForm = document.createElement("form");
  bidForm.classList.add(
    "bid-form",
    "d-flex",
    "flex-column",
    "align-items-center",
  );

  const bidFormGroup = document.createElement("div");
  bidFormGroup.classList.add("form-group", "text-center");

  const bidLabel = document.createElement("label");
  bidLabel.setAttribute("for", "bidAmount");
  bidLabel.classList.add("form-label", "text-center", "mt-3", "fs-4");
  bidLabel.textContent = "Ready to place your bid?";

  const bidInput = document.createElement("input");
  bidInput.classList.add("form-control", "text-center");
  bidInput.type = "number";
  bidInput.name = "bidAmount";
  bidInput.id = "bidAmount";
  bidInput.ariaRequired = true;
  bidInput.ariaLabel = "Bid amount";
  bidInput.title = "Bid amount must be greater than the current bid";
  bidInput.min = lastBidAmount + 1;
  bidInput.placeholder = "Enter bid amount";

  const tokensAvailable = document.createElement("p");
  tokensAvailable.classList.add("text-center", "fst-italic", "mb-0");
  tokensAvailable.innerHTML = `<small>You have ${creditsAvailable} credits available</small>`;

  const bidError = document.createElement("p");
  bidError.classList.add("text-danger", "fst-italic", "mb-2");
  bidError.textContent = "Bid amount must be greater than the current bid";
  bidError.style.display = "none";
  const bidSuccess = document.createElement("p");
  bidSuccess.classList.add("text-success", "fst-italic", "mb-2");
  bidSuccess.textContent = "Bid placed successfully";
  bidSuccess.style.display = "none";

  bidFormGroup.appendChild(bidLabel);
  bidFormGroup.appendChild(bidInput);
  bidFormGroup.appendChild(bidSuccess);
  bidFormGroup.appendChild(bidError);
  bidFormGroup.appendChild(tokensAvailable);
  bidForm.appendChild(bidFormGroup);
  modalBody.appendChild(bidForm);

  // place bid button
  const placeBidBtn = document.createElement("button");
  placeBidBtn.classList.add(
    "btn",
    "btn-secondary-custom",
    "place-bid-btn",
    "text-uppercase",
    "text-white",
    "mt-2",
    "mb-3",
  );
  placeBidBtn.type = "submit";
  placeBidBtn.textContent = "Place bid";
  placeBidBtn.dataset.id = listingID;
  modalBody.appendChild(placeBidBtn);

  placeBidBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    const bidAmount = parseInt(bidInput.value);
    if (bidAmount <= lastBidAmount) {
      bidError.style.display = "block";
      return;
    }
    bidError.style.display = "none";
    const response = await placeBid(event.target.dataset.id, bidAmount);
    console.log("Bid placed successfully:", response);
    if (response) {
      bidError.style.display = "none";
      bidSuccess.style.display = "block";
      bidLabel.textContent =
        "Your bid has been placed! Refreshing the page in 3 seconds...";
      modalTopBidInfo.textContent = `${bidAmount} Credits`;

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      bidSuccess.style.display = "none";
      bidError.style.display = "block";
      bidLabel.textContent = "Failed to place bid";
    }
  });

  // listing ID
  const modalId = document.createElement("p");
  modalId.classList.add(
    "bid-modal-id",
    "fst-italic",
    "text-center",
    "mb-0",
    "opacity-75",
  );
  modalId.innerHTML = `<small>Listing ID: ${listingID}</small>`;
  modalBody.appendChild(modalId);
  const footerBtn = document.querySelector("#view-listing-btn");
  if (footerBtn) {
    footerBtn.dataset.id = listingID;
    footerBtn.addEventListener("click", (event) => {
      window.location.href = `./listing/?id=${event.target.dataset.id}`;
    });
  }
}
