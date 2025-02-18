import React, { useState } from 'react';
import { authFetch } from '../../../api/auth/authFetch';
import { apiUrl } from '../../../api/constants';
import { GoPlus } from 'react-icons/go';
import { MdDeleteForever } from 'react-icons/md';

/**
 * Form component for creating a new venue.
 * @returns {JSX.Element} The CreateVenueForm component.
 */
function CreateVenueForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    rating: '',
    maxGuests: '',
    city: '',
    country: '',
    wifi: false,
    parking: false,
    pets: false,
    breakfast: false,
    media: [{ url: '', alt: '' }],
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Authorization token is missing.');
  }

  /**
   * Handles input changes for text, number, and checkbox fields.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - The event object.
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  /**
   * Handles updates to media inputs.
   * @param {number} index - Index of the media item.
   * @param {string} field - Field name (url or alt).
   * @param {string} value - Updated value.
   */
  const handleMediaChange = (index, field, value) => {
    const updatedMedia = [...formData.media];
    updatedMedia[index][field] = value;
    setFormData({ ...formData, media: updatedMedia });
  };

  /**
   * Handles form submission.
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   */
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    
    const { name, description, price, maxGuests, rating } = formData;
    if (!name || !description || !price || !maxGuests || rating < 0 || rating > 5) {
      setErrorMessage('Please fill in all required fields and ensure rating is between 0 and 5.');
      setLoading(false);
      return;
    }

    const newVenue = {
      name,
      description,
      media: formData.media.filter((media) => media.url.trim()),
      price: Number(formData.price.replace(',', '.')) || 0,
      rating: formData.rating ? parseFloat(formData.rating) : undefined,
      maxGuests: parseInt(maxGuests, 10),
      meta: {
        wifi: formData.wifi,
        parking: formData.parking,
        breakfast: formData.breakfast,
        pets: formData.pets,
      },
      location: {
        city: formData.city || null,
        country: formData.country || null,
      },
    };
    
    try {
      const response = await authFetch(`${apiUrl}/venues`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newVenue),
      });

      if (response.ok) {
        const createdVenue = await response.json();
        console.log('Created Venue:', createdVenue);
        alert('Venue created successfully!');
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(`Failed to create venue: ${errorData.message}`);
        console.error('Error Response:', errorData);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while creating the venue.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form
      onSubmit={handleFormSubmit}
      className="font-petrona space-y-5 max-w-lg mx-auto p-4 bg-custom-light rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label className="flex text-left text-m uppercase">Title</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Add your title (required)"
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
        <label className="flex text-left text-m uppercase">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add your description (required)"
          className="w-full bg-custom-light px-3 py-2 border-b-2 border-custom-dark rounded-none"
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="flex text-left text-m uppercase">Price</label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price per night (required)"
          className="w-full bg-custom-light px-3 py-2 border-b-2 border-custom-dark rounded-none"
          required
        />
      </div>

      <div className="mb-4">
        <label className="flex text-left text-m uppercase">Max Guests</label>
        <input
          type="number"
          name="maxGuests"
          value={formData.maxGuests}
          onChange={handleChange}
          placeholder="Max guests (required)"
          className="w-full bg-custom-light px-3 py-2 border-b-2 border-custom-dark rounded-none"
          required
        />
      </div>

      <div className="mb-4">
        <label className="flex text-left text-m uppercase">Rating</label>
        <select
          name="rating"
          value={formData.rating}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, rating: parseFloat(e.target.value) }))
          }
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

      <fieldset className="mb-4">
        <legend className="flex text-left text-base uppercase mb-3">Amenities</legend>
        <div className="flex flex-wrap capitalize m-3 justify-between">
          <label className="flex items-left mr-4">
            <input
              type="checkbox"
              name="wifi"
              className="mr-1"
              checked={formData.wifi}
              onChange={handleChange}
            />
            Wi-Fi
          </label>
          <label className="flex items-center mr-4">
            <input
              type="checkbox"
              name="parking"
              className="mr-1"
              checked={formData.parking}
              onChange={handleChange}
            />
            Parking
          </label>
          <label className="flex items-center mr-4">
            <input
              type="checkbox"
              name="pets"
              className="mr-1"
              checked={formData.pets}
              onChange={handleChange}
            />
            Pets
          </label>
          <label className="flex items-center mr-4">
            <input
              type="checkbox"
              name="breakfast"
              className="mr-1"
              checked={formData.breakfast}
              onChange={handleChange}
            />
            Breakfast
          </label>
        </div>
      </fieldset>

      <div className="mb-4">
        <label className="flex text-left text-m uppercase">Media</label>
        {formData.media.map((media, index) => (
          <div key={index} className="mb-2 relative">
            <input
              type="text"
              placeholder="Image URL"
              value={media.url}
              onChange={(e) => {
                handleMediaChange(index, 'url', e.target.value);
                handleMediaChange(index, 'alt', formData.name || 'Image');
              }}
              className="w-full p-2 border rounded mb-2"
            />
            {media.url && (
              <div className="relative mb-2">
                <img
                  src={media.url}
                  alt={formData.name || 'Image'}
                  className="w-3/4 h-28 rounded-md"
                />
                <button
                  type="button"
                  onClick={() => {
                    const updatedMedia = formData.media.filter((_, idx) => idx !== index);
                    setFormData({ ...formData, media: updatedMedia });
                  }}
                  className="absolute text-3xl top-10 right-4 text-black hover:text-custom-dark  px-2 rounded-full"
                >
                  <MdDeleteForever />
                </button>
              </div>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setFormData({
              ...formData,
              media: [
                ...formData.media,
                { url: '', alt: formData.name || 'Image' },
              ],
            })
          }
          className="flex pt-1 text-base text-black underline"
        >
          <GoPlus /> <span className="-mt-1">Add Media</span>
        </button>
      </div>
      <button
        type="submit"
        className="bg-custom-deep flex m-auto text-center text-white font-semibold px-4 py-1 uppercase"
      >
        Create Venue
      </button>
    </form>
  );
}

export default CreateVenueForm;
