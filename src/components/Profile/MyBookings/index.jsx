import React, { useState, useEffect } from 'react';
import { authFetch } from '../../../api/auth/authFetch';
import { apiUrl } from '../../../api/constants';
import { load } from '../../../storage/load';
import VenueBookingCard from '../../Templates/BookingVenueCard';

/**
 * MyBookings component displays the user's bookings and allows for cancellation.
 * It fetches bookings from the API and displays them in cards. Users can cancel their bookings.
 */
function MyBookings() {
  // State to hold the list of bookings, loading status, and error message
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve token from local storage and profile data from storage
  const token = localStorage.getItem('token');
  const profile = load('user');

  /**
   * Fetches the bookings for the user when the component mounts or when profile name or token changes.
   * Updates the state with the fetched bookings or error if something goes wrong.
   */
  useEffect(() => {
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
          setBookings(data.data);
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
  }, [profile.name, token]);

  /**
   * Handles the cancellation of a booking by sending a DELETE request to the API.
   * If successful, updates the state to remove the cancelled booking.
   * 
   * @param {string} bookingId - The ID of the booking to cancel.
   */
  const handleDeleteBooking = async (bookingId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to cancel this booking?'
    );
    if (!confirmDelete) return;

    try {
      const response = await authFetch(`${apiUrl}/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking.id !== bookingId)
        );
        window.alert('Your cancellation has been successfully processed.');
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to cancel booking');
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Render loading state or error state
  if (loading) {
    return <p>Loading your bookings...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="row justify-content-between m-4 p-4">
      <h2 className="text-2xl text-custom-deep font-bold mb-4 font-prata uppercase">
        My Bookings
      </h2>

      {bookings.length > 0 ? (
        <div className="venue-list flex overflow-x-auto gap-5 h-full">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white">
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
      ) : (
        <p className="font-petrona font-semibold text-custom-dark uppercase">
          There are no bookings at the moment.
        </p>
      )}
    </div>
  );
}

export default MyBookings;
