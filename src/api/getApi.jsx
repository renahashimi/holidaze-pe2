/**
 * Custom hook to fetch data from an API endpoint.
 * 
 * This hook manages the data fetching process, including loading state, error handling, 
 * and storing the fetched data. It uses the `authFetch` function to perform the request.
 *
 * @param {string} apiUrl - The API endpoint URL to fetch data from.
 * 
 * @returns {Object} The hook returns an object with the following properties:
 * - `data` {Array|Object|null}: The fetched data or null if no data has been fetched yet.
 * - `isLoading` {boolean}: A boolean indicating if the data is currently being loaded.
 * - `isError` {boolean}: A boolean indicating if an error occurred during the data fetch.
 * - `errorMessage` {string}: A string containing the error message, if any.
 * 
 * @example
 * const { data, isLoading, isError, errorMessage } = useApi('/api/venues');
 * 
 * if (isLoading) {
 *   return <div>Loading...</div>;
 * }
 * if (isError) {
 *   return <div>Error: {errorMessage}</div>;
 * }
 * return <div>Data: {JSON.stringify(data)}</div>;
 */
import { useEffect, useState } from 'react';
import { authFetch } from './auth/authFetch';

function useApi(apiUrl) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setIsError(false);
        setErrorMessage('');

        const response = await authFetch(`${apiUrl}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const json = await response.json();

        if (json.data) {
          if (Array.isArray(json.data)) {
            setData(json.data);
          } else {
            setData(json.data);
          }
        } else {
          throw new Error('No venue data found or data format is incorrect.');
        }
      } catch (error) {
        setIsError(true);
        setErrorMessage(error.message || 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [apiUrl]);

  return { data, isLoading, isError, errorMessage };
}

export default useApi;
