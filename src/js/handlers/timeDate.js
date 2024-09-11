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
