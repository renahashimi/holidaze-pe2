import { apiBaseUrl } from '../constants';
import { authFetch } from './authFetch';

/**
 * Fetches an API key and stores it in local storage.
 * 
 * @returns {Promise<Object>} The response data containing the API key.
 * @throws {Error} If the request fails.
 */
export async function getApiKey() {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${apiBaseUrl}/auth/create-api-key`, {
      method: 'POST',
      body: JSON.stringify({ name: 'apiKey' }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error:', errorData);
      throw new Error('Something went wrong');
    }

    const data = await response.json();

    if (data.apiKey) {
      localStorage.setItem('apiKey', data.apiKey);
    }

    return data;
  } catch (error) {
    console.error('Exception:', error);
    throw error;
  }
}
