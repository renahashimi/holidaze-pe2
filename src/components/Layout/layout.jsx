import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import BackToTop from '../../helpers/BackToTop';
import Footer from './Footer';

/**
 * The Layout component serves as the main wrapper for the application content.
 * It includes the Header, Footer, BackToTop button, and the content from nested routes (via <Outlet />).
 *
 * @component
 * @example
 * return (
 *   <Layout />
 * );
 * 
 * @returns {JSX.Element} The main layout structure with a header, footer, back-to-top button, and outlet for nested routes.
 */
function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default Layout;
