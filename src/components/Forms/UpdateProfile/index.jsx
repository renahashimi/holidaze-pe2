import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authFetch } from '../../../api/auth/authFetch';
import { apiUrl } from '../../../api/constants';
import { FaTrash } from 'react-icons/fa';

/**
 * Profile update form component for updating avatar, banner, and bio.
 * @returns {JSX.Element} The rendered profile update form component.
 */
const UpdateProfileForm = () => {
  // Retrieve user data from local storage
  const user = JSON.parse(localStorage.getItem('user'));
  const name = user?.name;

  /**
   * Form state for avatar, banner, and bio input fields.
   * @type {Object}
   */
  const [formData, setFormData] = useState({
    bio: user.bio || '',
    avatarUrl: user.avatar.url || '',
    bannerUrl: user.banner.url || '',
  });

  /**
   * Error state for form validation messages.
   * @type {Object}
   */
  const [errors, setErrors] = useState({});

  /**
   * Loading state to show a spinner or button state when updating.
   * @type {boolean}
   */
  const [loading, setLoading] = useState(false);

  /**
   * State for any general error messages.
   * @type {string}
   */
  const [error, setError] = useState('');

  // Router hook for navigation after successful profile update
  const navigate = useNavigate();

  // Retrieve token from local storage
  const token = localStorage.getItem('token');

  // Prepare the updated profile object
  const updatedProfile = {
    ...user,
    banner: formData.bannerUrl ? { url: formData.bannerUrl } : user.banner,
    avatar: formData.avatarUrl ? { url: formData.avatarUrl } : user.avatar,
    bio: formData.bio || user.bio,
  };

  // Update the localStorage with the updated user profile
  localStorage.setItem('user', JSON.stringify(updatedProfile));

  /**
   * Handle form input changes and update form data.
   * @param {React.ChangeEvent<HTMLInputElement>} e The input change event.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * Validate form inputs before submission.
   * @returns {Object} Validation errors, if any.
   */
  const validate = () => {
    const newErrors = {};
    if (formData.bio.length > 100)
      newErrors.bio = 'Bio cannot exceed 100 characters.';
    return newErrors;
  };

  /**
   * Clear the value of a specific form field.
   * @param {string} field The name of the field to clear.
   */
  const handleClear = (field) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: '',
    }));
  };

  /**
   * Handle form submission, perform validation, and make the update request.
   * @param {React.FormEvent<HTMLFormElement>} e The form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setError('');

    try {
      const updateUrl = `${apiUrl}/profiles/${name}`;

      const response = await authFetch(updateUrl, {
        method: 'PUT',
        body: JSON.stringify({
          banner: { url: formData.bannerUrl },
          avatar: { url: formData.avatarUrl },
          bio: formData.bio,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile.');
      }

      // Update localStorage with the new profile data
      const updatedProfile = {
        ...user,
        banner: formData.bannerUrl
          ? { url: formData.bannerUrl }
          : user.bannerUrl,
        avatar: formData.avatarUrl ? { url: formData.avatarUrl } : user.avatar,
        bio: formData.bio || user.bio,
      };

      localStorage.setItem('user', JSON.stringify(updatedProfile));
      window.location.reload();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="bg-custom-light p-4">
      <form onSubmit={handleSubmit} className="font-petrona space-y-6 -mt-6">
        <img
          src={formData.avatarUrl || '/FallbackImg2.jpg'}
          alt="Profile Avatar"
          className="w-24 h-24 mt-10 rounded-full object-cover"
        />
        <div>
          <label htmlFor="avatar" className="block mb-2 font-medium uppercase">
            Avatar
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="url"
              id="avatar"
              name="avatarUrl"
              placeholder="Enter image URL"
              value={formData.avatarUrl || ''}
              onChange={handleChange}
              className="w-full bg-custom-light px-3 py-2 border-b-2 border-custom-dark rounded-none"
            />
            <button
              type="button"
              onClick={() => handleClear('avatarUrl')}
              className="text-black hover:text-custom-medium p-2"
              aria-label="Clear Avatar URL"
            >
              <FaTrash size={20} />
            </button>
          </div>
        </div>
        <img
          src={formData.bannerUrl || '/FallbackImg2.jpg'}
          alt="Profile Banner"
          className="w-64 h-32 rounded-lg object-cover"
        />
        <div>
          <label htmlFor="banner" className="block mb-2 font-medium uppercase">
            Banner
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="url"
              id="banner"
              name="bannerUrl"
              placeholder="Enter image URL"
              value={formData.bannerUrl || ''}
              onChange={handleChange}
              className="w-full bg-custom-light px-3 py-2 border-b-2 border-custom-dark rounded-none"
            />
            <button
              type="button"
              onClick={() => handleClear('bannerUrl')}
              className="text-black hover:text-custom-medium p-2"
              aria-label="Clear Banner URL"
            >
              <FaTrash size={20} />
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="bio" className="block mb-2 font-medium uppercase">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Write a short bio about yourself"
            maxLength="100"
            className="w-full bg-custom-light px-3 py-2 border-2 border-custom-dark rounded-none"
          />
          {errors.bio && (
            <p className="text-red-500 text-sm mt-1">{errors.bio}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-custom-deep flex m-auto text-center text-white font-semibold px-4 py-1 uppercase"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default UpdateProfileForm;
