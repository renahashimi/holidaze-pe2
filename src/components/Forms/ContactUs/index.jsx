import React, { useState } from 'react';

/**
 * ContactUsForm Component - A form for users to submit contact inquiries.
 *
 * @component
 * @returns {JSX.Element} A responsive contact form with validation and success message handling.
 */
const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Handles input changes and updates the state.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - The input change event.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * Validates form inputs and returns any errors found.
   * @returns {Object} An object containing validation error messages.
   */
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required.';
    } else if (formData.subject.length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (formData.message.length < 3) {
      newErrors.message = 'Message must be at least 3 characters.';
    }

    return newErrors;
  };

  /**
   * Handles form submission, performs validation, and simulates form submission.
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage('');
      return;
    }

    setLoading(true);
    setErrors({});
    setSuccessMessage('');

    setTimeout(() => {
      setLoading(false);
      setSuccessMessage(
        'Thank you for reaching out! We have received your message and will get back to you within 24 hours.'
      );
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 2000);
  };

  return (
    <div className="max-w-[600px] w-full mx-auto bg-custom-light mt-5 border border-gray-300 rounded shadow-md">
      {successMessage && (
        <div className="bg-white w-full my-3 px-2 pt-1">
          <p className="bg-white w-full text-custom-deep py-3 text-petrona text-center mb-4">
            {successMessage}
          </p>
        </div>
      )}
      <form className="contactUsForm p-6" onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block font-petrona uppercase text-custom-dark font-medium mb-1"
          >
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
            htmlFor="subject"
            className="block font-petrona uppercase text-custom-dark font-medium mb-1"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full bg-custom-light px-3 py-2 border-b-2 border-custom-dark rounded-none"
          />
          {errors.subject && (
            <p className="text-red-500 text-sm">{errors.subject}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="message"
            className="block font-petrona uppercase text-custom-dark font-medium mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-custom-light text-black px-3 py-2 border-b-2 border-custom-dark rounded-none"
            placeholder="Write your message"
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message}</p>
          )}
        </div>

        <div className="flex justify-center m-auto">
          <button
            type="submit"
            className="w-64 bg-custom-dark font-petrona font-semibold text-white uppercase text-2xl py-2 px-4 rounded hover:bg-custom-deep"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUsForm;
