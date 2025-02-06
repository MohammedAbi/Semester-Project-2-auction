import React, { useState } from "react";
import ValidateBid from "./validation/ValidateBid";

function LiveAuctions({ listings = [] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [error, setError] = useState("");

  const openModal = (listing) => {
    setSelectedListing(listing);
    setBidAmount("");
    setError("");
    setModalOpen(true);
  };
  const closeModal = () => {
    setSelectedListing(null);
    setModalOpen(false);
  };

  const handleBidChange = (e) => {
    setBidAmount(e.target.value);
    setError("");
  };

  const handleBidSubmit = (e) => {
    if (!selectedListing) return;

    const latestBid =
      selectedListing.bids.length > 0
        ? selectedListing.bids[selectedListing.bids.length - 1].amount
        : 0;
    const bid = parseFloat(bidAmount);
    const validationError = ValidateBid(bid, latestBid);

    if (validationError) {
      setError(validationError);
      return;
    }
    console.log(`Bid placed: $${bid} on listing ${selectedListing.id}`);
    closeModal();
  };

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6">Live Auctions</h2>
      {listings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={listing.media[0]?.url || ""}
                alt={listing.media[0]?.alt || "Image"}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">{listing.title}</h3>
                <p className="text-gray-600">{listing.description}</p>
                <div className="flex items-center mt-2">
                  <img
                    src={listing.seller.avatar?.url || ""}
                    alt={listing.seller.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <p className="text-gray-800">Seller: {listing.seller.name}</p>
                </div>
                <div className="mt-2">
                  <p className="text-gray-800 font-bold">
                    Current Bids: {listing._count.bids}
                  </p>
                  {listing.bids.length > 0 ? (
                    <p className="text-gray-600">
                      Latest Bid: $
                      {listing.bids[listing.bids.length - 1].amount} by{" "}
                      {listing.bids[listing.bids.length - 1].bidder.name}
                    </p>
                  ) : (
                    <p className="text-gray-600">No bids yet</p>
                  )}
                </div>
                <p className="text-gray-600 mt-2">
                  Auction Ends: {new Date(listing.endsAt).toLocaleString()}
                </p>

                <button
                  onClick={() => openModal(listing)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                >
                  Place Bid
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">
          No live auctions available at the moment.
        </p>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Place a Bid</h3>
            <p className="text-gray-600">
              Bidding on: {selectedListing?.title}
            </p>
            <p className="text-gray-800 font-bold">
              Latest Bid: $
              {selectedListing?.bids.length > 0
                ? selectedListing.bids[selectedListing.bids.length - 1].amount
                : 0}
            </p>
            <input
              type="number"
              value={bidAmount}
              onChange={handleBidChange}
              className="w-full px-3 py-2 border rounded-md mt-4"
              placeholder="Enter bid amount"
              min={
                selectedListing?.bids?.length > 0
                  ? selectedListing.bids[selectedListing.bids.length - 1]
                      .amount + 1
                  : 1
              }
            />

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            <div className="flex justify-end mt-4">
              <button
                className="mr-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={handleBidSubmit}
              >
                Submit Bid
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default LiveAuctions;
