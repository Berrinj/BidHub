export function errorTemplate() {
  const errorMsg = document.querySelector(".error-message");
  errorMsg.classList.add(
    "d-flex",
    "flex-column",
    "justify-content-center",
    "align-items-center",
    "position-absolute",
    "top-50",
    "start-50",
    "translate-middle",
  );
  const loadingText = document.querySelector(".loading-text");
  loadingText.classList.add("d-none");
  const errorSVG = document.createElement("img");
  errorSVG.classList.add("error-svg", "col-4", "col-lg-3", "opacity-75");
  errorSVG.src = "../../src/images/svg/tabler--face-id-error.svg";
  errorSVG.alt = "Error face";
  const errorMsgText = document.createElement("p");
  errorMsgText.classList.add("display-6", "text-center");
  errorMsgText.innerText =
    "So sorry, we failed to find what you are looking for";
  const goBackLink = document.createElement("a");
  goBackLink.href = `/`;
  goBackLink.innerText = "< Go back to homepage";
  errorMsg.appendChild(errorSVG);
  errorMsg.appendChild(errorMsgText);
  errorMsg.appendChild(goBackLink);
}
