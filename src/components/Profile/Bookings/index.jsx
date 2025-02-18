import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useApi from '../../../api/getApi';
import { apiUrl } from '../../../api/constants';
import { formatDate } from '../../../helpers/FormatDate';
import { calculateTotalPrice } from '../../../helpers/TotalPrice';
import { authFetch } from '../../../api/auth/authFetch';
import { load } from '../../../storage/load';
import Modal from '../../../helpers/Modal';

/**
 * BookingPage component handles the venue booking process, including date selection, 
 * guest count, and total price calculation. It interacts with an API to create bookings 
 * and displays a confirmation modal upon successful booking.
 *
 * @component
 * @example
 * return (
 *   <BookingPage />
 * )
 */
function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: venue,
    isLoading,
    isError,
  } = useApi(`${apiUrl}/venues/${id}?_owner=true&_bookings=true`);

  // Retrieve token and user profile (if logged in)
  const token = localStorage.getItem('token');
  const profile = load('user');
  const userId = profile ? profile.name : null;

  const [dates, setDates] = useState([null, null]);
  const [guests, setGuests] = useState(1);
  const [bookingError, setBookingError] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [totalNights, setTotalNights] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal state

  /**
   * Updates total nights and price when dates change.
   *
   * @function
   * @param {Array} dates - An array containing the selected start and end dates.
   */
  useEffect(() => {
    if (dates[0] && dates[1]) {
      const nights = Math.ceil((dates[1] - dates[0]) / (1000 * 60 * 60 * 24));
      setTotalNights(nights);

      const price = calculateTotalPrice(dates[0], dates[1], venue?.price || 0);
      setTotalPrice(price);
    }
  }, [dates, venue]);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !venue) return <div>Venue not found!</div>;

  const { name, price, maxGuests, media, bookings, location } = venue;

  /**
   * Handles the selection of dates and resets booking errors.
   *
   * @function
   * @param {Array} date - The selected start and end dates.
   */
  const handleDateChange = (date) => {
    setDates(date);
    setBookingError('');
  };

  /**
   * Submits the booking request, showing an alert to confirm the details before proceeding.
   *
   * @function
   */
  const handleBookingSubmit = async () => {
    const [dateFrom, dateTo] = dates;
    if (!dateFrom || !dateTo) {
      setBookingError('Please select dates (& guests).');
      return;
    }

    const confirmBooking = window.confirm(
      `Are you sure you want to book this venue from ${formatDate(dateFrom)} to ${formatDate(dateTo)} for ${guests} guest(s)?`
    );
    if (confirmBooking) {
      handleConfirmBooking(dateFrom, dateTo);
    }
  };

  /**
   * Confirms the booking by sending the booking data to the API.
   *
   * @function
   * @param {Date} dateFrom - The start date for the booking.
   * @param {Date} dateTo - The end date for the booking.
   */
  const handleConfirmBooking = async (dateFrom, dateTo) => {
    try {
      const response = await authFetch(`${apiUrl}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateFrom: dateFrom.toISOString(),
          dateTo: dateTo.toISOString(),
          guests,
          venueId: id,
        }),
      });

      if (response.ok) {
        setBookingDetails({
          media: media || [],
          dateFrom: formatDate(dateFrom),
          dateTo: formatDate(dateTo),
          totalPrice,
        });

        setIsModalOpen(true);  
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.errors[0]?.message || 'An error occurred';
        setBookingError(errorMessage);
      }
    } catch (error) {
      setBookingError(error.message);
    }
  };

  // Prevent owners from booking their own venue
  if (venue.owner.name === userId) {
    return (
      <div className="text-center mt-10 pb-4">
        <h1 className="font-play text-base p-4 font-bold border-t ">
          You cannot book your own venue.
        </h1>
        <div className="block mb-4">
          <button
            onClick={() => navigate('/profile')}
            className="w-64 font-petrona mt-5 sm:mr-5 md:mr-0 bg-custom-dark text-white font-semibold uppercase px-4 py-2 hover:bg-custom-dark hover:text-white hover:font-bold"
          >
            Go to Profile
          </button>
          <button
            onClick={() => navigate('/venues')}
            className="w-64 font-petrona mt-5 bg-custom-dark text-white font-semibold uppercase px-4 py-2 hover:bg-custom-dark hover:text-white hover:font-bold"
          >
            Go to Venues
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page font-petrona flex flex-wrap justify-evenly bg-custom-light border-t border-3 border-custom-medium">
      <div className="date-picker-container flex w-full mx-auto justify-evenly py-3 mt-4 bg-custom-medium">
        <label className="text-base text-white font-bold font-play mt-1 uppercase">
          Select dates
        </label>
        <DatePicker
          selected={dates[0]}
          onChange={handleDateChange}
          startDate={dates[0]}
          endDate={dates[1]}
          selectsRange
          minDate={new Date()}
          dateFormat="dd.MM.yyyy"
          placeholderText="Select Dates"
          className="date-picker-input text-xs sm:text-sm w-full px-6 py-2 mx-auto text-center border border-custom-deep rounded-md"
        />
      </div>
      <div className="block w-full sm:max-w-[370px] p-5 text-sm uppercase">
        <section className="block sm:pe-3">
          <div className="block">
            <div className="flex justify-between w-full my-3 pt-2 bg-custom-light border-b-2 border-custom-dark">
              <h3>From:</h3>
              {dates[0] && (
                <div className="selected-dates font-semibold text-base">
                  <p>{formatDate(dates[0])}</p>
                </div>
              )}
            </div>

            <div className="flex justify-between w-full my-3 pt-2 bg-custom-light border-b-2 border-custom-dark">
              <h3>To:</h3>
              {dates[1] && (
                <div className="selected-dates font-semibold text-base">
                  <p>{formatDate(dates[1])}</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between w-full my-3 pt-2 bg-custom-light border-b-2 border-custom-dark">
            <h3 className="mt-2">Total Nights:</h3>
            <div className="font-semibold text-base">
              <p>
                {totalNights} {totalNights === 1 ? 'night' : 'nights'}
              </p>
            </div>
          </div>
          <div className="guests-container flex justify-between w-full my-3 pt-2 bg-custom-light border-b-2 border-custom-dark">
            <h3 className="mt-2">Number of Guests:</h3>
            <div className="flex items-center border border-3 border-custom-deep">
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-custom-light py-1 px-5 font-semibold text-base"
              >
                {[...Array(maxGuests).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-between text-lg w-full font-black my-5 py-2 bg-custom-light border-b-2 border-custom-dark rounded-none">
            <h3 className="mt-2 ">Total Price:</h3>
            {dates[0] && dates[1] && (
              <div className="total-price text-lg">
                <p>${totalPrice}</p>
              </div>
            )}
          </div>
        </section>
        {bookingError && (
          <div className="error-message capitalize border-4 border-custom-deep text-custom-deep font-semibold p-2">
            **{bookingError}
          </div>
        )}
        <div className="flex m-auto justify-center uppercase text-xl pt-5">
          {token ? (
            <button
              onClick={handleBookingSubmit}
              className="book-now-btn bg-white uppercase font-extrabold border border-4 border-custom-deep px-3 hover:bg-custom-deep hover:text-white rounded"
            >
              Book this venue
            </button>
          ) : (
            <Link to="/login">
              <p className="login-required-btn text-center uppercase border border-4 border-custom-deep px-3 rounded">
                Log in to book
              </p>
            </Link>
          )}
        </div>
      </div>
      
      {/* Modal for Confirmation */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Confirm Your Booking">
        <div className="flex flex-col justify-between font-petrona">
          <img src={bookingDetails?.media[0]?.url} alt="Venue" className="w-full h-36 object-cover mb-4" />
          <div className="mb-4 justify-between px-6 text-white uppercase">
            <p className='flex justify-between'><strong>From:</strong> {bookingDetails?.dateFrom}</p>
            <p className='flex justify-between'><strong>To:</strong> {bookingDetails?.dateTo}</p>
            <p className='flex justify-between'><strong>Guests:</strong> {guests} {guests === 1 ? 'guest' : 'guests'}</p>
            <p className='flex justify-center font-bold text-xl my-4'><strong className='mr-3 font-semibold'>Total Price:</strong> ${bookingDetails?.totalPrice}</p>
          </div>
          <button
            onClick={() => {
              navigate('/profile');
              setIsModalOpen(false); 
            }}
            className="confirm-booking-btn mx-6 my-2 border-b-4 border-custom-light hover:bg-custom-medium font-bold text-white hover:text-black uppercase px-6 py-2 rounded"
          >
            Confirm and Go to Profile
          </button>
        </div>
      </Modal>
    </div>
  );
}


export default BookingPage;
