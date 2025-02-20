/**
 * Header component for the website, featuring navigation links, login/logout functionality, 
 * and a responsive mobile menu.
 * 
 * @component
 * @example
 * return (
 *   <Header />
 * )
 */
import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { NavLink } from "react-router-dom";

/**
 * Header component provides a navigation bar that includes links to various pages 
 * and the option to log in or out based on the authentication status.
 * 
 * @returns {JSX.Element} The rendered Header component with navigation and authentication management.
 */
function Header() {
  /** 
   * State to track if the dropdown menu is open.
   * @type {boolean}
   */
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  /** 
   * State to track the login status of the user.
   * @type {boolean}
   */
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /** Navigation hook from React Router to programmatically navigate. */
  const navigate = useNavigate();

  /** Location hook from React Router to track the current route. */
  const location = useLocation();

  /**
   * Updates the login status based on the presence of a token in localStorage.
   * This effect runs once on component mount and sets up a listener for changes to localStorage.
   * 
   * @returns {Function} Cleanup function to remove the storage event listener.
   */
  useEffect(() => {
    const updateLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    updateLoginStatus();
    window.addEventListener('storage', updateLoginStatus);

    return () => {
      window.removeEventListener('storage', updateLoginStatus);
    };
  }, []);

  /**
   * Close the dropdown menu when the location changes.
   * This effect runs every time the `location` changes.
   */
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);

  /**
   * Toggles the state of the dropdown menu.
   */
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  /**
   * Handles the logout process by clearing localStorage and navigating to the login page.
   * Asks for user confirmation before logging out.
   */
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.clear();
      setIsLoggedIn(false);
      setIsDropdownOpen(false);
      navigate('/login');
    }
  };

  return (
    <header className="flex justify-between items-center w-full max-w-[1300px] mx-auto fixed top-0 left-0 right-0 bg-white p-4 border-b-2 border-custom-deep z-[9999]">
      {/* Logo and Title */}
      <div className="flex items-center">
        <a href="/">
          <div className="font-rubik">
            <h1 className="flex text-custom-dark text-lg md:text-xl font-extralight hover:text-custom-medium no-underline uppercase">
              Holidaze
            </h1>
          </div>
        </a>
      </div>

      {/* Desktop Navigation */}
      <nav className="md:flex md:ml-auto font-prata hidden md:text-[12px] lg:text-sm xl:text-base uppercase">
        <ul className="flex items-center space-x-1 lg:space-x-3 xl:space-x-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block py-2 px-4 ${
                  isActive ? "text-custom-deep border-t-2 border-custom-light" : "hover:text-custom-dark"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `block py-2 px-4 ${
                  isActive ? "text-custom-deep border-t-2 border-custom-light" : "hover:text-custom-dark"
                }`
              }
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/venues"
              className={({ isActive }) =>
                `block py-2 px-4 ${
                  isActive ? "text-custom-deep border-t-2 border-custom-light" : "hover:text-custom-dark"
                }`
              }
            >
              Our Venues
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block py-2 px-4 ${
                  isActive ? "text-custom-deep border-t-2 border-custom-light" : "hover:text-custom-dark"
                }`
              }
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `block py-2 px-4 ${
                  isActive ? "text-custom-deep border-t-2 border-custom-light" : "hover:text-custom-dark"
                }`
              }
            >
              Contact
            </NavLink>
          </li>
          {!isLoggedIn ? (
            <>
              <li>
                <Link
                  to="/register"
                  className="block py-2 px-4 hover:text-custom-dark"
                >
                  Sign Up
                </Link>
              </li>
              <li className="bg-custom-light rounded-full">
                <Link
                  to="/login"
                  state={{ from: location.pathname }}
                  className="block py-2 px-4 hover:text-custom-dark uppercase"
                >
                  Login
                </Link>
              </li>
            </>
          ) : (
            <li className="bg-custom-light rounded-full">
              <button
                onClick={handleLogout}
                className="block py-2 px-4 hover:text-custom-dark uppercase"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={toggleDropdown}
          className="text-custom-deep text-xl font-bold hover:text-custom-dark"
        >
          <FaBars className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute w-full h-screen text-3xl font-prata uppercase bg-custom-deep text-custom-light text-end top-12 right-0">
          <button
            onClick={() => setIsDropdownOpen(false)}
            className="absolute top-4 right-4 p-2 bg-custom-deep text-white border-4 border-white rounded-full shadow-md hover:bg-gray-200"
          >
            <FaTimes className="text-3xl hover:text-custom-deep" />
          </button>
          <ul className="mt-[80px] font-play">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block mt-[100px] mb-5 py-2 px-4 ${
                    isActive
                      ? "bg-custom-dark font-bold border-t-2 border-custom-medium"
                      : "hover:border-custom-medium"
                  }`
                }
                onClick={toggleDropdown}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `block my-5 py-2 px-4 ${
                    isActive
                      ? "bg-custom-dark font-bold border-t-2 border-custom-medium"
                      : "hover:border-custom-medium"
                  }`
                }
                onClick={toggleDropdown}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/venues"
                className={({ isActive }) =>
                  `block my-5 py-2 px-4 ${
                    isActive
                      ? "bg-custom-dark font-bold border-t-2 border-custom-medium"
                      : "hover:border-custom-medium"
                  }`
                }
                onClick={toggleDropdown}
              >
                Our Venues
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block my-5 py-2 px-4 ${
                    isActive
                      ? "bg-custom-dark font-bold border-t-2 border-custom-medium"
                      : "hover:border-custom-medium"
                  }`
                }
                onClick={toggleDropdown}
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `block my-5 py-2 px-4 ${
                    isActive
                      ? "bg-custom-dark font-bold border-t-2 border-custom-medium"
                      : "hover:border-custom-medium"
                  }`
                }
                onClick={toggleDropdown}
              >
                Contact
              </NavLink>
            </li>
            <div className="border-t border-5 border-custom-light mt-5">
              {!isLoggedIn ? (
                <>
                  <li>
                    <Link
                      to="/register"
                      className="block py-2 px-4 hover:text-custom-dark"
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      state={{ from: location.pathname }}
                      className="block py-2 px-4 hover:text-custom-dark"
                    >
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <li className="flex justify-end">
                  <button
                    onClick={handleLogout}
                    className="block py-2 text-right px-4 hover:text-custom-dark uppercase"
                  >
                    Logout
                  </button>
                </li>
              )}
            </div>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
