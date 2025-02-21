import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { authFetch } from '../../api/auth/authFetch';
import { load } from '../../storage/load';
import { BiEdit } from 'react-icons/bi';
import { apiUrl } from '../../api/constants';
import Modal from '../../helpers/Modal';
import UpdateAvatar from '../Forms/UpdateAvatar';
import UpdateProfileForm from '../Forms/UpdateProfile';
import VenueManager from './VenueManager';
import MyVenues from '../../components/Profile/MyVenues';
import MyBookings from '../../components/Profile/MyBookings';
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im';
/**
 * ProfileDetails component displays and manages the profile details of the currently logged-in user.
 * It fetches profile data, allows users to edit their profile or avatar, and displays tabs for managing
 * venues and bookings.
 *
 * @component
 * @example
 * return (
 *   <ProfileDetails />
 * )
 *
 * @returns {JSX.Element} The ProfileDetails component
 */
const ProfileDetails = () => {
  const { name } = useParams();
  const token = localStorage.getItem('token');
  const userProfile = load('user');
  const [profile, setProfile] = useState(userProfile);
  const [isVenueManager, setIsVenueManager] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [activeTab, setActiveTab] = useState('venues');

  /**
   * useEffect hook to fetch profile data when the component mounts or the profile name changes.
   * It sets the profile data and checks if the user is a venue manager.
   */
  useEffect(() => {
    if (!profile.name) return;

    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const response = await authFetch(
          `${apiUrl}/profiles/${profile.name}?_bookings=true&_venues=true`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setProfile(data.data);
          setIsVenueManager(data.data.venueManager || false);
          if (!data.data.venueManager) {
            setActiveTab('bookings'); 
          }
        } else {
          throw new Error('Failed to fetch profile');
        }
      } catch (error) {
        setError('Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [profile.name]);

  /**
   * Opens a modal to update the profile or avatar based on the passed formType.
   *
   * @param {string} formType - The type of form to display in the modal, either "updateprofile" or "updateavatar".
   */
  const openModal = (formType) => {
    const contentMap = {
      updateprofile: <UpdateProfileForm />,
      updateavatar: <UpdateAvatar currentAvatar={profile?.avatar?.url} />,
    };

    const titleMap = {
      updateprofile: 'Update Profile',
      updateavatar: 'Update Avatar',
    };

    setModalContent(contentMap[formType] || null);
    setModalTitle(titleMap[formType] || 'Confirm Action');
    setIsModalOpen(true);
  };

  /**
   * Closes the modal.
   */
  const closeModal = () => setIsModalOpen(false);

  /**
   * Handles the tab change between "venues" and "bookings".
   *
   * @param {string} tab - The tab to switch to ("venues" or "bookings").
   */
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="block mx-auto w-full max-w-[1300px] -mt-4 shadow-2xl">
      <div className="relative shadow-xl">
        <img
          src={profile?.banner?.url || '/FallbackImg2.jpg'}
          alt={profile?.banner?.alt || 'Profile banner'}
          className="flex w-full max-h-[170px] md:max-h-[250px] object-cover"
        />
        <button
          onClick={() => openModal('updateprofile')}
          className="md:hidden absolute text-lg top-2 right-2 p-2 text-white bg-custom-dark hover:bg-custom-medium rounded-full hover:scale-110 transition-transform duration-300"
        >
          <BiEdit />
        </button>
      </div>
      <div className="block md:inline-flex w-full md:ps-10 bg-white">
        <div className="md:mx-auto md:bg-custom-medium md:min-w-[250px] md:max-w-[300px] md:flex md:flex-col md:items-center md:pb-10">
          <div className="flex ms-6 md:ms-0 md:flex-col sm:items-center md:block max-w-[100%] cursor-pointer relative">
            <img
              src={profile?.avatar?.url || '/FallbackImg2.jpg'}
              alt={profile?.avatar?.alt || 'Profile Avatar'}
              className="rounded-3xl shadow-2xl object-cover z-[10] relative w-24 h-24 -mt-8 sm:w-28 sm:h-28 md:w-32 md:h-32 sm:-mt-12 sm:text-center border border-3 border-custom-medium"
              onClick={() => openModal('updateavatar')}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                openModal('updateavatar');
              }}
              className="absolute -top-9 sm:-top-14 -left-2 text-base text-white bg-custom-dark hover:bg-custom-medium p-2 underline rounded-full z-50"
            >
              <BiEdit />
            </button>
            <div className="block m-2 md:justify-center md:mx-auto">
              <h2 className="font-petrona font-bold text-left md:text-center text-custom-deep md:text-white uppercase md:text-xl">
                {profile?.name}
              </h2>
              {isVenueManager && (
                <p className="text-left md:text-center text-xs text-custom-medium md:text-white font-bold">
                  Venue Manager
                </p>
              )}
            </div>
          </div>
          <div className="w-full mt-6 p-3 bg-white border-b-4 border-custom-dark font-petrona text-center pb-4 ">
            <h3 className="uppercase bg-custom-light text-lg font-semibold">
              Contact & Bio
            </h3>
            <p className="text-base py-2 md:py-5">{profile?.email}</p>
            <div className="flex justify-between mx-auto mt-4 md:mt-0 md:ml-auto bg-custom-light p-8 rounded-lg max-w-[500px] ">
              <ImQuotesLeft className="md:flex font-petrona text-2xl md:text-3xl text-custom-medium mr-3 -mt-12 -ms-10" />

              <p className="text-custom-deep font-petrona font-bold italic text-sm md:text-base text-center">
                {profile?.bio || '*This user has not provided a bio/quote.*'}
              </p>

              <ImQuotesRight className="md:flex font-petrona text-2xl md:text-3xl text-custom-medium self-end -me-10 -mb-10" />
            </div>
          </div>
          {/* Tab Navigation */}
          <div className="block sm:flex md:block justify-between mt-4 md:mt-0">
            {/* Venue Manager Section */}
            <div className="md:hidden">
              <VenueManager
                profile={profile}
                setProfile={setProfile}
                userId={profile.name}
              />
            </div>
            <div className="flex md:grid justify-center md:mb-10 text-center mt-6 sm:mt-3 text-play">
              {isVenueManager && (
                <button
                  onClick={() => handleTabChange('venues')}
                  className={`w-full px-6 py-2 md:w-auto md:px-4 text-base font-semibold font-play uppercase rounded-t-xl sm:w-[170px] md:border-0 md:border-b-4 md:border-custom-light ${
                    activeTab === 'venues'
                      ? 'text-white bg-custom-dark border-t-2 border-l-2 border-r-2 border-custom-dark md:bg-custom-medium '
                      : 'bg-custom-light text-custom-deep md:bg-custom-medium md:text-custom-light'
                  }`}
                >
                  My Venues
                </button>
              )}
              <button
                onClick={() => handleTabChange('bookings')}
                className={`w-full px-6 py-2 md:w-auto md:px-4 text-base font-semibold font-play uppercase rounded-t-xl sm:w-[170px] md:border-0 md:border-b-4 md:border-custom-light ${
                  activeTab === 'bookings'
                    ? 'text-white bg-custom-dark border-t-2 border-l-2 border-r-2 border-custom-dark md:bg-custom-medium'
                    : 'bg-custom-light text-custom-deep md:bg-custom-medium md:text-custom-light'
                }`}
              >
                My Bookings
              </button>
            </div>
            <div className="hidden md:block mt-15 text-center">
              <VenueManager
                profile={profile}
                setProfile={setProfile}
                userId={profile.name}
              />
              <button
                onClick={() => openModal('updateprofile')}
                className="w-full px-6 py-2 text-sm text-white font-semibold font-play uppercase rounded-t-xl min-w-[150px] md:bg-custom-medium border-b-4 border-custom-light hover:scale-110 transition-transform duration-300"
              >
                Edit profile
              </button>
            </div>
          </div>
        </div>
        {/* Render Tab Content */}
        <div className="w-full block md:my-4 pb-10 overflow-x-auto border-t-4 border-b-4 border-custom-dark">
          {isVenueManager && activeTab === 'venues' && <MyVenues />}
          {activeTab === 'bookings' && <MyBookings />}
        </div>
      </div>
      {/* Modal for updating profile or avatar */}
      <Modal 
      title={modalTitle} 
      isOpen={isModalOpen} 
      onClose={closeModal}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default ProfileDetails;
