import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import SimpleVenueCard from '../../Templates/SimpleCard';
import UpdateVenueForm from '../../Forms/UpdateVenue';
import { authFetch } from '../../../api/auth/authFetch';
import { apiUrl } from '../../../api/constants';
import { load } from '../../../storage/load';
import { SlOptions } from 'react-icons/sl';
import Modal from '../../../helpers/Modal';

function MyVenues() {
  const { name } = useParams();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [activeOptionsToggle, setActiveOptionsToggle] = useState(null);
  const [activeBookingsToggle, setActiveBookingsToggle] = useState({});
  const scrollContainerRef = useRef(null);

  const token = localStorage.getItem('token');
  const profile = load('user');

  if (!profile) return null;

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

  const openModal = (venue) => {
    setModalContent(<UpdateVenueForm venue={venue} />);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const deleteVenue = async (venueId) => {
    if (!window.confirm('Are you sure you want to delete this venue?')) return;
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
  };

  const toggleOptionsMenu = (venueId) => {
    setActiveOptionsToggle((prev) => (prev === venueId ? null : venueId));
  };

  const toggleBookingsMenu = (venueId) => {
    setActiveBookingsToggle((prev) => ({
      ...prev,
      [venueId]: !prev[venueId],
    }));
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  if (loading) return <p>Loading venues...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="row justify-content-between m-4 p-4 pb-[60px]">
      <h2 className="text-2xl text-custom-deep font-bold mb-4 font-prata uppercase">
        My Venues
      </h2>
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="venue-list flex overflow-x-auto gap-5 h-full scrollbar-hide"
        >
          {venues.length > 0 ? (
            venues.map((venue) => (
              <div
                key={venue.id}
                className="venue-item p-0 border rounded-md relative bg-custom-light flex-shrink-0 w-[250px] h-full flex flex-col justify-between"
              >
                <div className="relative flex justify-end items-center">
                  <button
                    onClick={() => toggleOptionsMenu(venue.id)}
                    className="bg-custom-deep text-white py-2 px-4 rounded-full m-2"
                  >
                    <SlOptions />
                  </button>
                  {activeOptionsToggle === venue.id && (
                    <div className="absolute right-0 border border-custom-deep w-40 bg-white rounded shadow-md mt-2 z-50">
                      <button
                        onClick={() => {
                          openModal(venue);
                          setActiveOptionsToggle(null);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-custom-deep hover:text-white"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => deleteVenue(venue.id)}
                        className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-600 hover:text-white"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                <SimpleVenueCard venue={venue} pageType="profile" />

                <button
                  onClick={() => toggleBookingsMenu(venue.id)}
                  className="mx-auto border-b-4 border-custom-deep text-custom-dark uppercase my-6 p-1"
                >
                  {`Bookings (${venue.bookings ? venue.bookings.length : 0})`}
                </button>

                {activeBookingsToggle[venue.id] && (
                  <div className="bookings-list bg-white p-4 mt-2 rounded shadow-md">
                    {venue.bookings && venue.bookings.length > 0 ? (
                      <ul>
                        {venue.bookings.map((booking) => (
                          <li
                            key={booking.id}
                            className="border-b border-custom-medium py-2 text-xs text-custom-deep"
                          >
                            <p>
                              <strong>Name:</strong> {booking.customer.name}
                            </p>
                            <p>
                              <strong>Email:</strong> {booking.customer.email}
                            </p>
                            <p>
                              <strong>Guests:</strong> {booking.guests}
                            </p>
                            <p>
                              <strong>From:</strong>{' '}
                              {new Date(booking.dateFrom).toLocaleDateString()}
                            </p>
                            <p>
                              <strong>To:</strong>{' '}
                              {new Date(booking.dateTo).toLocaleDateString()}
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No bookings at this venue at the moment.</p>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>You have no venues at the moment.</p>
          )}
        </div>
        <button
        className="absolute mt-[30px] text-4xl text-custom-deep left-40 top-2/2 transform -translate-y-2/2 py-1 px-2 rounded-full shadow-md hover:bg-custom-medium hover:text-white"
        onClick={() => scroll('left')}
        >
          ❮
        </button>
        <button
        className="absolute mt-[30px] text-4xl text-custom-deep right-40 top-2/2 transform -translate-y-2/2 py-1 px-2 rounded-full shadow-md hover:bg-custom-medium hover:text-white"
        onClick={() => scroll('right')}
        >
          ❯
        </button>
      </div>

      <Modal title="Update Venue" isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

export default MyVenues;
