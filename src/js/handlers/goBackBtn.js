/**
 * Go back button handler
 * @name goBackBtn
 * @description Go back to the previous page
 * @param {event} event - prevent default action
 * @returns {void} - No return value
 */

export function goBackBtn() {
  document.querySelector(".go-back").addEventListener("click", (event) => {
    event.preventDefault();
    window.history.back();
  });
}
