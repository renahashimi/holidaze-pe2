import React from 'react';
import { FaFacebookSquare, FaInstagramSquare } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import ContactUsForm from '../../components/Forms/ContactUs';
import { Helmet } from 'react-helmet';

/**
 * ContactPage component displays the contact form, address information, and social media links.
 * This page allows users to get in touch with the company and provides details on how to follow them on social media.
 *
 * @component
 * @example
 * return (
 *   <ContactPage />
 * )
 * @returns {JSX.Element} A rendered Contact Us page with form, address details, and social media links.
 */
const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | Holidaze</title>
        <meta
          name="description"
          content="Get in touch with us for any inquiries. We're here to assist you!"
        />
        <meta name="keywords" content="Contact, Customer Support, Inquiries" />
      </Helmet>
      <div className="flex relative w-full md:h-screen mx-auto justify-center mt-[60px] max-w-[1300px]">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/phone.jpg"
            alt="Phone"
            className="w-full h-full object-cover object-[85%]"
          />
        </div>

        {/* Overlay for form and address info */}
        <div className="relative flex flex-col mx-auto justify-evenly md:flex-row items-center w-full bg-black/30 text-white p-6">
          {/* Form container */}
          <div className="bg-custom-medium bg-opacity-80 text-black pt-6 md:m-5 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-2xl sm:text-3xl font-prata text-white text-center uppercase">
              Contact us
            </h1>
            <ContactUsForm />
          </div>
          {/* Address and Follow Us container */}
          <div className="text-black rounded-lg w-full max-w-md flex flex-col justify-evenly h-full">
            {/* Address Info */}
            <div className="p-4 bg-white bg-opacity-70 font-petrona mt-6 shadow-xl">
              <p className="font-bold text-lg md:text-xl">
                If you have any questions or need assistance, feel free to reach
                out to us. We’re here to help!
              </p>
              <div className="md:text-lg mt-5">
                <p>HOLIDAZE AS</p>
                <p>Oslovegen 35</p>
                <p>0101 Oslo</p>
                <br />
                <p>+47 999 99 888</p>
                <p>Monday-Friday, 08-16</p>
              </div>
            </div>

            {/* Follow Us Section */}
            <div className="p-4 bg-white bg-opacity-70 my-10 shadow-xl">
              <p className="text-sm sm:text-base text-center text-custom-deep font-bold mb-4 font-play">
                FOLLOW & STAY CONNECTED WITH US
              </p>
              <div className="flex justify-evenly">
                <a
                  href="https://www.facebook.com"
                  className="text-black hover:text-blue-700"
                >
                  <FaFacebookSquare size={36} />
                </a>
                <a
                  href="https://www.instagram.com"
                  className="text-black hover:text-pink-700"
                >
                  <FaInstagramSquare size={36} />
                </a>
                <a
                  href="https://www.twitter.com"
                  className="text-black hover:text-green-700"
                >
                  <FaSquareXTwitter size={36} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
