import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";

function HomePageListings({ listings, searchQuery }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulate loading
  }, []);

  // Filter listings based on the search query
  const filteredListings = listings.filter(
    (listing) =>
      listing?.title?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      listing?.description?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  return (
    <section id="listings" className="mb-12">
      <h2 className="text-3xl font-bold mb-6">Featured Listings</h2>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <LoadingIndicator size="w-12 h-12" color="border-blue-700" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
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
                  <p className="text-gray-600 mt-2">{listing.description}</p>
                  <div className="flex items-center justify-start space-x-4 mt-2 bg-white">
                    <img
                      src={
                        listing.seller?.avatar?.url ||
                        "https://via.placeholder.com/150"
                      }
                      alt={listing.seller?.avatar?.alt || "User Avatar"}
                      className="w-10 h-10 rounded-full border"
                    />
                    <p className="text-sm font-normal text-gray-800">
                      Seller: {listing.seller?.name}
                    </p>
                  </div>
                  <p className="text-gray-700 font-medium mt-3">
                    Created At: {new Date(listing.created).toLocaleString()}
                  </p>
                  <p className="text-gray-700 font-medium mt-3">
                    Updated At: {new Date(listing.updated).toLocaleString()}
                  </p>
                  <p className="text-gray-700 font-bold text-sm mt-3">
                    Auction Ends: {new Date(listing.endsAt).toLocaleString()}
                  </p>
                  <div className="mt-5">
                    <button
                      onClick={() => navigate(`/listing/${listing.id}`)}
                      className="w-full bg-blue-700 text-white px-5 py-3 rounded-lg hover:bg-blue-800 transition"
                    >
                      View Listing
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No listings found</p>
          )}
        </div>
      )}
    </section>
  );
}

export default HomePageListings;
