/**
 * Format number with thousand separator
 * @param {number | string} number - Number to be formatted
 * @param {string} [defaultSeparator = "."] - (Optional) Default separator. Default is "."
 * @returns {string} Formatted number
 */
export function thousandSeparator(number: number | string, defaultSeparator = "."): string {
  if (typeof number === "string") {
    const value = number.replace(/\D/g, "");
    const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, defaultSeparator);
    return formattedValue;
  }

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, defaultSeparator);
}