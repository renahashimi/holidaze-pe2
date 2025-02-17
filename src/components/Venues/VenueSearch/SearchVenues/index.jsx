import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';

/**
 * Search component for filtering venues based on user input.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.searchTerm - Current search term.
 * @param {Function} props.setSearchTerm - Function to update the search term.
 * @returns {JSX.Element} A search input field with a clear button.
 */
function Search({ searchTerm, setSearchTerm }) {
  /**
   * Handles changes to the search input field.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
   */
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  /**
   * Clears the search input field.
   */
  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="my-4 w-full flex justify-center items-center">
      <div className="relative w-2/3 md:w-1/2">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for venues..."
          className="px-4 py-2 w-full border rounded pl-10 pr-10"
        />
        <BsSearch
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          size={20}
        />
        {searchTerm && (
          <IoMdClose
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
            size={22}
            onClick={clearSearch}
          />
        )}
      </div>
    </div>
  );
}

export default Search;
