import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SimpleVenueCard from '../../Templates/SimpleCard';
import UpdateVenueForm from '../../Forms/UpdateVenue';
import { authFetch } from '../../../api/auth/authFetch';
import { apiUrl } from '../../../api/constants';
import { load } from '../../../storage/load';
import { SlOptions } from 'react-icons/sl';
import Modal from '../../../helpers/Modal';

/**
 * MyVenues component to display and manage user's venues, including updating and deleting venues.
 *
 * @returns {JSX.Element} The rendered component displaying user's venues.
 */
function MyVenues() {
  const { name } = useParams();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [activeOptionsToggle, setActiveOptionsToggle] = useState(null);
  const [activeBookingsToggle, setActiveBookingsToggle] = useState({});

  const token = localStorage.getItem('token');
  const profile = load('user');

  if (!profile) {
    return null;
  }

  /**
   * Fetches the venues of the user from the API and updates the state.
   */
  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      try {
        const response = await authFetch(
          `${apiUrl}/profiles/${profile.name}/venues?_owner=true&_bookings=true`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data && Array.isArray(data.data)) {
          setVenues(data.data);
        } else {
          setError('Venues data is missing in the response.');
        }
      } catch (error) {
        console.error('Error fetching venues:', error);
        setError('An error occurred while fetching venues.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchVenues();
    } else {
      setError('Profile or token is missing.');
      setLoading(false);
    }
  }, [token]);

  /**
   * Opens the modal to update the venue details.
   * 
   * @param {Object} venue - The venue data to update.
   */
  const openModal = (venue) => {
    setModalContent(<UpdateVenueForm venue={venue} />);
    setIsModalOpen(true);
  };

  /**
   * Closes the modal.
   */
  const closeModal = () => setIsModalOpen(false);

  /**
   * Deletes a venue after confirmation and updates the state.
   * 
   * @param {number} venueId - The ID of the venue to be deleted.
   */
  const deleteVenue = async (venueId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this venue?'
    );
    if (confirmed) {
      try {
        const response = await authFetch(`${apiUrl}/venues/${venueId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setVenues((prevVenues) =>
            prevVenues.filter((venue) => venue.id !== venueId)
          );
          alert('Venue deleted successfully!');
        } else {
          alert('Failed to delete venue.');
        }
      } catch (error) {
        console.error('Error deleting venue:', error);
        alert('An error occurred while deleting the venue.');
      }
    }
  };

  /**
   * Toggles the visibility of the venue's options (Update/Delete buttons).
   * 
   * @param {number} venueId - The ID of the venue to toggle the options for.
   */
  const toggleOptionsMenu = (venueId) => {
    setActiveOptionsToggle((prev) => (prev === venueId ? null : venueId));
  };

  /**
   * Toggles the visibility of the venue's bookings menu.
   * 
   * @param {number} venueId - The ID of the venue to toggle bookings for.
   */
  const toggleBookingsMenu = (venueId) => {
    setActiveBookingsToggle((prev) => ({
      ...prev,
      [venueId]: !prev[venueId],
    }));
  };

  if (loading) {
    return <p>Loading venues...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="row justify-content-between m-4 p-4">
      <div>
        <h2 className="text-2xl text-custom-deep font-bold mb-4 font-prata uppercase">
          My Venues
        </h2>
        <div className="venue-list flex overflow-x-auto gap-5 h-full">
          {venues.length > 0 ? (
            venues.map((venue) => (
              <div
                key={venue.id}
                className="venue-item p-0 border rounded-md relative bg-custom-light flex-shrink-0 w-[250px] h-full flex flex-col justify-between"
              >
                <div className="relative flex justify-end items-center">
                  {/* Update/Delete Toggle */}
                  <button
                    onClick={() => toggleOptionsMenu(venue.id)}
                    className="bg-custom-deep text-white py-2 px-4 rounded-full m-2"
                  >
                    <SlOptions />
                  </button>
                  {activeOptionsToggle === venue.id && (
                    <div className="absolute font-petrona text-end border border-2 border-custom-deep w-full bg-white border rounded shadow-md mt-[130px] z-[99]">
                      <button
                        onClick={() => {
                          openModal(venue);
                          setActiveOptionsToggle(null);
                        }}
                        className="block w-full text-right px-4 py-2 uppercase hover:bg-custom-deep hover:text-white"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => deleteVenue(venue.id)}
                        className="block w-full text-right px-4 py-2 uppercase font-bold hover:bg-custom-deep hover:text-white"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  {/* Venue Card */}
                  <SimpleVenueCard venue={venue} pageType="profile" />
                  <button
                    onClick={() => toggleBookingsMenu(venue.id)}
                    className="flex mx-auto font-petrona font-semibold border-b-4 border-custom-deep text-custom-dark uppercase my-6 p-1"
                  >
                    {`Bookings (${venue.bookings ? venue.bookings.length : 0})`}
                  </button>

                  {/* Bookings List */}
                  {activeBookingsToggle[venue.id] && (
                    <div className="bookings-list bg-white p-4 mt-2 rounded shadow-md justify-center">
                      {venue.bookings && venue.bookings.length > 0 ? (
                        <ul>
                          {venue.bookings.map((booking) => (
                            <li
                              key={booking.id}
                              className="border-b border-custom-medium py-2 font-petrona text-xs text-custom-deep"
                            >
                              <p className="flex justify-between font-semibold uppercase">
                                <strong>Name:</strong> {booking.customer.name}
                              </p>
                              <p className="flex justify-between">
                                <strong>Email:</strong> {booking.customer.email}
                              </p>
                              <p className="flex justify-between">
                                <strong>Guests:</strong> {booking.guests}
                              </p>
                              <p className="flex justify-between">
                                <strong>From:</strong>{' '}
                                {new Date(
                                  booking.dateFrom
                                ).toLocaleDateString()}
                              </p>
                              <p className="flex justify-between">
                                <strong>To:</strong>{' '}
                                {new Date(booking.dateTo).toLocaleDateString()}
                              </p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="font-petrona text-custom-dark text-lg text-center">
                        No bookings at this venue at the moment.                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className='font-petrona font-semibold text-custom-deep uppercase'>
              * You have no venues at the moment.           
            </p>
          )}
        </div>
      </div>
      <Modal title="Update Venue" isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

export default MyVenues;
