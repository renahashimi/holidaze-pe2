import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../../../api/getApi';
import { apiUrl } from '../../../api/constants';
import { FaWifi, FaParking, FaCoffee, FaPaw, FaStar } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import { GoPeople } from 'react-icons/go';
import Modal from '../../../helpers/Modal';
import BookingPage from '../../Profile/Bookings';
import { formatDate } from '../../../helpers/FormatDate';

/**
 * Component for displaying a single venue page with details, images, owner info, and booking options.
 * @component
 * @returns {JSX.Element} SingleVenuePage component
 */
function SingleVenuePage() {
  const { id } = useParams();
  const {
    data: venue,
    isLoading,
    isError,
  } = useApi(`${apiUrl}/venues/${id}?_owner=true&_bookings=true`);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  console.log('Venues data:', venue);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !venue) return <div>Venue not found!</div>;

  const {
    name,
    media,
    location,
    price,
    maxGuests,
    meta,
    description,
    rating,
    _count,
    owner = {},
    created,
    updated,
  } = venue;

  /**
   * Opens the image modal.
   * @param {string} image - The image URL to display in the modal.
   * @param {number} index - The index of the selected image.
   */
  const openImageModal = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  /**
   * Closes the image modal.
   */
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  /**
   * Navigates to the previous image in the media array.
   */
  const goToPreviousImage = () => {
    const prevIndex =
      currentImageIndex === 0 ? media.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(media[prevIndex]?.url);
  };

  /**
   * Navigates to the next image in the media array.
   */
  const goToNextImage = () => {
    const nextIndex =
      currentImageIndex === media.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(media[nextIndex]?.url);
  };

  return (
    <div className="flex w-full justify-center">
      <div className="m-auto w-full justify-center max-w-[900px] mx-4 shadow-lg">
        {/* Venue Image */}
        <div className="relative w-full shadow-lg">
          <img
            src={media?.[currentImageIndex]?.url || '/public/FallbackImg.jpg'}
            alt={media?.[currentImageIndex]?.alt || 'Venue image'}
            className="w-full h-[300px] object-cover mb-4"
            onClick={() =>
              openImageModal(
                media?.[currentImageIndex]?.url || '/public/FallbackImg.jpg',
                currentImageIndex
              )
            }
          />
          {/* Arrows for navigation */}
          {media?.length > 1 && (
            <>
              <button
                onClick={goToPreviousImage}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white text-3xl z-10"
              >
                &#10094;
              </button>
              <button
                onClick={goToNextImage}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white text-3xl z-10"
              >
                &#10095;
              </button>
            </>
          )}
        </div>
        <div className="flex justify-between border-b border-5 border-custom-medium mb-4 mx-2">
          <h2 className="text-xl font-prata font-bold text-custom-deep sm:ps-3 overflow-hidden truncate">
            {name}
          </h2>
          {/* Star Rating */}
          <div className="flex items-center font-petrona border border-2 border-custom-light mb-3 px-2 py-1 sm:me-3 rounded-full text">
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar
                key={index}
                className={`text-lg ${index < Math.round(rating) ? 'text-yellow-500' : 'text-gray-300'}`}
              />
            ))}
            <span className="font-semibold text-lg mx-2">
              {rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Venue Details */}
        <div className="block md:flex justify-between">
          <div className="md:max-w-[400px] lg:max-w-[450px] w-full sm:ps-3">
            <p className="flex font-petrona text-custom-dark text-lg p-2 -mt-3">
              <IoLocationSharp className="text-lg mr-1 -ms-1 mt-1" />
              {location.city && location.country
                ? `${location.city}, ${location.country}`
                : 'Location not available'}
            </p>
            <p className="mb-2 p-2 text-xl font-petrona font-semibold">
              ${price} <span className="text-sm">/ night</span>
            </p>
          </div>
        </div>
        {/* Booking Section */}
        <section className="sm:bg-custom-light sm:w-full">
          <BookingPage />
        </section>
      </div>
      {/* Modal for Image Preview */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={name}>
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Selected Venue"
            className="w-full max-h-[75vh] object-contain mx-auto"
          />
        )}
      </Modal>
    </div>
  );
}

export default SingleVenuePage;
