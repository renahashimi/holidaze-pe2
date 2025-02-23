import React from 'react';
import useApi from '../../api/getApi';
import { apiUrl } from '../../api/constants';
import HeroHomepage from '../../helpers/HeroSection';
import VenueSearch from '../../components/Venues/VenueSearch';
import { Link } from 'react-router-dom';
import SimpleVenueList from '../../components/Venues/SimpleVenueList';
import QuoteSection from '../../helpers/QuoteSection';
import ContactSection from '../../helpers/ContactSection';
import { Helmet } from 'react-helmet';

/**
 * HomePage component represents the homepage of the application.
 * It displays the Hero section, a venue search form, a list of the top popular venues, and a quote section.
 * It fetches the list of venues from an API and displays them based on bookings.
 * 
 * @component
 * @example
 * return (
 *   <HomePage />
 * )
 * @returns {JSX.Element} A rendered homepage with a hero section, venue search, popular venues, and a quote section.
 */
function HomePage() {
  const {
    data: venues,
    isLoading,
    isError,
    errorMessage,
  } = useApi(`${apiUrl}/venues?_owner=true&_bookings=true`);

  if (isLoading) return <div className="text-center text-xl uppercase font-semibold text-custom-deep">Loading...</div>;
  if (isError) return <div className="text-center text-xl uppercase font-semibold text-custom-deep">Error fetching venues: {errorMessage}</div>;
  if (!venues || venues.length === 0) return <div className="text-center text-xl uppercase font-semibold text-custom-deep">No venues found.</div>;

  const topVenues = [...venues]
    .sort((a, b) => b.bookings.length - a.bookings.length)
    .slice(0, 10);

  return (
    <>
      <Helmet>
        <title>Home | Holidaze</title>
        <meta
          name="description"
          content="Discover the top venues for your next event. Explore our popular venues and find the perfect spot for your occasion."
        />
        <meta name="keywords" content="Home, Venues, Popular Venues, Bookings" />
      </Helmet>
      <div className="mt-[50px] m-auto justify-center max-w-[1300px]">
        <div className="w-full">
          <HeroHomepage />
        </div>
        <div>
          <VenueSearch venues={venues} />
        </div>
        <div className="block w-full m-auto m-3 mt-10 py-4 gap-4 justify-between lg:border-t-4 lg:border-custom-deep">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mx-auto lg:mx-6 px-6 lg:p-2">
            <h2 className="border-t-2 border-custom-deep lg:border-0 lg:bg-white px-4 lg:p-0 text-custom-deep text-center lg:text-left text-lg md:text-2xl font-prata font-semibold my-3 py-3 uppercase">
              Our most popular Venues
            </h2>
            <Link
              to="/venues"
              className="hidden lg:inline-block border-b-4 border-custom-deep text-custom-deep text-lg px-4 py-1 mb-3 font-semibold font-petrona uppercase hover:bg-custom-light"
            >
              See all the venues
            </Link>
          </div>
          <div className="relative flex flex-wrap justify-center bg-white lg:mb-10">
            <SimpleVenueList venues={topVenues} pageType="home" className="relative" />
          </div>
          <div className="flex m-auto border-b-4 border-custom-dark pb-4">
            <Link
              to="/venues"
              className="flex lg:hidden m-auto mt-7 border-b-2 z-20 border-custom-deep text-custom-deep text-lg px-4 py-1 font-semibold font-petrona uppercase hover:bg-custom-light"
            >
              See all the venues
            </Link>
          </div>
          <div>
            <QuoteSection />
          </div>
        </div>
        <div>
          <ContactSection />
        </div>
      </div>
    </>
  );
}

export default HomePage;
