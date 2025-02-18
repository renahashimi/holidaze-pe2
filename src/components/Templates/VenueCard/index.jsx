import { useState, useEffect } from 'react';
import { FaWifi, FaParking, FaCoffee, FaPaw } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IoLocationSharp } from 'react-icons/io5';
import { FaStar } from 'react-icons/fa6';
import Modal from '../../../helpers/Modal';

/**
 * Component for displaying a venue card with image, name, rating, location, amenities, and price.
 * 
 * @component
 * @param {Object} props - React component props
 * @param {Object} props.venue - The venue data
 * @param {string} props.venue.name - The name of the venue
 * @param {Object} props.venue.location - The location details of the venue
 * @param {string} [props.venue.location.city] - The city of the venue
 * @param {string} [props.venue.location.country] - The country of the venue
 * @param {Array} props.venue.media - Array of media objects containing image URLs and alt text
 * @param {string} props.venue.media[].url - URL of the venue image
 * @param {string} props.venue.media[].alt - Alt text for the venue image
 * @param {number} props.venue.price - The price per night
 * @param {number} props.venue.rating - The venue rating
 * @param {Object} props.venue.meta - Metadata about the venue's amenities
 * @param {boolean} props.venue.meta.wifi - Indicates if WiFi is available
 * @param {boolean} props.venue.meta.parking - Indicates if parking is available
 * @param {boolean} props.venue.meta.breakfast - Indicates if breakfast is included
 * @param {boolean} props.venue.meta.pets - Indicates if pets are allowed
 * 
 * @returns {JSX.Element} The VenueCard component
 */
function VenueCard({ venue }) {
  const { name, location, media, price, rating, meta } = venue;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  /**
   * Opens the image modal and sets the selected image index.
   * @param {number} index - The index of the image to display in the modal.
   */
  const openImageModal = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  /**
   * Closes the image modal.
   */
  const closeModal = () => {
    setIsModalOpen(false);
  };

  /**
   * Navigates to the previous image in the media array.
   * If the first image is displayed, it loops back to the last image.
   */
  const handlePrevImage = () => {
    setFade(false);
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? media.length - 1 : prevIndex - 1
    );
  };

  /**
   * Navigates to the next image in the media array.
   * If the last image is displayed, it loops back to the first image.
   */
  const handleNextImage = () => {
    setFade(false);
    setSelectedImageIndex((prevIndex) =>
      prevIndex === media.length - 1 ? 0 : prevIndex + 1
    );
  };

  /**
   * Adds a fade effect when the selected image changes.
   */
  useEffect(() => {
    if (!fade) {
      setTimeout(() => setFade(true), 400);
    }
  }, [selectedImageIndex, fade]);

  return (
    <div className="m-auto max-w-[250px] shadow-xl bg-white">
      {/* Venue Image */}
      <div className="relative">
        <img
          src={media?.[selectedImageIndex]?.url || '/FallbackImg.jpg'}
          alt={media?.[selectedImageIndex]?.alt || 'Venue image'}
          className={`w-[250px] h-48 object-cover mb-1 cursor-pointer transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => openImageModal(selectedImageIndex)}
        />

        {/* Arrows for image navigation */}
        {media && media.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-custom-dark px-2 py-1 rounded-full text-white text-xl"
            >
              ❮
            </button>
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-custom-dark px-2 py-1 rounded-full text-white text-xl"
            >
              ❯
            </button>
          </>
        )}
      </div>

      <div className="p-3 font-petrona">
        {/* Venue Name */}
        <div className="flex justify-between border-b border-5 border-custom-medium mb-4">
          <h2 className="flex text-xl font-prata font-semibold text-custom-deep overflow-hidden truncate">
            {name}
          </h2>
          <p className="flex font-petrona border border-2 border-custom-light mb-3 px-1 pt-1 rounded-full text">
            <FaStar className="text-yellow-500 mt-0.5" />
            <span className="font-semibold text-lg mx-1 -mt-1">{rating}</span>
          </p>
        </div>
        {/* Venue Location */}
        <p className="flex font-petrona text-custom-dark text-base p-2 -mt-3">
          <IoLocationSharp className="text-lg mr-1 -ms-1" />
          {location.city && location.country
            ? `${location.city}, ${location.country}`
            : 'Location not available'}
        </p>
        {/* Amenities Icons */}
        <p className="my-2 flex text-sm items-center h-[20px] space-x-2">
          {meta.wifi && (
            <span className="flex items-center text-gray-700">
              <FaWifi className="mr-1" />
            </span>
          )}
          {meta.parking && (
            <span className="flex items-center">
              <FaParking className="mr-1" />
            </span>
          )}
          {meta.breakfast && (
            <span className="flex items-center">
              <FaCoffee className="mr-1" />
            </span>
          )}
          {meta.pets && (
            <span className="flex items-center">
              <FaPaw className="mr-1" />
            </span>
          )}
        </p>
        {/* Price and Fees */}
        <div className="block text-xl mt-5 text-custom-dark">
          <p className="flex justify-end font-bold font-petrona text-black">
            ${price} <span className="text-lg text-custom-dark"> / night</span>
          </p>
          <p className="flex text-xs justify-end">including taxes and fees</p>
        </div>
      </div>
      <div className="flex bg-custom-light justify-center">
        <Link
          to={`/venue/${venue.id}`}
          className="text-lg text-custom-deep font-petrona font-semibold m-3 px-4 shadow-xl hover:bg-custom-medium hover:text-white hover:font-bold hover:scale-105 transition-transform duration-200"
        >
          VIEW VENUE
        </Link>
      </div>

      {/* Modal to display the selected image */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={name} className="max-w-[600px] p-4">
        {media && media[selectedImageIndex] && (
          <img
            src={media[selectedImageIndex]?.url}
            alt="Selected Venue"
            className="w-full h-auto object-contain mx-auto"
          />
        )}
      </Modal>
    </div>
  );
}

export default VenueCard;
