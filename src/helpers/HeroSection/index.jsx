import React from 'react';

/**
 * HeroHomepage component renders a full-width hero image with a centered text overlay.
 * The image represents a cozy room, and the text conveys a welcoming message.
 * The text is displayed over the image with a slight transparent background for better readability.
 *
 * @returns {JSX.Element} The HeroHomepage component
 */
function HeroHomepage() {
  return (
    <div className="flex justify-center items-center w-full max-w-[1300px] mx-auto relative">
      <img
        src="/public/cozyroom.jpg"
        alt="Cozy Room"
        className="w-full h-auto object-contain"
      />
      <p className="absolute w-full max-w-[1300px] m-auto text-center font-prata uppercase md:text-2xl lg:text-5xl py-3 top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold bg-black bg-opacity-35">
        Feel at Home, Anywhere You Go.
      </p>
    </div>
  );
}

export default HeroHomepage;
