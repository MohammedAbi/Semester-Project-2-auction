import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BidModal from "./model/BidModal";
import { fetchData } from "../utils/fetchUtils.mjs";
import { API_LISTINGS } from "../api/routes.mjs";
import { getUser } from "../utils/localStorageUtils.mjs";

function ListingView({ listings, updateListing }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  const listing = listings.find((item) => item.id === id);

  if (!listing) {
    return (
      <p className="text-center text-red-600 font-semibold">
        Listing not found.
      </p>
    );
  }

  const openModal = () => {
    setSelectedListing(listing);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedListing(null);
  };

  // In ListingView and LiveAuctions
  const handleBidSubmit = async (bidAmount) => {
    try {
      const user = getUser(); // Get the user object from localStorage
      const userName = user?.name;
      console.log("User name:", userName);

      const response = await fetchData(
        API_LISTINGS.BID(selectedListing.id),
        "POST",
        ["api-key", "auth"],
        { amount: bidAmount }
      );

      if (response.success) {
        const newBid = { amount: bidAmount, bidder: { name: userName } };
        const updatedListing = {
          ...selectedListing,
          bids: [...selectedListing.bids, newBid], // Add the new bid to the bids array
        };

        updateListing(selectedListing.id, updatedListing); // Ensure this updates state in parent
        setSelectedListing(updatedListing); // Update local state immediately
        closeModal();
      } else {
        console.log("Bid placement failed", response);
      }
    } catch (error) {
      console.error("Error placing bid:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-2xl">
      <button
        onClick={() => navigate("/")}
        className="mb-5 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
      >
        Back to Listings
      </button>
      <img
        src={listing.media[0]?.url || ""}
        alt={listing.media[0]?.alt || "Listing Image"}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h2 className="text-3xl font-bold text-gray-900 mt-5">{listing.title}</h2>
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
      <p className="text-gray-700 mt-3">{listing.description}</p>
      <p className="text-gray-900 font-semibold mt-4">
        Current Bids: {listing._count.bids}
      </p>
      {listing?.bids?.length > 0 ? (
        <p className="text-gray-700 mt-2">
          Latest Bid:{" "}
          <span className="font-semibold">
            ${listing.bids[listing.bids.length - 1].amount}
          </span>{" "}
          by {listing.bids[listing.bids.length - 1].bidder.name}
        </p>
      ) : (
        <p className="text-gray-600 mt-2">No bids yet</p>
      )}
      <p className="text-gray-700 font-medium mt-3">
        Auction Ends: {new Date(listing.endsAt).toLocaleString()}
      </p>

      {/* Place Bid Button */}
      <button
        onClick={openModal}
        className="mt-6 w-full bg-blue-700 text-white px-5 py-3 rounded-lg hover:bg-blue-800 transition"
      >
        Place Bid
      </button>

      {/* Bid Modal */}
      {modalOpen && (
        <BidModal
          listing={selectedListing}
          updateListing={updateListing}
          onClose={closeModal}
          onSubmit={handleBidSubmit}
        />
      )}
    </div>
  );
}

export default ListingView;
