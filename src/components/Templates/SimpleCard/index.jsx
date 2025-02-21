import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundForward } from 'react-icons/io';
import Modal from '../../../helpers/Modal';

/**
 * A card component that displays a simple venue with its image, price, and amenities.
 * It includes functionality for viewing images in a modal and navigating between them.
 * 
 * @param {Object} props - The component's props.
 * @param {Object} props.venue - The venue object containing details like name, location, media, and price.
 * @param {string} props.pageType - The type of page that determines the width of the card (e.g., 'profile').
 * 
 * @returns {JSX.Element} - The rendered component.
 */
function SimpleVenueCard({ venue, pageType }) {
  const { name, location, media, price } = venue;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  /**
   * Opens the image modal and sets the selected image index.
   * @param {number} index - The index of the image to be displayed.
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
   */
  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? media.length - 1 : prevIndex - 1
    );
  };

  /**
   * Navigates to the next image in the media array.
   */
  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === media.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Dynamic width based on pageType
  const cardWidth = pageType === 'profile' ? 'w-[250px] max-w-[250px]' : 'w-[150px] md:w-[220px] lg:w-[150px]';

  return (
    <div className={`m-auto w-full ${cardWidth} shadow-xl bg-white p-0 m-0`}>
      {/* Venue Image */}
      <div className="relative">
        <img
          src={media?.[selectedImageIndex]?.url || '/FallbackImg.jpg'}
          alt={media?.[selectedImageIndex]?.alt || 'Venue image'}
          className={`${cardWidth} h-32 object-cover mb-1 cursor-pointer`}
          onClick={() => openImageModal(selectedImageIndex)}
        />

        {/* Arrows for image navigation */}
        {media && media.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-custom-light/40 hover:bg-custom-dark/90 p-2 rounded text-custom-deep hover:text-white text-4xl"
              >
              ❮
            </button>
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-custom-light/40 hover:bg-custom-dark/90 p-2 rounded text-custom-deep hover:text-white text-4xl"
              >
              ❯
            </button>
          </>
        )}
      </div>

      <div className={`p-3 font-petrona ${cardWidth} w-full`}>
        {/* Venue Name */}
        <div className="flex justify-between border-b border-5 border-custom-medium mb-2">
          <h2 className="flex text-base font-prata font-semibold text-custom-deep overflow-hidden truncate">
            {name}
          </h2>
        </div>
        {/* Price and Amenities */}
        <div className="block text-xl mt-2 text-custom-dark">
          <p className="flex justify-left font-bold text-lg font-petrona text-black">
            ${price}{' '}
            <span className="text-base text-custom-dark mt-1"> / night</span>
          </p>
          <p className="flex text-xs justify-left">including taxes and fees</p>
        </div>
      </div>
      <div className="flex bg-custom-light justify-end">
        <Link
          to={`/venue/${venue.id}`}
          className="flex text-base text-custom-deep font-petrona font-semibold m-1 px-1 shadow-xl hover:text-custom-medium hover:font-bold hover:scale-105 transition-transform duration-200"
        >
          VIEW VENUE{' '}
          <span className="m-1">
            <IoMdArrowRoundForward />
          </span>
        </Link>
      </div>

      {/* Modal to display the selected image */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={name}>
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

export default SimpleVenueCard;
