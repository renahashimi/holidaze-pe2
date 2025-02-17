import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { authFetch } from '../../../api/auth/authFetch';
import { apiUrl } from '../../../api/constants';
import CreateVenueForm from '../../Forms/CreateVenue';
import Modal from '../../../helpers/Modal';

/**
 * VenueManager component allows users to become venue managers and add new venues.
 * It checks if the user is a venue manager, and provides options to either become a venue manager
 * or create a new venue if they are already a venue manager.
 *
 * @component
 * @returns {JSX.Element} The VenueManager component.
 */
const VenueManager = () => {
  const [userProfile, setUserProfile] = useState(null); // Holds the user profile data
  const [loading, setLoading] = useState(true); // Indicates loading state
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls the modal open/close state
  const [modalContent, setModalContent] = useState(null); // Holds the content to be displayed in the modal
  const [isVenueManager, setIsVenueManager] = useState(false); // Determines if the user is a venue manager

  const profile = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token'); // Gets the authentication token from local storage
  const userId = profile?.name || profile?.data.name; // Extract userId from the profile
console.log(userId)
  /**
   * Fetches the user profile and checks if the user is a venue manager.
   * Sets the user profile and venue manager status on successful fetch.
   */
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await authFetch(`${apiUrl}/profiles/${userId}`);
        const { data } = await response.json();  // Destructure directly from the response
        setUserProfile(data);  // Set the profile data
        setIsVenueManager(data?.venueManager || false);  // Access venueManager directly
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    
  
    if (userId) {
      fetchProfile();
    } else {
      // Handle case where userId is not available, maybe redirect or show error
    }
  }, [userId]); // Dependency array includes userId to fetch data when the user changes

  /**
   * Handles the action of becoming a venue manager.
   * It sends a PUT request to update the profile and set the user as a venue manager.
   */
  const handleBecomeVenueManager = async () => {
    const confirmAction = window.confirm(
      'Are you sure you want to become a venue manager?'
    );
    if (!confirmAction) return;
  
    try {
      const response = await authFetch(`${apiUrl}/profiles/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ venueManager: true }),
      });
  
      if (response.ok) {
        const updatedProfile = await response.json();
        const profileData = updatedProfile.data || updatedProfile;  // Check for 'data' key and extract correctly
  
        setUserProfile(profileData);  // Set profile data directly (without nested 'data' key)
        localStorage.setItem('user', JSON.stringify(profileData));  // Store updated profile correctly in local storage
  
        alert('You are now a venue manager!');
        window.location.reload(); 
      } else {
        const errorDetails = await response.json();
        console.error('Error updating profile:', errorDetails);
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  

  /**
   * Opens the modal to create a new venue.
   * @param {string} formType - The type of form to be displayed in the modal.
   */
  const openModal = (formType) => {
    const contentMap = {
      createvenue: <CreateVenueForm />, // Content for creating a venue
    };
    setModalContent(contentMap[formType] || null); // Set the modal content based on the form type
    setIsModalOpen(true); // Open the modal
  };

  /**
   * Closes the modal.
   */
  const closeModal = () => setIsModalOpen(false);

  // If data is loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-start ms-5 md:ms-0 md:justify-center md:mt-6 m-auto text-right space-x-2">
      {!isVenueManager ? (
        // If the user is not a venue manager, show the "Become a Venue Manager" button
        <button
          onClick={handleBecomeVenueManager}
          className="flex text-sm text-center border-b-4 border-custom-dark md:border-custom-light px-3 sm:ms-4 md:ms-0 text-black md:text-white p-2 rounded hover:bg-custom-medium hover:text-white uppercase"
        >
          Become a Venue Manager ?
        </button>
      ) : (
        // If the user is already a venue manager, show the "Add a new venue" button
        <button
          onClick={() => openModal('createvenue')} // Opens modal to create a new venue
          className="flex text-sm text-center border-b-4 border-custom-dark md:border-custom-light px-3 sm:ms-4 md:ms-0 text-black md:text-white p-2 rounded hover:bg-custom-medium hover:text-white"
        >
          <FaPlus />
          <span className="text-xs ml-2 uppercase font-prata font-semibold md:text-white ">
            Add a new venue
          </span>
        </button>
      )}
      {/* Modal to create a new venue */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Create a new venue"
        className="justify-left"
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default VenueManager;
