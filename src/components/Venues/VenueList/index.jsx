import React, { useState, useMemo } from 'react';
import VenueCard from '../../Templates/VenueCard';

/**
 * Renders a list of venue cards, sorted by creation date in descending order.
 * Allows dynamic loading of more venues.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array} props.venues - Array of venue objects to display.
 * @param {string} props.venues[].id - Unique identifier for each venue.
 * @param {string} [props.venues[].created] - Creation date of the venue.
 * @returns {JSX.Element} A list of venue cards or a message if no venues are available.
 */
function VenueList({ venues }) {
  const [visibleCount, setVisibleCount] = useState(24);

  /**
   * Sort venues by created date (newest first).
   * Uses useMemo to optimize sorting performance.
   */
  const sortedVenues = useMemo(() => {
    return [...venues].sort((a, b) => {
      const dateA = a.created ? new Date(a.created) : new Date(0);
      const dateB = b.created ? new Date(b.created) : new Date(0);
      return dateB - dateA;
    });
  }, [venues]);

  /**
   * Increases the number of visible venues by 24 when "Load More" is clicked.
   */
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 24);
  };

  if (venues.length === 0) {
    return (
      <div className="flex bg-custom-medium p-5 mb-10">
        <p className="m-auto font-petrona font-black text-white uppercase">
          No venues available.
        </p>
      </div>
    );
  }

  const visibleVenues = sortedVenues.slice(0, visibleCount);

  return (
    <div className="w-full max-w-[1300px] mx-auto">
      <div className="flex flex-wrap gap-5 justify-center items-center">
        {visibleVenues.map((venue) => (
          <div
            key={venue.id}
            className="w-full sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-6"
          >
            <VenueCard venue={venue} />
          </div>
        ))}
      </div>
      {visibleCount < venues.length && (
        <div className="flex justify-center my-6">
          <button
            onClick={handleLoadMore}
            className="px-6 py-1 font-petrona bg-custom-deep text-white font-bold uppercase text-xl rounded hover:bg-custom-dark"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default VenueList;
