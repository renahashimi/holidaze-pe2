import React, { useState } from 'react';
import { apiBaseUrl } from '../../../api/constants';
import { Link, useNavigate } from 'react-router-dom';

/**
 * LoginForm component for user authentication.
 * @returns {JSX.Element} The rendered login form.
 */
const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  /**
   * Handles input field changes.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * Validates the form fields.
   * @returns {Object} An object containing validation errors.
   */
  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }

    return newErrors;
  };

  /**
   * Handles form submission.
   * @param {React.FormEvent<HTMLFormElement>} e - The form submit event.
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
    setErrorMessage('');
  
    try {
      const { email, password } = formData;
      const response = await fetch(`${apiBaseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0]?.message || 'Invalid email or password.');
      }
  
      const data = await response.json();
      console.log('User Profile:', data.data);
  
      localStorage.setItem('token', data.data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.data));
  
      navigate('/profile'); 
      window.location.reload();
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[600px] w-full mx-auto bg-custom-light mt-5 font-petrona border border-gray-300 rounded shadow-md">
      {errorMessage && (
        <p className="text-red-500 text-center my-4 uppercase">*{errorMessage}*</p>
      )}
      <form onSubmit={handleSubmit} noValidate className="p-6">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block font-petrona uppercase text-custom-dark font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-custom-light px-3 py-2 border-b-2 border-custom-dark rounded-none"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block font-petrona uppercase text-custom-dark font-medium mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-custom-light px-3 py-2 border-b-2 border-custom-dark rounded-none"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
        <p className="underline text-sm -mt-3 ms-1 mb-5">Forgot password</p>

        <div className="flex justify-center m-auto">
          <button
            type="submit"
            className="w-64 bg-custom-dark font-petrona font-semibold text-white uppercase text-2xl py-2 px-4 rounded hover:bg-custom-deep"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
      <div className="w-full bg-white my-4 p-4 text-center">
        <p className="text-xl text-custom-deep uppercase font-petrona font-semibold py-3">
          Not a member?
        </p>
        <Link to="/register">
          <button
            type="button"
            className="bg-custom-deep text-white uppercase text-lg px-4 py-1 rounded hover:bg-custom-dark"
          >
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
