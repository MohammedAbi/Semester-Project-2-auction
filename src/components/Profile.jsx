import React from "react";
import ProfilePageListings from "./ProfilePageListings";

function Profile({ profileData }) {
  if (!profileData) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <ProfilePageListings profileData={profileData} />
    </div>
  );
}

export default Profile;
