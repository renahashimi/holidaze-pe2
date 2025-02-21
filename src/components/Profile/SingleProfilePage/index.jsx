import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import useApi from "../../../api/getApi";
import { apiUrl } from "../../../api/constants";
import VenueList from "../../Venues/VenueList";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";

/**
 * Component for displaying a single user profile page.
 * Fetches and displays user profile information and their venues.
 * @returns {JSX.Element} The profile page component.
 */
function SingleProfilePage() {
  const { name } = useParams();
  const [profile, setProfile] = useState(null);
  const [venues, setVenues] = useState([]);
  const token = localStorage.getItem("token");

  /** Fetch profile and venue data using custom API hook */
  const { data: profileData, isLoading, isError } = useApi(`${apiUrl}/profiles/${name}`);
  const { data: venueData, isLoading: venueLoading, isError: venueError } = useApi(`${apiUrl}/profiles/${name}/venues`);

  useEffect(() => {
    if (profileData) setProfile(profileData);
    if (venueData) setVenues(venueData);
  }, [profileData, venueData]);

  /** If user is not logged in, show login/register prompt */
  if (!token) {
    return (
      <div className="m-auto text-center mt-[160px] max-w-[450px]">
        <p className="text-xl font-prata p-3 font-semibold">
          Please log in or create an account to access your profile and view your content.
        </p>
        <div className="mt-4 uppercase font-petrona text-xl">
          <Link to="/login" className="text-custom-deep font-bold px-2 border-b-4 border-custom-medium hover:bg-custom-light hover:pt-2 mr-10">
            Login
          </Link>
          <Link to="/register" className="text-custom-deep font-bold px-2 border-b-4 border-custom-medium hover:bg-custom-light hover:pt-2">
            Register
          </Link>
        </div>
      </div>
    );
  }

  /** Show loading state while data is being fetched */
  if (isLoading || venueLoading) {
    return (
      <div className="text-center text-lg font-medium">
        <div className="spinner">Loading...</div>
      </div>
    );
  }

  /** Show error message if data fetching fails */
  if (isError || venueError || !profile) {
    return (
      <div className="text-center text-lg text-red-600 font-medium">
        <p>Error loading profile. Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{profile?.name}´s Profile | Holidaze</title>
      </Helmet>

      <div className="block mx-auto w-full max-w-[1300px] mt-[60px] shadow-2xl z-0">
        {/* Profile Banner */}
        <div className="relative shadow-xl">
          <img
            src={profile?.banner?.url || `${process.env.PUBLIC_URL}/FallbackImg.jpg`}
            alt={profile?.banner?.alt || "Profile banner"}
            className="w-full max-h-[150px] md:max-h-[250px] object-cover"
          />
        </div>

        {/* Profile Info Section */}
        <div className="w-full bg-white shadow-md rounded-lg p-6">
          <div className="md:flex md:items-center md:mx-auto gap-6 z-10 max-w-[1100px]">
            <div className="flex justify-center md:justify-start -mt-[30px]">
              <img
                src={profile?.avatar?.url || `${process.env.PUBLIC_URL}/FallbackImg.jpg`}
                alt={profile?.avatar?.alt || "Profile Avatar"}
                className="bg-white w-28 h-28 md:w-32 md:h-32 rounded-xl border-4 border-custom-medium shadow-lg object-cover -mt-12 z-10 md:max-w-[150px]"
              />
            </div>

            <div className="text-center md:text-left mt-4 md:-mt-10">
              <h2 className="text-xl font-play font-semibold text-custom-deep uppercase">
                {profile?.name}
              </h2>
              <p className="text-custom-dark font-petrona text-base mt-1">{profile?.email}</p>
            </div>

            <div className="flex justify-between mt-4 md:mt-0 md:ml-auto bg-custom-light p-8 rounded-lg md:min-w-[350px]">
              <ImQuotesLeft className="md:flex font-petrona text-2xl md:text-4xl text-custom-medium mr-3 -mt-12 -ms-10" />
              <p className="text-custom-deep font-petrona font-bold italic text-sm md:text-base text-center md:text-left">
                {profile?.bio || "*This user has not provided a bio/quote.*"}
              </p>
              <ImQuotesRight className="md:flex font-petrona text-2xl md:text-4xl text-custom-medium self-end -me-12 -mb-10" />
            </div>
          </div>
        </div>

        {/* Profile Venues Section */}
        <div className="profile-venues flex flex-wrap mx-auto justify-center text-center pt-3 my-3 md:mt-0 md:border-t-2 md:border-custom-medium">
          <h2 className="text-lg text-custom-deep font-bold mb-4 p-2 font-prata uppercase">
            {profile?.name}'s Venues
          </h2>
          {venues.length > 0 ? (
            <VenueList venues={venues} />
          ) : (
            <p className="text-gray-500 italic">No venues available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default SingleProfilePage;
