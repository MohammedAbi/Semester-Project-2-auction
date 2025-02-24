// import React from "react";
// import ProfilePageListings from "./ProfilePageListings";

// function Profile({ profileData }) {
//   if (!profileData) {
//     return <div className="text-center mt-10">Loading profile...</div>;
//   }

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <ProfilePageListings profileData={profileData} />
//     </div>
//   );
// }

// export default Profile;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePageListings from "./ProfilePageListings";
import { API_PROFILES } from "../api/routes.mjs";  // Import your API routes
import { fetchData } from "../utils/fetchUtils.mjs"; // Assuming fetchData utility is set up to make API calls

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProfileData = JSON.parse(localStorage.getItem("user"));
    const accessToken = localStorage.getItem("token");

    if (!storedProfileData || !accessToken) {
      navigate("/login");
      return;
    }

    const userName = storedProfileData.name;

    const fetchProfileData = async () => {
      try {
        const profileResponse = await fetchData(API_PROFILES.SINGLE(userName), "GET", ["api-key", "auth"]);
        const listingsResponse = await fetchData(API_PROFILES.LISTINGS(userName), "GET", ["api-key", "auth"]);
        const winsResponse = await fetchData(API_PROFILES.WINS(userName), "GET", ["api-key", "auth"]);

        setProfileData({
          ...profileResponse.data,
          listings: listingsResponse.data,
          wins: winsResponse.data,
          _count: { listings: listingsResponse.data.length, wins: winsResponse.data.length },
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate]);

  if (loading) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <ProfilePageListings profileData={profileData} />
    </div>
  );
}

export default Profile;

