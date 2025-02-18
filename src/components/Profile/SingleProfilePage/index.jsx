import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useApi from "../../../api/getApi";
import { apiUrl } from "../../../api/constants";
import VenueList from "../../Venues/VenueList";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";

/**
 * SingleProfilePage component displays the profile page of a user,
 * including their banner, avatar, name, email, bio, and list of venues.
 * It fetches the profile data and venue data using a custom API hook.
 * 
 * @returns {JSX.Element} The JSX representation of the profile page.
 */
function SingleProfilePage() {
  const { name } = useParams(); // Extracts the profile name from the URL parameters
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null); // State to store profile data
  const [venues, setVenues] = useState([]); // State to store venues data

  // Fetch profile data using custom API hook
  const { data: profileData, isLoading, isError } = useApi(
    `${apiUrl}/profiles/${name}`
  );
  
  // Fetch venues data using custom API hook
  const { data: venueData, isLoading: venueLoading, isError: venueError } =
    useApi(`${apiUrl}/profiles/${name}/venues`);

  /**
   * useEffect hook to update profile and venues data once the API data is available.
   */
  useEffect(() => {
    if (profileData) setProfile(profileData);
    if (venueData) setVenues(venueData);
  }, [profileData, venueData, name]);

  // Loading state
  if (isLoading || venueLoading) {
    return (
      <div className="text-center text-lg font-medium">
        <div className="spinner">Loading...</div> {/* Add spinner or skeleton loader here */}
      </div>
    );
  }

  // Error handling
  if (isError || venueError || !profile) {
    return (
      null
    );
  }

  return (
    <div className="block mx-auto w-full max-w-[1300px] mt-[80px] shadow-2xl z-0">
      <div className="relative shadow-xl">
        <img
          src={profile?.banner?.url || "/public/FallbackImg.jpg"}
          alt={profile?.banner?.alt || "Profile banner"}
          className="w-full max-h-[150px] md:max-h-[250px] object-cover"
        />
      </div>

      {/* Profile Card */}
      <div className="w-full bg-white shadow-md rounded-lg p-6">
        {/* Avatar & Name Section */}
        <div className="md:flex md:items-center md:mx-auto gap-6 z-10 max-w-[1100px]">
          {/* Avatar */}
          <div className="flex justify-center md:justify-start -mt-[30px]">
            <img
              src={profile?.avatar?.url || "/public/FallbackImg.jpg"}
              alt={profile?.avatar?.alt || "Profile Avatar"}
              className="bg-white w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-xl border-4 border-custom-medium shadow-lg object-cover -mt-12 z-10 md:max-w-[150px]"
            />
          </div>

          {/* Name & Email */}
          <div className="text-center md:text-left mt-4 md:-mt-10">
            <h2 className="text-xl font-play font-semibold text-custom-deep uppercase">
              {profile?.name}
            </h2>
            <p className="text-custom-dark font-petrona text-base mt-1">{profile?.email}</p>
          </div>

          {/* Bio Section */}
          <div className="flex justify-between mt-4 md:mt-0 md:ml-auto bg-custom-light p-8 rounded-lg">
            {/* Left Quote */}
            <ImQuotesLeft className="md:flex font-petrona text-4xl text-custom-medium mr-3 -mt-12 -ms-10" />

            <p className="text-custom-deep font-bold italic text-sm text-center md:text-left">
              {profile?.bio || "*This user has not provided a bio/quote.*"}
            </p>

            {/* Right Quote */}
            <ImQuotesRight className="md:flex font-petrona text-4xl text-custom-medium self-end -me-12 -mb-10" />
          </div>
        </div>
      </div>

      {/* Venues Section */}
      <div className="profile-venues flex flex-wrap mx-auto justify-center text-center pt-3 my-3 md:border-t-4 md:border-custom-medium">
        <h2 className="text-lg text-custom-deep font-bold mb-4 p-2 font-prata uppercase">
          {profile?.name}'s Venues
        </h2>
        <VenueList venues={venues} />
      </div>
    </div>
  );
}

export default SingleProfilePage;
