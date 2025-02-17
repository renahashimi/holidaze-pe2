/**
 * Retrieves a value from localStorage by key.
 *
 * This function attempts to parse the value stored in localStorage as JSON.
 * If the key doesn't exist or an error occurs during parsing, it returns null.
 *
 * @param {string} key - The key for the value to retrieve from localStorage.
 * @returns {any|null} The parsed value if it exists and is valid JSON, or null if it doesn't exist or is invalid.
 * @example
 * const userData = load('user');
 */
export function load(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}
