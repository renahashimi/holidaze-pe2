/**
 * Calculates the total price for a stay based on the start and end dates and the price per day.
 *
 * @param {string} dateFrom - The start date in string format (e.g., "YYYY-MM-DD").
 * @param {string} dateTo - The end date in string format (e.g., "YYYY-MM-DD").
 * @param {number} pricePerDay - The price per day of the stay.
 * @returns {number} The total price for the stay.
 */
export function calculateTotalPrice(dateFrom, dateTo, pricePerDay) {
  const startDate = new Date(dateFrom);
  const endDate = new Date(dateTo);

  const timeDifference = endDate - startDate;

  const daysDifference = timeDifference / (1000 * 3600 * 24);

  const totalPrice = daysDifference * pricePerDay;

  return totalPrice;
}
