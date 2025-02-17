import React, { useState } from 'react';
import { apiBaseUrl } from '../../../api/constants';
import { useNavigate } from 'react-router-dom';

/**
 * RegistrationForm component handles user registration.
 * @returns {JSX.Element} The rendered RegistrationForm component.
 */
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    avatarUrl: '',
    bannerUrl: '',
    venueManager: false,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  /**
   * Handles input changes and updates form data.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - Input change event.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * Validates the form data.
   * @returns {Object} An object containing validation errors.
   */
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters.';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    } else if (!formData.email.endsWith('@stud.noroff.no')) {
      newErrors.email = 'Email must end with @stud.noroff.no.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }

    return newErrors;
  };

  /**
   * Handles form submission and sends registration data to the server.
   * @param {React.FormEvent<HTMLFormElement>} e - Form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage('');
      return;
    }

    setLoading(true);
    setErrors({});
    setError('');

    const user = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      bio: formData.bio || undefined,
      avatar: formData.avatarUrl
        ? { url: formData.avatarUrl, alt: formData.avatarAlt }
        : undefined,
      venueManager: formData.venueManager,
    };

    try {
      const response = await fetch(`${apiBaseUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.errors
          ? errorData.errors[0]?.message || 'Registration failed.'
          : 'An error occurred';
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('User Profile:', data.data);

      setSuccessMessage('Registration successful!');
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/login');
    } catch (err) {
      let errorMessage = 'An error occurred';
      if (err instanceof Error && err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[600px] w-full mx-auto bg-custom-light mt-5 p-6 border border-gray-300 rounded shadow-md">
      {successMessage && (
        <p className="text-custom-deep font-petrona uppercase text-xl text-center mb-4">
          {successMessage}
        </p>
      )}
      {error && <p className="text-red-500 text-center my-4 uppercase">*{error}*</p>}
      <form className="registerForm" onSubmit={handleSubmit} noValidate>
        <div className="mb-4 flex border-b-2 border-custom-deep">
          <label htmlFor="venueManager" className="block font-petrona uppercase m-2 text-custom-deep font-medium">
            Are you a Venue Manager?
          </label>
          <input
            type="checkbox"
            id="venueManager"
            name="venueManager"
            checked={formData.venueManager}
            onChange={(e) =>
              setFormData({ ...formData, venueManager: e.target.checked })
            }
            className="w-10 bg-custom-light border-0 m-2 px-3 py-2 rounded-none"
          />
        </div>

        {/* Input Fields */}
        <div className="my-4 pt-6">
          <label htmlFor="name" className="block font-petrona uppercase text-custom-dark font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-custom-light px-3 py-2 border-b-2 border-custom-dark rounded-none"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center m-auto">
          <button
            type="submit"
            className="w-64 bg-custom-dark font-petrona font-semibold text-white uppercase text-2xl py-2 px-4 rounded hover:bg-custom-deep"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;