import React from 'react';
import {
  FaSquareXTwitter,
  FaSquareInstagram,
  FaSquareFacebook,
} from 'react-icons/fa6';

/**
 * Footer component that displays social media links, company address, 
 * and navigation links. It includes social media icons that link to 
 * "external profiles" and static links for About, Contact, and Privacy Policy.
 * 
 * @component
 * @example
 * return (
 *   <Footer />
 * )
 * @returns {JSX.Element} The rendered footer component.
 */
function Footer() {
  return (
    <footer className="bg-custom-light w-full mx-auto text-white pb-6 max-w-[1300px]">
      <div className=" sm:flex sm:justify-between">
        <div className="flex flex-col sm:block sm:flex-row sm:items-center sm:space-x-3">
          <div className="flex space-x-10 bg-custom-medium text-black justify-evenly my-3 px-4 py-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl hover:text-blue-700"
            >
              <FaSquareFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl hover:text-pink-700"
            >
              <FaSquareInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl hover:text-green-700"
            >
              <FaSquareXTwitter />
            </a>
          </div>
          <p className="hidden sm:flex font-petrona text-xs text-custom-deep mt-3 sm:mt-0">
            COPYRIGHT @ 2025 HOLIDAZE{' '}
          </p>
        </div>

        {/* Second Section: Navigation Links */}
        <div className="flex flex-row sm:flex-row justify-center items-start sm:mt-4">
          {/* Address Section */}
          <div className="md:flex flex-col font-petrona font-semibold sm:pt-3 me-8 mt-4 sm:mt-0 text-left">
            <p className="text-sm hover:underline text-custom-deep">
              HOLIDAZE AS
            </p>
            <p className="text-sm hover:underline text-custom-deep">
              Oslovegen 35
            </p>
            <p className="text-sm hover:underline text-custom-deep">
              0101 Oslo
            </p>
          </div>

          {/* Navigation Links Section */}
          <div className="flex flex-col font-petrona font-semibold sm:pt-3 ms-8 mt-4 sm:mt-0 uppercase text-left">
            <a
              href="/about"
              className="text-sm hover:underline text-custom-deep"
            >
              About Us
            </a>
            <a
              href="/contact"
              className="text-sm hover:underline text-custom-deep"
            >
              Contact Us
            </a>
            <a href="#" className="text-sm hover:underline text-custom-deep">
              Privacy Policy
            </a>
          </div>
        </div>
        {/* Third Section: Holidaze */}
        <div className="flex justify-between mx-2 items-center sm:items-end mt-5 sm:mt-0">
          <p className="sm:hidden flex font-petrona text-xs justify-center text-sm text-custom-deep ">
            COPYRIGHT @ 2025 HOLIDAZE
          </p>
          <h3 className="font-semibold font-rubik sm:me-5 text-custom-dark text-lg">
            HOLIDAZE
          </h3>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
