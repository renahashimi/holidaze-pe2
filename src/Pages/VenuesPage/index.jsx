import React, { useState, useEffect } from 'react';
import Search from '../../components/Venues/VenueSearch/SearchVenues';
import VenueList from '../../components/Venues/VenueList';
import { authFetch } from '../../api/auth/authFetch';
import { apiUrl } from '../../api/constants';
import { Helmet } from 'react-helmet';

/**
 * VenuesPage component displays a list of venues with search functionality.
 *
 * This component fetches venues data from an API, displays a loading state while the data is being fetched,
 * and allows users to search for venues by name. If an error occurs while fetching data, an error message is displayed.
 *
 * @component
 * @example
 * return (
 *   <VenuesPage />
 * )
 * @returns {JSX.Element} A page with a list of venues, a search bar, and appropriate error/loading states.
 */
function VenuesPage() {
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await authFetch(
          `${apiUrl}/venues?_owner=true&_bookings=true`
        );
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data.data)) {
            setVenues(data.data);
          } else {
            setIsError(true);
          }
        } else {
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const filteredVenues = Array.isArray(venues)
    ? venues.filter((venue) =>
        venue.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading venues.</div>;

  return (
    <>
      <Helmet>
        <title>Venues | Holidaze</title>
        <meta
          name="description"
          content="Explore a variety of venues with detailed information and booking options."
        />
        <meta name="keywords" content="Venues, Venue List, Holidaze, Book Venues" />
      </Helmet>

      <div className="row justify-content-between mt-[80px]">
        <h1 className="flex m-auto justify-center text-2xl font-prata font-semibold my-6 p-3 uppercase bg-custom-light">
          Our Venues
        </h1>
        <div>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <VenueList venues={filteredVenues} />
      </div>
    </>
  );
}

export default VenuesPage;
