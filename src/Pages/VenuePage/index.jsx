import React from 'react';
import SingleVenuePage from '../../components/Templates/SingleVenueCard';
import { Helmet } from 'react-helmet';

/**
 * VenuePage component displays a detailed view of a single venue.
 * 
 * This component renders the `SingleVenuePage` component which shows detailed
 * information about a specific venue, including its features and availability.
 * 
 * @component
 * @example
 * return (
 *   <VenuePage />
 * )
 * @returns {JSX.Element} A rendered page showing details of a single venue.
 */
function VenuePage() {
  return (
    <>
      <Helmet>
        <title>Venue Details | Holidaze</title>
        <meta
          name="description"
          content="Discover detailed information about a venue including features, availability, and pricing."
        />
        <meta name="keywords" content="Venue, Venue Details, Holidaze, Book Venues" />
      </Helmet>

      <div className="row justify-content-between mt-[70px]">
        <SingleVenuePage />
      </div>
    </>
  );
}

export default VenuePage;
