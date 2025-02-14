// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Listings from "./Listings";

// function Profile({ profileData }) {
//   const navigate = useNavigate();

//   // Check if profileData exists and contains the necessary properties
//   if (!profileData) {
//     return <div className="text-center mt-10">Loading profile...</div>;
//   }

//   // Destructure profileData with default values in case certain fields are missing
//   const {
//     name,
//     email,
//     bio,
//     avatar,
//     banner,
//     credits,
//     listings = [],
//     wins = [],
//     _count = { listings: 0, wins: 0 },
//   } = profileData;

//   return (
//     <div className="max-w-3xl mx-auto bg-white p-6 shadow-lg rounded-lg">
//       {/* Banner */}
//       <div
//         className="w-full h-32 bg-blue-700 rounded-lg flex items-center justify-center"
//         style={{
//           backgroundImage: `url(${banner?.url})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         {!banner?.url && (
//           <span className="text-white text-lg font-semibold">
//             {banner?.alt || "Profile Banner"}
//           </span>
//         )}
//       </div>

//       {/* Avatar & Info */}
//       <div className="flex items-center space-x-4 mt-4">
//         <img
//           src={avatar?.url || "https://via.placeholder.com/150"}
//           alt={avatar?.alt || "User Avatar"}
//           className="w-20 h-20 rounded-full border"
//         />
//         <div>
//           <h2 className="text-2xl font-bold">{name}</h2>
//           <p className="text-gray-600">{email}</p>
//         </div>
//       </div>

//       {/* Bio & Credits */}
//       <div className="mt-6">
//         <h3 className="text-xl font-semibold">Bio</h3>
//         <p className="text-gray-700 mt-2">{bio}</p>
//         <p className="text-gray-600 font-semibold mt-4">Credits: {credits}$</p>
//       </div>

//       {/* Edit Profile Button */}
//       <button
//         className="bg-blue-700 text-white p-2 px-6 rounded-lg hover:bg-blue-800 mt-6"
//         onClick={() => navigate("/edit-profile")}
//       >
//         Edit Profile
//       </button>

//       {/* Listings */}
//       <div className="mt-10">
//         <h3 className="text-xl font-semibold">Listings ({_count.listings})</h3>
//         {listings.length > 0 ? (
//           <Listings listings={listings} />
//         ) : (
//           <p>No listings available.</p>
//         )}
//       </div>

//       {/* Wins */}
//       <div className="mt-10">
//         <h3 className="text-xl font-semibold">Wins ({_count.wins})</h3>
//         {wins.length > 0 ? (
//           <Listings listings={wins} />
//         ) : (
//           <p>No wins available.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Profile;
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
