import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ContactSection component renders a section with a "Get in Touch" message, 
 * a brief description, and a link to the contact page. It also displays 
 * an image on the right side for larger screens.
 *
 * @returns {JSX.Element} The ContactSection component
 */
const ContactSection = () => {
  return (
    <div className="contact-section block sm:flex my-3 inset-0 text-black bg-custom-medium/70">
      {/* Left Content */}
      <div className="p-3 md:w-1/2">
        <h3 className="font-rubik text-3xl lg:text-4xl md:my-3">GET IN TOUCH</h3>
        <h4 className="font-play lg:text-xl">We’d Love to Hear from You!</h4>
        <p className="font-petrona text-sm lg:text-base pt-3">
          Have a question, suggestion, or just want to say hello? We’re here to help! Whether you need support, have feedback, or want to know more about our venues or services, feel free to reach out.
        </p>
        <p className='font-petrona text-sm lg:text-base font-bold pb-3'> Our team is always happy to assist you.</p> 

        <Link to="/contact" className="font-play md:text-lg hover:underline">
          Contact Us Today!
        </Link>
      </div>

      {/* Right Image */}
      <div className="hidden sm:flex md:w-1/2">
        <img src="/back5.jpg" alt="Contact section img" className="w-full h-auto object-cover" />
      </div>
    </div>
  );
};

export default ContactSection;
