import { authFetch } from '../auth/authFetch';

export const putData = async (url, data = {}) => {
  try {
    const response = await authFetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(
        `Error: ${response.status} - ${errorDetails.message || 'Unknown error'}`
      );
    }

    return await response.json(); 
  } catch (error) {
    console.error('Error in authFetchPUT:', error.message);
    throw error;
  }
};
