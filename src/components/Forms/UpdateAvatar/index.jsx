import React, { useState } from 'react';
import { authFetch } from '../../../api/auth/authFetch';
import { apiUrl } from '../../../api/constants';
import { FaTrash } from 'react-icons/fa';

/**
 * UpdateAvatar Component
 * Allows users to update their profile avatar by entering an image URL.
 *
 * @component
 * @returns {JSX.Element} A form for updating the user's avatar.
 */
const UpdateAvatar = () => {
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const name = user?.name || '';
  const [avatar, setAvatar] = useState(user?.avatar?.url || '');

  /**
   * Handles changes in the avatar input field.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleUrlChange = (e) => {
    setAvatar(e.target.value);
  };

  /**
   * Clears the avatar URL input field.
   */
  const handleClear = () => {
    setAvatar('');
  };

  /**
   * Handles the form submission to update the user's avatar.
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!avatar) {
      setError('Please enter a valid image URL');
      return;
    }

    const updatedProfile = {
      ...user,
      avatar: {
        url: avatar,
        alt: 'User Avatar',
      },
    };

    try {
      const updateUrl = `${apiUrl}/profiles/${name}`;
      const response = await authFetch(updateUrl, {
        method: 'PUT',
        body: JSON.stringify(updatedProfile),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to update avatar');
      }

      localStorage.setItem('user', JSON.stringify(updatedProfile));
      alert('Avatar updated successfully');
      window.location.reload();
    } catch (err) {
      setError(err.message);
      console.error('Avatar update error:', err);
    }
  };

  return (
    <div className="bg-custom-light p-2 md:w-[450px]">
      <form
        onSubmit={handleSubmit}
        className="updateavatar text-center font-petrona"
      >
        <div className="flex m-auto justify-center">
          <img
            src={avatar || '/FallbackImg2.jpg'}
            alt="Profile Avatar"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
        <div className="grid my-5">
          <label htmlFor="avatar" className="font-bold text-left text-m uppercase">
            Avatar
          </label>
          <div className="flex items-center">
            <input
              type="url"
              id="avatar"
              value={avatar}
              onChange={handleUrlChange}
              placeholder="Enter image URL"
              className="w-full text-sm bg-custom-light px-3 py-2 border-b-2 border-custom-dark rounded-none"
            />
            <button
              type="button"
              onClick={handleClear}
              className="text-black hover:text-custom-medium p-2"
              aria-label="Clear Avatar URL"
            >
              <FaTrash size={20} />
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="bg-custom-deep flex m-auto text-center text-white font-semibold px-4 py-1 uppercase"
        >
          Update Avatar
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default UpdateAvatar;
