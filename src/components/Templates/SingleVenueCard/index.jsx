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
            src={media?.[currentImageIndex]?.url || '/FallbackImg.jpg'}
            alt={media?.[currentImageIndex]?.alt || 'Venue image'}
            className="w-full h-[300px] object-cover mb-4"
            onClick={() =>
              openImageModal(
                media?.[currentImageIndex]?.url || '/FallbackImg.jpg',
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
              <IoLocationSharp className="text-lg md:text-xl mr-1 -ms-1 mt-1" />
              {location.city && location.country
                ? `${location.city}, ${location.country}`
                : 'Location not available'}
            </p>
            <p className="mb-3 p-2 text-xl md:text-2xl font-petrona font-semibold">
              ${price} <span className="text-sm">/ night</span>
            </p>
            <p className="flex ms-2 -mt-3 mb-3 font-petrona">
              {' '}
              <GoPeople />{' '}
              <span className="text-sm md:text-base text-custom-deep px-1">
                Max <strong>{maxGuests}</strong> guest(s)
              </span>
            </p>

            <div className="font-petrona my-4">
              <h3 className="font-bold uppercase bg-custom-light px-2">
                Facilities
              </h3>
              <p className="my-1 flex items-center p-2 text-lg">
                {meta.wifi && (
                  <span className="flex items-center text-custom-deep">
                    <FaWifi className="mr-3" />
                  </span>
                )}
                {meta.parking && (
                  <span className="flex items-center text-custom-deep">
                    <FaParking className="mr-3" />
                  </span>
                )}
                {meta.breakfast && (
                  <span className="flex items-center text-custom-deep">
                    <FaCoffee className="mr-3" />
                  </span>
                )}
                {meta.pets && (
                  <span className="flex items-center text-custom-deep">
                    <FaPaw className="mr-3" />
                  </span>
                )}
              </p>
            </div>
            {/* Description */}
            <div className="font-petrona my-3 md:min-h-[250px]">
              <h3 className="font-semibold uppercase bg-custom-light px-2">
                Description
              </h3>
              <p className="my-1 p-2 text-base">{description}</p>
            </div>

            <div className="block text-xs md:text-sm p-2 sm:mt-9 font-petrona mb-3">
              <p className="my-2 uppercase">
                <strong>Bookings:</strong> {_count.bookings || 0}
              </p>
              <p className="my-2 uppercase -mt-2">
                <strong>Created:</strong> {formatDate(created)}
              </p>
              <p className="my-2 uppercase -mt-2">
                <strong>Updated:</strong> {formatDate(updated)}
              </p>
            </div>
          </div>

          <div className="sm:bg-custom-light sm:m-4">
            {/* Owner section */}
            <div className="block w-full font-petrona border-t border-3 border-custom-light my-3 sm:m-3 md:min-w-[320px]">
              <h3 className="uppercase font-bold text-black bg-custom-light sm:me-3 mb-3 px-2">
                Hosted by
              </h3>
              <div className="flex items-center sm:px-2">
                <div className="-mt-2 p-2">
                  <img
                    src={owner.avatar?.url || '/defaultAvatar.jpg'}
                    alt={owner.avatar?.alt || 'Owner avatar'}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </div>
                <div className="text-sm p-2">
                  <h4 className="uppercase font-semibold text-sm text-custom-deep">
                    {/* Make the owner's name a clickable link */}
                    <a
                      href={`/profiles/${owner.name}`}
                      className="text-custom-deep hover:underline"
                    >
                      {owner.name || 'Unknown Owner'}
                    </a>
                  </h4>
                  <p className="text-custom-dark">
                    {owner.email || 'No email provided'}
                  </p>
                </div>
              </div>
            </div>

            {/* SECOND SECTION */}
            <section className="sm:bg-custom-light sm:w-full">
              <BookingPage />
            </section>
          </div>
        </div>
      </div>

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
