import React, { useState, useEffect } from 'react';
import { IoMdArrowRoundUp } from 'react-icons/io';

/**
 * BackToTop Component
 * 
 * A floating button that appears when the user scrolls down and allows 
 * them to smoothly scroll back to the top of the page.
 *
 * @component
 * @returns {JSX.Element} The BackToTop button component.
 */
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    /**
     * Handles the scroll event to determine whether the button should be visible.
     */
    const handleScroll = () => {
      const scrollHeight = window.innerHeight;
      setIsVisible(window.scrollY > scrollHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Smoothly scrolls the page back to the top when called.
   */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-12 right-5 z-50 text-2xl p-3 rounded-full bg-custom-deep text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 border-2 border-custom-light hover:text-custom-dark hover:border-custom-deep hover:bg-custom-light shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105"
        aria-label="Back to Top"
      >
        <IoMdArrowRoundUp />
      </button>
    )
  );
};

export default BackToTop;
