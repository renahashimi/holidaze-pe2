/**
 * Formats a given date string into a "DD.MM.YYYY" format.
 * If the date is invalid or not provided, it returns appropriate error messages.
 *
 * @param {string} dateString - The date string to be formatted.
 * @returns {string} The formatted date or an error message if invalid.
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'Date not available';

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};
