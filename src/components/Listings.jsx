import React from "react";

function Listings({ listings }) {
  return (
    <section id="listings" className="mb-12">
      <h2 className="text-3xl font-bold mb-6">Featured Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            key={listing.id}
          >
            <img
              src={listing.media[0]?.url || ""}
              alt={listing.media[0]?.alt || "Image"}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold">{listing.title}</h3>
              <p className="text-gray-600">{listing.description}</p>
              <div className="flex flex-wrap mt-2">
                {listing.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded-full mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center mt-2">
                <img
                  src={listing.seller.avatar?.url || ""}
                  alt={listing.seller.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <p className="text-gray-800">Seller: {listing.seller.name}</p>
              </div>
              <div>
                <p className="text-gray-800 font-bold">
                  Current Bids: {listing._count.bids}
                </p>
                {listing.bids.length > 0 ? (
                  <p className="text-gray-600">
                    Latest Bid: ${listing.bids[listing.bids.length - 1].amount}{" "}
                    by {listing.bids[listing.bids.length - 1].bidder.name}
                  </p>
                ) : (
                  <p className="text-gray-600">No bids yet</p>
                )}
              </div>
              <p className="text-gray-600 mt-2">
                Updated: {new Date(listing.updated).toLocaleString()}
              </p>
              <p className="text-gray-600 mt-2">
                Auction Ends: {new Date(listing.endsAt).toLocaleString()}
              </p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
                Place Bid
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Listings;
