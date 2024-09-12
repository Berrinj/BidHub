export function formatDate(date) {
  return new Date(date).toLocaleDateString("nb-NO", {
    // day: "numeric",
    // month: "long",
    // year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

export function formattedUpdatedDate(date) {
  return new Date(date).toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

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
  }, 1000); // Update every second
}
