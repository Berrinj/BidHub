export function errorTemplate(container) {
  container.innerHTML = "";
  // const errorMsg = document.querySelector(".error-message");
  container.classList.add(
    "d-flex",
    "flex-column",
    "justify-content-center",
    "align-items-center",
  );
  const loadingText = document.querySelectorAll(".loading-text");
  loadingText.forEach((text) => {
    text.classList.add("d-none");
  });
  const errorSVG = document.createElement("img");
  errorSVG.classList.add("error-svg", "col-4", "col-lg-3", "opacity-75");
  errorSVG.src = "../../src/images/svg/tabler--face-id-error.svg";
  errorSVG.alt = "Error face";
  container.appendChild(errorSVG);
  const errorMsgText = document.createElement("p");
  errorMsgText.classList.add("display-6", "text-center");
  errorMsgText.innerText =
    "So sorry, we failed to find what you are looking for";
  container.appendChild(errorMsgText);
  const goBackLink = document.createElement("a");
  goBackLink.href = `/`;
  goBackLink.innerText = "< Go back to homepage";
  container.appendChild(goBackLink);
  // errorMsg.appendChild(errorSVG);
  // errorMsg.appendChild(errorMsgText);
  // errorMsg.appendChild(goBackLink);
  // placement.appendChild(errorMsg);
}
