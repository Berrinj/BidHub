/**
 * @description Format the date to a human-readable format, hour and minute
 * @name formatDate
 * @param {string} date - Date to format
 * @returns {string} - Formatted date
 */

export function formatDate(date) {
  return new Date(date).toLocaleDateString("nb-NO", {
    hour: "numeric",
    minute: "numeric",
  });
}

/**
 * @description Format the date to a human-readable format, day, month, year, hour and minute
 * @name formattedUpdatedDate
 * @param {string} date - Date to format
 * @returns {string} - Formatted date
 */

export function formattedUpdatedDate(date) {
  return new Date(date).toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

/**
 * @description Format the date to a human-readable format, Countdown timer for days, hours, minutes and seconds
 * @param {*} date - The date to count down to
 * @param {*} element - The element to display the countdown timer
 * if the countdown is over, display "Ended"
 */

export function countdownTimer(date, element) {
  const countDownDate = new Date(date).getTime();
  const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    element.innerHTML = `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;
    if (distance < 0) {
      clearInterval(interval);
      element.innerHTML = "Ended";
    }
  }, 1000);
}
