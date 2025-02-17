import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * VenueBookingCard component displays the details of a booking, including media, venue name,
 * booking dates, guests, and the calculated total price.
 * It also supports image navigation for the venue media.
 *
 * @component
 * @example
 * const booking = {
 *   venue: {
 *     id: '1',
 *     name: 'Venue Name',
 *     media: [
 *       { url: 'image1.jpg', alt: 'Image 1' },
 *       { url: 'image2.jpg', alt: 'Image 2' }
 *     ],
 *     price: 100
 *   },
 *   dateFrom: '2025-01-01',
 *   dateTo: '2025-01-10',
 *   guests: 4,
 *   created: '2025-01-01T12:00:00Z'
 * };
 * 
 * <VenueBookingCard booking={booking} />
 * 
 * @param {Object} booking - The booking data object.
 * @param {Object} booking.venue - The venue associated with the booking.
 * @param {string} booking.venue.id - The unique identifier of the venue.
 * @param {string} booking.venue.name - The name of the venue.
 * @param {Array} booking.venue.media - The media associated with the venue (images).
 * @param {string} booking.venue.media.url - The URL of the media.
 * @param {string} booking.venue.media.alt - The alt text for the media.
 * @param {number} booking.venue.price - The price per day of the venue.
 * @param {string} booking.dateFrom - The start date of the booking.
 * @param {string} booking.dateTo - The end date of the booking.
 * @param {number} booking.guests - The number of guests in the booking.
 * @param {string} booking.created - The creation date of the booking.
 *
 * @returns {JSX.Element} The rendered component.
 */
function VenueBookingCard({ booking }) {
  if (!booking || !booking.venue) {
    return <p>No venue details available.</p>;
  }

  const { venue } = booking;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  /**
   * Handles the image navigation to the next image.
   */
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % venue.media.length);
  };

  /**
   * Handles the image navigation to the previous image.
   */
  const handlePreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + venue.media.length) % venue.media.length
    );
  };

  // Calculate total price based on the number of days
  const dateFrom = new Date(booking.dateFrom);
  const dateTo = new Date(booking.dateTo);
  const totalDays = (dateTo - dateFrom) / (1000 * 3600 * 24); // Calculate number of days
  const totalPrice = totalDays * venue.price; // Use venue.price here

  return (
    <div className="m-auto max-w-[250px] shadow-xl bg-white font-petrona text-lg">
      {/* Media Section */}
      <div className="booking-media relative">
        {venue.media && venue.media.length > 0 ? (
          <div className="relative w-[250px]">
            <img
              src={venue.media[currentImageIndex].url}
              alt={venue.media[currentImageIndex].alt || 'Venue Image'}
              className="media-image w-full h-48 rounded-lg object-cover"
            />
            {/* Arrows for navigation */}
            {venue.media.length > 1 && (
              <>
                <button
                  onClick={handlePreviousImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-custom-dark text-white p-2 rounded-full"
                >
                  ❮
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-custom-dark text-white p-2 rounded-full"
                >
                  ❯
                </button>
              </>
            )}
          </div>
        ) : (
          <p>No media available</p>
        )}
      </div>
      {/* Booking Header */}
      <div className="flex border-b border-5 border-custom-medium mb-4 mx-2">
        <Link
          to={`/venue/${venue.id}`}
          className="font-prata text-custom-dark py-2 overflow-hidden truncate hover:text-custom-deep"
        >
          {booking.venue.name}
        </Link>
      </div>
      {/* Booking Details */}
      <div className="booking-details text-sm p-4 uppercase">
        <p className="flex justify-between">
          <strong>From:</strong>{' '}
          {dateFrom.toLocaleDateString()}
        </p>
        <p className="flex justify-between">
          <strong>To:</strong> {dateTo.toLocaleDateString()}
        </p>
        <p className="flex justify-between">
          <strong>Guests:</strong> {booking.guests}
        </p>
        <p className="flex justify-between">
          <strong>Created On:</strong>{' '}
          {new Date(booking.created).toLocaleDateString()}
        </p>
      </div>
      {/* Total Price */}
      <p className="flex justify-between px-4 py-2 uppercase font-bold text-custom-dark text-xl">
        <strong className='mr-4 font-semibold'>Total Price:</strong> ${totalPrice.toFixed(0)}
      </p>
    </div>
  );
}

export default VenueBookingCard;
