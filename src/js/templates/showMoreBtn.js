export function showMoreBtn(container, onClick) {
  const showMoreBtn = document.createElement("button");
  showMoreBtn.classList.add("btn", "btn-primary", "show-more-btn");
  showMoreBtn.innerText = "Show More";
  showMoreBtn.addEventListener("click", onClick);
  container.appendChild(showMoreBtn);
}

export function hideShowMoreBtn() {
  const showMoreBtnContainer = document.querySelector(".load-more");
  const showMoreBtn = document.querySelector(".show-more-btn");
  if (showMoreBtn) {
    showMoreBtn.classList.add("d-none");
    const noMoreListings = document.createElement("p");
    noMoreListings.classList.add("text-center", "fst-italic");
    noMoreListings.textContent = "No more listings to show.";
    showMoreBtnContainer.appendChild(noMoreListings);
  }
}
