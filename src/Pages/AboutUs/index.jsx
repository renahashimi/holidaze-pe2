import React from 'react';
import { Helmet } from 'react-helmet';
import AboutUsContent from '../../helpers/AboutUs';

/**
 * AboutUsPage component displays the "About Us" section for the Holidaze platform.
 * This page introduces the company, its values, and what it offers to potential customers.
 *
 * @component
 * @example
 * return (
 *   <AboutUsPage />
 * )
 * @returns {JSX.Element} A rendered About Us page with company details and images.
 */
function AboutUsPage() {
  return (
    <>
      <Helmet>
        <title>About Us | Holidaze</title>
        <meta
          name="description"
          content="Learn more about us and our values on the About Us page."
        />
        <meta name="keywords" content="About Us, Values, Company" />
      </Helmet>
      <AboutUsContent />
    </>
  );
}

export default AboutUsPage;
