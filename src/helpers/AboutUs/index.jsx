import React from 'react';

/**
 * AboutUsContent component renders the content of the "About Us" section for the Holidaze platform.
 * It includes a welcoming message, company values, images, and a description of the company's mission 
 * to provide unforgettable travel experiences with cozy vacation rentals.
 *
 * @component
 * @example
 * return (
 *   <AboutUsContent />
 * )
 * @returns {JSX.Element} The "About Us" content section with text and images.
 */
function AboutUsContent() {
  return (
    <div className="bg-custom-deep max-w-[1300px] mx-auto w-full">
      <div className="block sm:flex mt-[70px] pt-[60px] p-4 md:mx-auto justify-evenly text-center max-w-[950px]">
        <div className="block w-full md:mt-[50px] mx-auto text-white max-w-[400px] md:max-w-[450px]">
          <h1 className="font-play text-2xl md:text-3xl sm:mb-7 font-bolder ">
            Welcome to Holidaze!{' '}
          </h1>
          <p className="font-petrona my-3 lg:text-lg">
            We specialize in creating unforgettable travel experiences by
            offering unique and cozy vacation rentals. Whether you're looking
            for a city escape, a beachfront retreat, or a mountain getaway, we
            have the perfect place for you to relax, recharge, and make
            lasting memories.
          </p>
        </div>
        <div className="flex w-full max-w-[300px] mx-auto justify-center my-5">
          <img
            src="/public/tourists1.jpg"
            alt="Tourists"
            className="w-64 h-64 rounded-full object-cover"
          />
        </div>
      </div>
      <div className="block sm:flex mt-[30px] sm:-mt-10 p-4 mx-auto justify-evenly text-center text-white max-w-[450px] sm:max-w-[850px]">
        <div className="flex sm:hidden">
          <p className="font-petrona my-3">
            At Holidaze, we believe every trip should be special. That's why
            we carefully curate our properties, ensuring they meet the highest
            standards of comfort and style. Our goal is to make your stay as
            seamless as possible, so you can focus on enjoying your vacation
            to the fullest.
          </p>
        </div>
        <div className="flex mx-auto justify-evenly w-full p-3">
          <img
            src="/public/girljumping.jpg"
            alt="Jumping Girl"
            className="w-32 sm:w-36 rounded-3xl mt-12 object-cover"
          />
          <img
            src="/public/people2.jpg"
            alt="Tourists"
            className="w-32 sm:w-36 rounded-3xl mb-12"
          />
        </div>
        <div className="hidden sm:flex sm:mt-10 block w-full mx-auto lg:text-lg text-white  max-w-[420px]">
          <p className="font-petrona my-3 ">
            At Holidaze, we believe every trip should be special. That's why
            we carefully curate our properties, ensuring they meet the highest
            standards of comfort and style. Our goal is to make your stay as
            seamless as possible, so you can focus on enjoying your vacation
            to the fullest.
          </p>
        </div>
      </div>
      <div className="flex mx-auto justify-center text-white lg:text-xl text-center p-3 pb-7">
        <p className="font-petrona font-black my-5 max-w-[700px]">
          Join us at Holidaze, where we transform every journey into a
          delightful adventure. Let us help you find your perfect getaway.
        </p>
      </div>
    </div>
  );
}

export default AboutUsContent;
