import React from 'react';
import ProfileDetails from '../../components/Profile';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

/**
 * Profile component displays the user's profile details if they are logged in.
 * If the user is not logged in, it prompts them to log in or register.
 * 
 * This component checks for a token in localStorage to determine if the user
 * is authenticated. If a token is found, it renders the `ProfileDetails` component,
 * otherwise, it prompts the user with links to log in or register.
 * 
 * @component
 * @example
 * return (
 *   <Profile />
 * )
 * @returns {JSX.Element} A rendered profile page or a prompt to log in/register.
 */
function Profile() {
  const token = localStorage.getItem('token');

  return (
    <>
      <Helmet>
        <title>Profile | Holidaze</title>
        <meta
          name="description"
          content="View and manage your profile details, bookings, and other content on Holidaze."
        />
        <meta name="keywords" content="Profile, User Profile, Holidaze, Login, Register" />
      </Helmet>

      {!token ? (
        <div className="m-auto text-center mt-[130px] max-w-[400px]">
          <p className="text-lg font-prata p-3 font-semibold">
            Please log in or create an account to access your profile and view
            your content.{' '}
          </p>
          <div className="mt-4 uppercase font-petrona text-xl">
            <Link
              to="/login"
              className="text-custom-deep hover:text-custom-medium mr-4"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-custom-deep hover:text-custom-medium"
            >
              Register
            </Link>
          </div>
        </div>
      ) : (
        <div className="row justify-content-between mt-[80px]">
          <div>
            <ProfileDetails />
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
