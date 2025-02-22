import React, { useState, useEffect, useRef } from 'react';
import { authFetch } from '../../../api/auth/authFetch';
import { apiUrl } from '../../../api/constants';
import { load } from '../../../storage/load';
import VenueBookingCard from '../../Templates/BookingVenueCard';

/**
 * Component for displaying user's bookings.
 * Fetches bookings from the API and allows users to cancel them.
 * Provides horizontal scrolling functionality for bookings.
 */
function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const profile = load('user');
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (!profile || !profile.name) {
      setError('User profile not found');
      setLoading(false);
      return;
    }

    /**
     * Fetches bookings for the authenticated user.
     */
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await authFetch(
          `${apiUrl}/profiles/${profile.name}/bookings?_customer=true&_venue=true`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setBookings(data.data || []);
        } else {
          throw new Error(data.message || 'Failed to fetch bookings');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [profile?.name, token]);

  /**
   * Handles the deletion of a booking.
   * @param {string} bookingId - The ID of the booking to delete.
   */
  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      const response = await authFetch(`${apiUrl}/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
        window.alert('Your cancellation has been successfully processed.');
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to cancel booking');
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  /**
   * Scrolls the booking container left or right.
   * @param {string} direction - The direction to scroll ('left' or 'right').
   */
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += direction === 'left' ? -240 : 240;
    }
  };

  if (loading) return <p>Loading your bookings...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="relative m-4 p-4 pb-10">
      <h2 className="text-2xl text-custom-deep font-bold mb-4 font-prata uppercase">
        My Bookings
      </h2>
      {bookings.length > 0 ? (
        <div className="relative overflow-hidden">
          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-4 overflow-y-scroll h-full scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200"
          >
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white min-w-[250px]">
                <VenueBookingCard booking={booking} />
                <div className="flex justify-center p-3">
                  <button
                    onClick={() => handleDeleteBooking(booking.id)}
                    className="px-4 py-1 border-b-4 border-custom-medium font-play font-bold text-sm uppercase text-center text-custom-deep rounded hover:bg-custom-dark hover:text-white"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="font-petrona font-semibold text-custom-dark uppercase mb-4">
          * There are no bookings at the moment *
        </p>
      )}
      {bookings.length > 0 && (
        <>
          {/* Left Scroll Button */}
          <button
            className="absolute mt-[30px] text-4xl text-custom-deep left-20 lg:left-60 top-2/2 transform -translate-y-2/2 pb-1 px-2 rounded-full shadow-md hover:bg-custom-medium hover:text-white"
            onClick={() => scroll('left')}
          >
            ❮
          </button>

          {/* Right Scroll Button */}
          <button
            className="absolute mt-[30px] text-4xl text-custom-deep right-20 lg:right-60 top-2/2 transform -translate-y-2/2 pb-1 px-2 rounded-full shadow-md hover:bg-custom-medium hover:text-white"
            onClick={() => scroll('right')}
          >
            ❯
          </button>
        </>
      )}
    </div>
  );
}

export default MyBookings;
