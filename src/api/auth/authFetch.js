import { load } from '../../storage/load.js';
import { apiKey } from '../constants.js';

/**
 * Generates headers for authenticated API requests.
 * 
 * @returns {Object} Headers object including authorization and API key.
 */
export function headers() {
  const token = load('token') || localStorage.getItem('token');

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'X-Noroff-API-KEY': apiKey,
  };
}

/**
 * Performs an authenticated fetch request.
 * 
 * @param {string} url - The API endpoint to request.
 * @param {RequestInit} [options={}] - Additional fetch options.
 * @returns {Promise<Response>} The fetch response.
 */
export async function authFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: headers(),
  });
}
