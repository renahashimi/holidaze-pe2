import React, { useState, useEffect, useRef } from 'react';
import VenueCard from '../../Templates/VenueCard';
import { FaWifi, FaParking, FaCoffee, FaPaw, FaChevronDown, FaChevronUp } from 'react-icons/fa';

/**
 * VenueSearch component handles venue search functionality with filters, sorting options, and venue display.
 * 
 * @param {Object} props - The component props.
 * @param {Array} props.venues - The list of venues to be displayed and filtered.
 * 
 * @returns {JSX.Element} The VenueSearch component.
 */
const VenueSearch = ({ venues = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [dateSortOption, setDateSortOption] = useState(null);
  const [filters, setFilters] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });

  const searchRef = useRef(null);

  /**
   * Effect hook to handle clicks outside the search component to close the details and clear search.
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
   * Handles filter changes by toggling the state of a given filter.
   * 
   * @param {string} key - The filter key to toggle.
   */
  const handleFilterChange = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  /**
   * Toggles the visibility of the details section.
   */
  const toggleDetails = () => setShowDetails(!showDetails);

  /**
   * Handles search functionality, applying filters and sorting the venues based on the search query.
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
   * Clears the search input, filters, and reset the search state.
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
   * Handles sorting venues by date, based on the selected sort option.
   * 
   * @param {string} option - The sort option, either 'newest' or 'oldest'.
   */
  const handleDateSort = (option) => {
    setDateSortOption(option);
    handleSearch();
  };

  const location = window.location.pathname;

  return (
    <div
      className="block m-auto max-w-[1300px] justify-center bg-white"
      ref={searchRef}
    >
      <div className={`m-auto justify-center sm:flex sm:-mt-16 sm:pt-4 z-[999] relative sm:rounded-t ${location === "/" ? "bg-custom-dark max-w-[700px]" : "bg-custom-light border-t-2 border-custom-deep"}`}>
        <div className={`search-bar flex w-full justify-between ${location === "/" ? "bg-custom-dark px-4 pt-3 sm:pt-1 pb-4 md:mx-6" : "bg-custom-light ps-2 pb-2 max-w-[700px]"}`}>
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
            className={`flex hover:text-custom-deep font-petrona font-semibold text-base py-2 px-3 m-3 hover:bg-custom-light border-2 border-custom-deep rounded ${location === "/" ? "bg-custom-dark text-white border-none" : "bg-whitet text-custom-deep"}`}>
          
            FILTER
            <span className="ps-2 mt-1 pb-0 mb-0">
              {showDetails ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </button>
        </div>
      </div>

      {showDetails && (
        <div className={`block sm:flex justify-center sm:justify-evenly m-auto text-center my-2 max-w-[700px] ${location === "/" ? "bg-custom-white" : "bg-custom-light py-6"}`}>
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

      <div className={`flex text-xs sm:text-sm m-auto justify-center px-2 text-custom-deep font-bold max-w-[700px] ${location === "/" ? "bg-custom-medium sm:rounded-b " : "bg-white border-b-2 border-custom-deep"}`}>
        <button
          onClick={handleSearch}
          className={`search-button uppercase text-custom-deep hover:text-custom-dark hover:bg-custom-light w-[100px] px-2 py-1 m-2 border-b-4 border-custom-deep rounded  ${location === "/" ? "bg-white" : "bg-custom-light"}`}
          aria-label="Search"
        >
          Search
        </button>
        <button
          onClick={handleClearSearch}
          className={`search-button uppercase text-custom-deep hover:text-custom-dark hover:bg-custom-light w-[100px] px-2 py-1 m-2 border-b-4 border-custom-deep rounded  ${location === "/" ? "bg-white" : "bg-custom-light"}`}
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
      <div
        className={`flex flex-wrap m-auto justify-center ${location === "/" || location === "/venues" ? (searchPerformed ? "bg-custom-medium py-2 mt-3 border-t-4 border-custom-deep" : "bg-custom-light") : "bg-custom-light"}`}
      >
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
