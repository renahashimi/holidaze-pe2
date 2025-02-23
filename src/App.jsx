import React, { useEffect, useRef } from 'react';
import { Routes, Route, useLocation  } from 'react-router-dom';
import Layout from './components/Layout/layout';
import HomePage from './Pages/HomePage';
import VenuePage from './Pages/VenuePage';
import Register from './Pages/Register';
import Login from './Pages/Login';
import VenuesPage from './Pages/VenuesPage';
import Profile from './Pages/Profile';
import AboutUsPage from './Pages/AboutUs';
import ContactPage from './Pages/Contact';
import SingleProfile from './Pages/SingleProfile';
/**
 * Main application component that defines the routing structure.
 * Uses React Router to manage different pages and stores the previous 
 * visited path in local storage.
 *
 * @returns {JSX.Element} The application routes wrapped in a layout component.
 */
function App() {
  const location = useLocation();
  const previousPath = useRef(null);

  useEffect(() => {
    if (previousPath.current) {
      localStorage.setItem('previousVisited', previousPath.current);
    }
    previousPath.current = location.pathname; 
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="venues" element={<VenuesPage />} />
        <Route path="venue/:id" element={<VenuePage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profiles/:name" element={<SingleProfile />} />
        <Route path="about" element={<AboutUsPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}

export default App;