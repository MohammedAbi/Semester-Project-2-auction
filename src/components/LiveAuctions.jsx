import React, { useEffect, useState } from "react";
import BidModal from "./model/BidModal";
import LoadingIndicator from "./LoadingIndicator";

function LiveAuctions({ listings = [] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const openModal = (listing) => {
    setSelectedListing(listing);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedListing(null);
    setLoading(false);
  };

  const handleBidSubmit = (bidAmount) => {
    setTimeout(() => {
      console.log(`Bid placed: $${bidAmount} on listing ${selectedListing.id}`);
      closeModal();
      setLoading(false);
    }, 4000);
  };

  return (
    <section id="live-auctions" className="mb-12">
      <h2 className="text-3xl font-bold mb-6">Live Auctions</h2>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <LoadingIndicator size="w-12 h-12" color="border-blue-700" />
        </div>
      ) : (
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
                <p className="text-gray-600">{listing.description}</p>

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
                <p className="text-gray-600 mt-2">
                  Updated: {new Date(listing.updated).toLocaleString()}
                </p>
                <p className="text-gray-600 mt-2 font-bold text-sm">
                  Auction Ends: {new Date(listing.endsAt).toLocaleString()}
                </p>
                <button
                  onClick={() => openModal(listing)}
                  className="mt-4 bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
                >
                  Bid Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && selectedListing && (
        <BidModal
          listing={selectedListing}
          onClose={closeModal}
          onSubmit={handleBidSubmit}
        />
      )}
    </section>
  );
}

export default LiveAuctions;
