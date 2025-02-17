import React, { useState } from 'react';
import SimpleVenueCard from '../../Templates/SimpleCard';

/**
 * Renders a list of venue cards, sorted by creation date in descending order.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array} props.venues - Array of venue objects to display.
 * @param {string} props.venues[].id - Unique identifier for each venue.
 * @param {string} [props.venues[].created] - Creation date of the venue.
 * @returns {JSX.Element} A list of venue cards or a message if no venues are available.
 */
function SimpleVenueList({ venues = [] }) {
  const [visibleCount, setVisibleCount] = useState(6);

  // Sort venues by created date (newest first)
  const sortedVenues = [...venues].sort((a, b) => {
    const dateA = a.created ? new Date(a.created) : new Date(0);
    const dateB = b.created ? new Date(b.created) : new Date(0);
    return dateB - dateA;
  });

  if (venues.length === 0) {
    return (
      <div className="flex bg-custom-medium p-5">
        <p className="m-auto font-petrona font-black text-white uppercase">
          No venues available.
        </p>
      </div>
    );
  }

  const visibleVenues = sortedVenues.slice(0, visibleCount);

  return (
    <div className="w-full max-w-[1400px] mx-auto mb-5">
      <img src="/public/back1.jpg" alt="Back img" className='absolute w-full h-full object-cover opacity-75'/>
      <div className="relative pt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 place-items-center mx-auto">
        {visibleVenues.map((venue) => (
          <div key={venue.id} className="w-[140px]">
            <SimpleVenueCard venue={venue} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SimpleVenueList;
