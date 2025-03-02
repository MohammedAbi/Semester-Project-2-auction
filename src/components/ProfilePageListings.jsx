import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";

function ProfilePageListings({ profileData }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading to false when profileData is available
    if (profileData) {
      setLoading(false);
    }
  }, [profileData]);

  const {
    name,
    email,
    bio,
    avatar,
    banner,
    credits,
    listings = [],
    wins = [],
    _count = { listings: listings.length, wins: wins.length },
  } = profileData;

  return (
    <div className="flex-grow container mx-auto bg-gray-100 rounded-lg">
      {/* Loading Indicator */}
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <LoadingIndicator size="w-12 h-12" color="border-blue-700" />
        </div>
      ) : (
        <>
          <div className="bg-white pb-4 pt-0 rounded-lg">
            {/* Banner */}
            <div
              className="w-full h-32 bg-blue-700 rounded-lg flex items-center justify-center"
              style={{
                backgroundImage: `url(${banner?.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {!banner?.url && (
                <span className="text-white text-lg font-semibold">
                  {banner?.alt || "Profile Banner"}
                </span>
              )}
            </div>
            {/* Avatar & Info */}
            <div className="flex items-center space-x-4 mt-4 p-6 bg-white">
              <img
                src={avatar?.url || "https://via.placeholder.com/150"}
                alt={avatar?.alt || "User Avatar"}
                className="w-20 h-20 rounded-full border"
              />
              <div>
                <h2 className="text-2xl font-bold">{name}</h2>
                <p className="text-gray-600">{email}</p>
              </div>
            </div>
            {/* Bio & Credits */}
            <div className="mb-6 bg-white p-6">
              <h3 className="text-xl font-semibold">Bio</h3>
              <p className="text-gray-700 mt-2">{bio}</p>
              <p className="text-gray-600 font-semibold mt-4">
                Credits: {credits}$
              </p>
              {/* Edit Profile Button */}
              <button
                className="bg-blue-700 w-full sm:w-auto text-white p-6 rounded-lg hover:bg-blue-800 mt-6"
                onClick={() =>
                  navigate("/register", { state: { profileData } })
                }
              >
                Edit Profile
              </button>
            </div>
          </div>

          <div className="mt-6 mb-6">
            {/* Listings */}
            <div className="mt-6 mb-6 p-6">
              <h3 className="text-3xl font-bold mb-6">My Listings</h3>
              {listings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                  {listings.map((listing) => (
                    <div
                      key={listing.id}
                      className="bg-white shadow-lg rounded-2xl overflow-hidden"
                    >
                      <img
                        src={listing.media[0]?.url || ""}
                        alt={listing.media[0]?.alt || "Image"}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {listing.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-4 mb-4">
                          {listing.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gray-200 text-gray-800 font-semibold px-2 py-1 rounded-full text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-gray-600 mt-2">
                          {listing.description}
                        </p>
                        <p className="text-gray-700 font-medium mt-3">
                          Created: {new Date(listing.created).toLocaleString()}
                        </p>
                        <p className="text-gray-700 font-medium mt-3">
                          Updated: {new Date(listing.updated).toLocaleString()}
                        </p>
                        <p className="text-gray-800 font-bold text-sm mt-3">
                          Auction Ends:{" "}
                          {new Date(listing.endsAt).toLocaleString()}
                        </p>
                        <div className="mt-5">
                          <button
                            onClick={() => navigate(`/edit/${listing.id}`)}
                            className="w-full bg-gray-600 text-white font-semibold px-5 py-3 rounded-lg hover:bg-gray-500 transition"
                          >
                            Edit Listing
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No listings available.</p>
              )}
            </div>

            {/* Wins */}
            <div className="mt-6 mb-6 p-6">
              <h3 className="text-3xl font-bold mb-6">My Wins</h3>
              {wins.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                  {wins.map((win) => (
                    <div
                      key={win.id}
                      className="bg-white shadow-lg rounded-2xl overflow-hidden"
                    >
                      <img
                        src={win.media[0]?.url || ""}
                        alt={win.media[0]?.alt || "Image"}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {win.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-4 mb-4">
                          {win.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gray-200 text-gray-800 font-semibold px-2 py-1 rounded-full text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-gray-600 mt-2">{win.description}</p>
                        <p className="text-gray-800 font-bold text-sm mt-3">
                          Won on: {new Date(win.endsAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No wins available.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfilePageListings;
