import React, { useState, useEffect } from 'react';
import { GoPlus } from 'react-icons/go';
import { MdDeleteForever } from 'react-icons/md';
import { authFetch } from '../../../api/auth/authFetch';
import { apiUrl } from '../../../api/constants';

/**
 * UpdateVenueForm component renders a form for updating venue details.
 *
 * @param {Object} props - The props passed to the component.
 * @param {Object} props.venue - The venue object containing initial data for the form.
 * @param {function} props.onSubmit - Callback function triggered after form submission.
 *
 * @returns {JSX.Element} A form for updating venue details.
 */
function UpdateVenueForm({ venue, onSubmit }) {
  /**
   * State to hold the form data.
   * @type {Object}
   */
  const [formData, setFormData] = useState({
    name: venue?.name || '',
    description: venue?.description || '',
    price: venue?.price || '',
    rating: venue?.rating || '',  
    maxGuests: venue?.maxGuests || '',
    city: venue?.location?.city || '',
    country: venue?.location?.country || '',
    wifi: venue?.meta?.wifi || false,
    parking: venue?.meta?.parking || false,
    pets: venue?.meta?.pets || false,
    breakfast: venue?.meta?.breakfast || false,
    media: venue?.media || [{ url: '', alt: '' }],
  });

  /**
   * Update formData when the venue prop changes.
   */
  useEffect(() => {
    if (venue) {
      setFormData({
        name: venue.name || '',
        description: venue.description || '',
        price: venue.price || '',
        rating: venue.rating || '',
        maxGuests: venue.maxGuests || '',
        city: venue.location?.city || '',
        country: venue.location?.country || '',
        wifi: venue.meta?.wifi ?? false,
        parking: venue.meta?.parking ?? false,
        pets: venue.meta?.pets ?? false,
        breakfast: venue.meta?.breakfast ?? false,
        media: venue.media || [{ url: '', alt: '' }],
      });
    }
  }, [venue]);

  const token = localStorage.getItem('token');

  /**
   * Prepares the request data based on the form input.
   * @type {Object}
   */
  const requestData = {
    name: formData.name,
    description: formData.description,
    price: formData.price,
    rating: formData.rating, 
    maxGuests: formData.maxGuests,
    media: formData.media.map((item) => ({
      url: item.url,
      alt: item.alt || formData.name + ' image',
    })),
    meta: {
      wifi: formData.wifi,
      parking: formData.parking,
      pets: formData.pets,
      breakfast: formData.breakfast,
    },
    location: {
      city: formData.city,
      country: formData.country,
    },
  };

  /**
   * Handles form field changes.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - The event object from the input field.
   */
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : name === 'rating' ? parseInt(value, 10) || '' : value,
    }));
  };

  /**
   * Handles form submission and sends the updated venue data to the API.
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    let price = formData.price.toString().replace(/\s+/g, '').replace(',', '.');
    price = parseFloat(price);
    if (isNaN(price) || price <= 0) {
      alert('Please enter a valid price.');
      return;
    }

    const maxGuests = parseInt(formData.maxGuests, 10);
    if (isNaN(maxGuests) || maxGuests <= 0) {
      alert('Please enter a valid number of guests.');
      return;
    }

    const updatedRequestData = { ...requestData, price, maxGuests };

    try {
      const response = await authFetch(`${apiUrl}/venues/${venue.id}?_owner=true&_bookings=true`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedRequestData),
      });

      const result = await response.json();
      console.log(result);

      window.location.reload();
      onSubmit(formData);
    } catch (error) {
      console.error('Error updating venue:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="font-petrona uppercase space-y-5 max-w-lg mx-auto p-4 bg-custom-light rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label className="block font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Add name of venue"
          className="w-full bg-custom-light px-3 py-2 border-b-2 border-custom-dark rounded-none"
          required
        />
      </div>
      <div className="mb-4">
        <label className="flex text-left text-m uppercase">City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Add your city (Optional)"
          className="w-full bg-custom-light px-3 py-2 border-b-2 border-custom-dark rounded-none"
        />
      </div>

      <div className="mb-4">
        <label className="flex text-left text-m uppercase">Country</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Add your country (Optional)"
          className="w-full bg-custom-light px-3 py-2 border-b-2 border-custom-dark rounded-none"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add venue descriptions"
          className="w-full bg-custom-light px-3 py-2 border-b-2 border-custom-dark rounded-none"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Add price (Day)"
          className="w-full bg-custom-light px-3 py-2 border-b-2 border-custom-dark rounded-none"
          required
          min="0"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Max Guests</label>
        <input
          type="number"
          name="maxGuests"
          value={formData.maxGuests}
          onChange={handleChange}
          placeholder="Add max guests"
          className="w-full bg-custom-light px-3 py-2 border-b-2 border-custom-dark rounded-none"
          required
          min="1"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Rating</label>
        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          className="w-full bg-custom-light px-3 py-2 border-b-2 border-custom-dark rounded-none"
          required
        >
          <option value="">Select Rating</option>
          {[...Array(6).keys()].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium">Amenities</label>
        <div className="flex flex-wrap capitalize m-3 justify-between">
          <label className="flex items-center mr-4">
            <input
              type="checkbox"
              name="wifi"
              checked={formData.wifi}
              onChange={handleChange}
              className="mr-2"
            />
            Wi-Fi
          </label>
          <label className="flex items-center mr-4">
            <input
              type="checkbox"
              name="parking"
              checked={formData.parking}
              onChange={handleChange}
              className="mr-2"
            />
            Parking
          </label>
          <label className="flex items-center mr-4">
            <input
              type="checkbox"
              name="pets"
              checked={formData.pets}
              onChange={handleChange}
              className="mr-2"
            />
            Pets
          </label>
          <label className="flex items-center mr-4">
            <input
              type="checkbox"
              name="breakfast"
              checked={formData.breakfast}
              onChange={handleChange}
              className="mr-2"
            />
            Breakfast
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="text-left text-m uppercase">Media</label>
        {formData.media.map((media, index) => (
          <div key={index} className="mb-2">
            {media.url && (
              <div className="relative">
                <img
                  src={media.url}
                  alt={media.alt || formData.name + ' image'}
                  className="w-3/4 h-28 object-cover mb-2 rounded"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newMedia = [...formData.media];
                    newMedia.splice(index, 1);
                    setFormData({ ...formData, media: newMedia });
                  }}
                  className="absolute text-3xl top-10 right-4 text-black hover:text-custom-dark px-2 rounded-full"
                >
                  <MdDeleteForever />
                </button>
              </div>
            )}

            <input
              type="text"
              placeholder="Image URL"
              value={media.url}
              onChange={(e) => handleMediaChange(index, 'url', e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            setFormData({
              ...formData,
              media: [...formData.media, { url: '', alt: '' }],
            })
          }
          className="flex pt-1 text-sm text-black underline"
        >
          <GoPlus /> <span className="-mt-1">Add Media</span>
        </button>
      </div>

      <button
        type="submit"
        className="bg-custom-deep flex m-auto text-center text-white font-semibold px-4 py-1 uppercase"
      >
        Update Venue
      </button>
    </form>
  );
}

export default UpdateVenueForm;
