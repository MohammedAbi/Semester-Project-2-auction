import React, { useEffect, useState } from "react";
import ValidateBid from "../validation/ValidateBid";
import LoadingIndicator from "../LoadingIndicator";

function BidModal({ listing, onClose, onSubmit }) {
  const [bidAmount, setBidAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleBidChange = (e) => {
    setBidAmount(e.target.value);
    setError("");
  };

  const handleSubmit = () => {
    const latestBid =
      listing?.bids?.length > 0
        ? listing.bids[listing.bids.length - 1].amount
        : 0;
    const bid = parseFloat(bidAmount);

    const validationError = ValidateBid(bid, latestBid);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      onSubmit(bid);
      console.log(`Bid placed: $${bid} on listing ${listing.id}`);
      setLoading(false);
      onClose();
    }, 4000);
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
