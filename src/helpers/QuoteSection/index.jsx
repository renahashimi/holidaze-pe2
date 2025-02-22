import React from 'react';

/**
 * QuoteSection component renders a section with three quote cards and a background image.
 * The section showcases various features like flexible options, local insights, and unique stays.
 * It also includes a prominent quote that can be displayed on both small and large screens.
 *
 * @returns {JSX.Element} The QuoteSection component.
 */
const QuoteSection = () => {
  return (
    <div className="quote-section block inset-0 bg-gradient-to-b from-custom-deep/40 via-custom-light/10 to-transparent z-10">
      <div className="block md:flex mb-[50px] gap-1 py-5 grid mx-auto font-petrona justify-center md:flex md:justify-evenly text-center">
        <div className="m-2 bg-white p-3 mx-auto w-3/4 md:max-w-[350px] shadow-lg rounded-xl">
          <h4 className="uppercase my-3 text-custom-dark font-play font-semibold">{`Flexible Options`}</h4>
          <p className="text-custom-deep">
            With a range of budgets and accommodations, Airbnb ensures there’s
            something for every traveler, anywhere in the world.
          </p>
        </div>
        <div className="m-2 bg-white p-3 mx-auto w-3/4 md:max-w-[350px] shadow-lg rounded-xl">
          <h4 className="uppercase my-3 text-custom-dark font-play font-semibold">{`Local Insights`}</h4>
          <p className="text-custom-deep">
            Stay like a local with hosts who provide personalized tips and
            recommendations for an authentic experience.
          </p>
        </div>
        <div className="m-2 bg-white p-3 mx-auto w-3/4 md:max-w-[350px] shadow-lg rounded-xl">
          <h4 className="uppercase my-3 text-custom-dark font-play font-semibold">{`Unique Stays`}</h4>
          <p className="text-custom-deep">
            Airbnb offers one-of-a-kind properties, from treehouses to
            beachfront villas, giving travelers unforgettable experiences.
          </p>
        </div>
      </div>
      <div className="block justify-center text-center font-petrona align-center z-10 py-6 -mt-3 mb-4 sm:h-[400px]">
      <h3 className="sm:hidden flex-grow font-play p-6 font-semibold text-center 
               text-[4vw] sm:text-xl md:text-3xl lg:text-5xl xl:text-6xl 
               text-custom-deep uppercase z-20 relative max-w-[600px]">
  “YOU’RE ALWAYS HOME”
</h3>

        <div className="relative text-center font-petrona py-6 -mt-3">
          <img
            src="/back4.jpg"
            alt="TravelImg"
            className="absolute inset-0 w-full h-full sm:h-[400px] object-cover z-0"
          />
          <div className="relative z-10 block items-center justify-end p-2 sm:rounded-lg min-h-[200px]">
            <div className="hidden sm:block absolute left-10 top-3/4 -translate-y-1/2 w-[340px] bg-white/85 rounded-lg shadow-lg p-4">
              <h3 className="font-play font-semibold text-left text-2xl text-custom-deep uppercase mb-2">
                “YOU’RE ALWAYS HOME”
              </h3>
              <p className="text-black text-lg text-left font-petrona font-bold">
                Your adventure, your home. Explore new places and always find
                comfort, warmth, and belonging.
              </p>
            </div>
            <p className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white/80 font-petrona font-semibold text-black text-sm text-center max-w-[350px] w-full sm:hidden p-2 rounded-md">
              Your adventure, your home. Explore new places and always find
              comfort, warmth, and belonging.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteSection;
