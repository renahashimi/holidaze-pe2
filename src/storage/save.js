/**
 * Saves a value to localStorage.
 *
 * This function stores the value associated with the provided key in localStorage,
 * serializing it to JSON format. If the value cannot be serialized, the function 
 * will throw an error.
 *
 * @param {string} key - The key under which to store the value.
 * @param {any} value - The value to store, which will be serialized to JSON.
 * @example
 * save('user', { name: 'John', age: 30 });
 */
export const save = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
