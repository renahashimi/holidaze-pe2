import React, { useState, useEffect, useRef } from 'react';
import VenueCard from '../../Templates/VenueCard';
import {
  FaWifi,
  FaParking,
  FaCoffee,
  FaPaw,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
} from 'react-icons/fa';

/**
 * The `VenueSearch` component provides a search interface for filtering and sorting venues.
 * It allows users to search for venues based on name, location, and specific filters such as facilities and date.
 * 
 * @component
 * @example
 * return <VenueSearch venues={someVenueData} />;
 * 
 * @param {Object} props - The component props.
 * @param {Array} props.venues - The list of venue objects to display and filter.
 */
const VenueSearch = ({ venues = [] }) => {
  /**
   * State for storing the search query entered by the user.
   * @type {string}
   */
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * State for storing the list of venues after applying filters and search query.
   * @type {Array}
   */
  const [filteredVenues, setFilteredVenues] = useState([]);

  /**
   * State that tracks whether a search has been performed.
   * @type {boolean}
   */
  const [searchPerformed, setSearchPerformed] = useState(false);

  /**
   * State for controlling the visibility of the filter details section.
   * @type {boolean}
   */
  const [showDetails, setShowDetails] = useState(false);

  /**
   * State for managing the selected date sort option ('newest' or 'oldest').
   * @type {string | null}
   */
  const [dateSortOption, setDateSortOption] = useState(null);

  /**
   * State for managing filter options like wifi, parking, breakfast, and pets.
   * @type {Object}
   * @property {boolean} wifi - Whether the wifi filter is active.
   * @property {boolean} parking - Whether the parking filter is active.
   * @property {boolean} breakfast - Whether the breakfast filter is active.
   * @property {boolean} pets - Whether the pets filter is active.
   */
  const [filters, setFilters] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });

  /**
   * Reference for the search bar element to detect outside clicks.
   * @type {Object}
   */
  const searchRef = useRef(null);

  /**
   * Effect hook that listens for clicks outside the search bar to close the filter details and reset the search.
   * This runs only once during component mount.
   */
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDetails(false);
        handleClearSearch();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  /**
   * Toggles a specific filter option (e.g., wifi, parking) between true and false.
   * 
   * @param {string} key - The filter key (e.g., 'wifi', 'parking', etc.).
   */
  const handleFilterChange = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  /**
   * Toggles the visibility of the filter details section.
   */
  const toggleDetails = () => setShowDetails(!showDetails);

  /**
   * Handles the search functionality by filtering venues based on the search query, selected filters, and date sorting.
   * It updates the `filteredVenues` state with the filtered and sorted venue list.
   */
  const handleSearch = () => {
    const queryLower = searchQuery.toLowerCase();

    let newFilteredVenues = venues.filter((venue) => {
      const nameMatch =
        venue.name && venue.name.toLowerCase().includes(queryLower);
      const locationMatch =
        venue.location?.city?.toLowerCase().includes(queryLower) ||
        venue.location?.country?.toLowerCase().includes(queryLower);
      const metaMatch = Object.keys(filters).every((key) =>
        filters[key] ? venue.meta?.[key] : true
      );

      return (nameMatch || locationMatch) && metaMatch;
    });

    if (dateSortOption) {
      newFilteredVenues = newFilteredVenues.sort((a, b) =>
        dateSortOption === 'newest'
          ? new Date(b.created) - new Date(a.created)
          : new Date(a.created) - new Date(b.created)
      );
    }

    setFilteredVenues(newFilteredVenues);
    setSearchPerformed(true);
  };

  /**
   * Clears the search query, filtered venues, and resets all filters.
   */
  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredVenues([]);
    setFilters({
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    });
    setSearchPerformed(false);
    setShowDetails(false);
  };

  /**
   * Handles the sorting of venues based on the selected date option ('newest' or 'oldest').
   * 
   * @param {string} option - The selected sort option ('newest' or 'oldest').
   */
  const handleDateSort = (option) => {
    setDateSortOption(option);
    handleSearch();
  };

  return (
    <div
      className="block m-auto max-w-[1300px] justify-center bg-white"
      ref={searchRef}
    >
      <div className="m-auto justify-center sm:flex bg-custom-dark max-w-[700px] sm:-mt-16 sm:pt-4 z-[999] relative sm:rounded-t">
        <div className="search-bar flex w-full justify-between px-4 pt-3 sm:pt-1 pb-4 md:mx-6">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            className="search-input border-2 border-custom-deep my-2.5 px-2 w-full rounded-md"
          />
          <button
            onClick={toggleDetails}
            className="flex text-white hover:text-custom-deep border-2 border-white font-petrona font-semibold text-sm py-2 px-3 m-3 hover:bg-custom-light border-2 border-custom-deep rounded"
          >
            FILTER
            <span className="ps-2 mt-1 pb-0 mb-0">
              {showDetails ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="block sm:flex justify-center sm:justify-evenly m-auto text-center my-4 max-w-[700px]">
          <div className="block">
            <h2 className="font-petrona font-semibold text-lg text-custom deep uppercase">
              facilities
            </h2>
            {['wifi', 'parking', 'breakfast', 'pets'].map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`btn ${filters[filter] ? 'bg-custom-medium border-2 border-custom-light' : 'bg-custom-deep border-2 border-transparent'} p-2 text-center m-2 rounded-full text-white`}
              >
                <span className="flex items-center">
                  {filter === 'wifi' && <FaWifi />}
                  {filter === 'parking' && <FaParking />}
                  {filter === 'breakfast' && <FaCoffee />}
                  {filter === 'pets' && <FaPaw />}
                </span>
              </button>
            ))}
          </div>
          <div className="block justify-center my-4 sm:my-0">
            <h3 className="font-petrona font-semibold text-lg text-custom deep uppercase pt-4 sm:pt-0">
              Date
            </h3>
            <div className="block text-white text-s font-petrona font-semibold">
              <button
                onClick={() => handleDateSort('newest')}
                className={`px-2 py-1 m-2 border-2 uppercase text-sm ${dateSortOption === 'newest' ? 'bg-custom-medium border-2 border-custom-light' : 'bg-custom-deep border-2 border-transparent'} rounded-full`}
              >
                New to Old
              </button>
              <button
                onClick={() => handleDateSort('oldest')}
                className={`px-2 py-1 m-2 border-2 uppercase text-sm ${dateSortOption === 'oldest' ? 'bg-custom-medium border-2 border-custom-light' : 'bg-custom-deep border-2 border-transparent'} rounded-full`}
              >
                Old to New
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex text-xs sm:text-sm m-auto justify-center px-2 text-custom-deep font-bold bg-custom-medium max-w-[700px] sm:rounded-b">
        <button
          onClick={handleSearch}
          className="search-button uppercase text-custom-deep hover:text-custom-dark bg-white hover:bg-custom-light w-[100px] px-2 py-1 m-2 border-b-4 border-custom-deep rounded"
          aria-label="Search"
        >
          Search
        </button>
        <button
          onClick={handleClearSearch}
          className="search-button uppercase text-custom-deep hover:text-custom-dark bg-white hover:bg-custom-light w-[100px] px-2 py-1 m-2 border-b-4 border-custom-deep rounded"
          aria-label="Clear search"
        >
          Clear All
        </button>
      </div>
      <div className="flex text-xs sm:text-sm m-auto justify-center px-2 text-custom-deep font-bold bg-custom-light max-w-[700px] sm:rounded-b">
        {searchPerformed && (
          <button
            onClick={handleClearSearch}
            className="block fixed bottom-8 z-50 left-5 search-button uppercase text-white hover:text-custom-dark bg-custom-dark hover:bg-custom-light px-4 py-2 m-3 border-2 border-transparent rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105"
            aria-label="Clear search"
          >
            Clear
          </button>
        )}
      </div>
      <div className="flex flex-wrap m-auto justify-center bg-custom-medium">
        {searchPerformed && filteredVenues.length === 0 ? (
          <p className="text-xl text-white uppercase font-petrona font-semibold py-3">
            No venues found
          </p>
        ) : (
          filteredVenues.map((venue) => (
            <div className="m-4" key={venue.id}>
              <VenueCard venue={venue} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VenueSearch;
