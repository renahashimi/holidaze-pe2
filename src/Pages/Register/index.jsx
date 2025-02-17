import React from 'react';
import RegistrationForm from '../../components/User/Register';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

/**
 * Register component displays a registration form for new users.
 * 
 * If the registration is successful, the user is navigated to the login page.
 * The component includes a background image, a registration form, and a link to the login page
 * for users who are already registered.
 * 
 * @component
 * @example
 * return (
 *   <Register />
 * )
 * @returns {JSX.Element} A rendered registration page with a form and a link to the login page.
 */
function Register() {
  const navigate = useNavigate();

  const handleRegistrationSuccess = () => {
    navigate('/login');
  };

  return (
    <>
      <Helmet>
        <title>Register | Holidaze</title>
        <meta
          name="description"
          content="Create a new account on Holidaze to book and manage your venues and bookings."
        />
        <meta name="keywords" content="Register, Sign Up, User Registration, Holidaze" />
      </Helmet>

      <div className="relative w-full flex justify-center items-center min-h-screen sm:mt-[70px] max-w-[1300px] mx-auto sm:mt-[115px]">
        <div className="absolute flex mx-auto justify-center inset-0 hidden sm:block max-w-[1300px]">
          <img
            src="/back3.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-75"></div>
        </div>
        <div className="relative mx-auto mb-12 mt-[90px] flex w-11/12 max-w-lg flex-col font-petrona items-center justify-center rounded-xl bg-custom-medium">
          <div className="mb-3 mt-6">
            <h1 className="text-white text-2xl sm:text-3xl font-prata font-semibold">
              SIGN UP
            </h1>
          </div>
          <RegistrationForm onSubmit={handleRegistrationSuccess} />
          <div className="w-full bg-white mb-4 p-4 text-center">
            <p className="text-xl text-custom-deep uppercase font-petrona font-semibold py-3">
              Already a member?
            </p>
            <Link to="/login">
              <button
                type="button"
                className="bg-custom-deep text-white uppercase text-lg px-4 py-1 rounded hover:bg-custom-dark"
              >
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
