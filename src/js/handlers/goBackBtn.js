export function goBackBtn() {
  document.querySelector(".go-back").addEventListener("click", (event) => {
    event.preventDefault();
    window.history.back();
  });
}
