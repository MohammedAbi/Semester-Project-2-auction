import React, { useState } from "react";
import ValidateBid from "../validation/ValidateBid"; // Your validation logic
import LoadingIndicator from "../LoadingIndicator"; // Loading spinner component
import { getUser } from "../../utils/localStorageUtils.mjs";
import { useNavigate } from "react-router-dom";

function BidModal({ listing, onClose, onSubmit, updateListing }) {
  const [bidAmount, setBidAmount] = useState(""); // State to store bid input
  const [error, setError] = useState(""); // State to store error message
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [userError, setUserError] = useState(""); // State to store user login error
  const navigate = useNavigate();

  // Handle input change for the bid amount
  const handleBidChange = (e) => {
    setBidAmount(e.target.value);
    setError(""); // Clear error when user changes input
  };

  // Handle form submission for placing a bid
  const handleSubmit = async () => {
    const user = getUser(); // Get the user object from localStorage
    if (!user) {
      setUserError(
        "You must be logged in to place a bid. Redirecting to login page..."
      );
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after 3 seconds
      }, 3000);
      return; // Exit if user is not logged in
    }
    // Get the latest bid if there are any
    const latestBid =
      listing?.bids?.length > 0
        ? listing.bids[listing.bids.length - 1].amount
        : 0;

    const bid = parseFloat(bidAmount); // Parse the entered bid amount

    // Validate the bid amount
    const validationError = ValidateBid(bid, latestBid);
    if (validationError) {
      setError(validationError);
      return; // Exit if validation fails
    }

    setLoading(true); // Start loading state

    try {
      // Call onSubmit which will handle the API request for placing the bid
      const user = getUser(); // Get the user object from localStorage
      const userName = user?.name || "YOU"; // Use the name from localStorage or fallback to "YOU"
      console.log("User name:", userName);

      await onSubmit(bid);
      console.log(`Bid placed: $${bid} on listing ${listing.id}`);

      // Update the listing locally (add the new bid)
      const updatedListing = {
        ...listing,
        bids: [...listing.bids, { amount: bid, bidder: { name: userName } }],
      };

      // Call the parent function to update the listing in the global state
      updateListing(listing.id, updatedListing);
      onClose(); // Close the modal after successful bid placement
    } catch (error) {
      setError("Failed to place bid. Try again.");
      console.error("Error placing bid:", error);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-bold mb-4">Place a Bid</h3>
        <p className="text-gray-600">Bidding on: {listing.title}</p>
        <p className="text-gray-800 font-bold">
          Latest bid: $
          {listing?.bids?.length > 0
            ? listing.bids[listing.bids.length - 1].amount
            : 0}
        </p>
        <input
          type="number"
          value={bidAmount}
          onChange={handleBidChange}
          className="w-full px-3 py-2 border rounded-md mt-4"
          placeholder="Enter bid amount"
          min={
            listing?.bids?.length > 0
              ? listing.bids[listing.bids.length - 1].amount + 1
              : 1
          }
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        {userError && (
          <p className="text-red-500 text-sm mt-1">{userError}</p>
        )}{" "}
        {/* Display login error */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="mr-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading ? (
              <LoadingIndicator size="w-4 h-4" color="border-white" />
            ) : (
              "Submit Bid"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BidModal;
