/**
 * @name truncateText
 * @description Truncate text to a specified length for the listings
 * @param {*} text - The text to be truncated
 * @param {*} maxLength - The maximum length of the text
 * @returns {string} - The truncated text
 */

export function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}
