import React from 'react';
import LoginForm from '../../components/User/Login';
import { Helmet } from 'react-helmet';

/**
 * Login component represents the login page of the application.
 * It provides a form for users to sign in and includes a background image.
 * The form submits a login request and triggers a success handler if successful.
 * 
 * @component
 * @example
 * return (
 *   <Login />
 * )
 * @returns {JSX.Element} A rendered login page with a background image, login form, and submission handler.
 */
function Login() {
  const handleLoginSuccess = () => {};

  return (
    <>
      <Helmet>
        <title>Login | Holidaze</title>
        <meta
          name="description"
          content="Sign in to your Holidaze account to access your personal dashboard and manage your bookings."
        />
        <meta name="keywords" content="Login, Sign In, Holidaze, User Account" />
      </Helmet>
      <div className="relative flex justify-center items-center min-h-screen">
        <div className="absolute inset-0 hidden sm:block">
          <img
            src="/public/back2.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 mx-auto mb-12 flex w-11/12 max-w-lg flex-col items-center justify-center rounded-xl bg-custom-medium sm:mt-[115px]">
          <h1 className="text-white text-2xl sm:text-3xl font-prata font-semibold mt-6">
            SIGN IN
          </h1>
          <LoginForm onSubmit={handleLoginSuccess} />
        </div>
      </div>
    </>
  );
}

export default Login;
