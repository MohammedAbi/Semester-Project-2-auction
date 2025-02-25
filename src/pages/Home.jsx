import React, { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import HomePageListings from "../components/HomePageListings";
import LiveAuctions from "../components/LiveAuctions";

function Home({
  listingsData,
  auctionsData,
  loadMoreListings,
  loadMoreAuctions,
  hasMoreListings,
  hasMoreAuctions,
  loadingListings,
  loadingAuctions,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-gray-100 pt-16">
      <Header />
      <Hero />
      <main className="container mx-auto p-4">
        <SearchBar setSearchQuery={setSearchQuery} />

        {/* Listings Section */}
        <HomePageListings listings={listingsData} searchQuery={searchQuery} />

        {/* Show "Load More Listings" button */}
        {hasMoreListings && !loadingListings && listingsData.length > 0 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={loadMoreListings}
              className="w-full sm:w-auto p-2 bg-blue-500 text-white rounded"
              disabled={loadingListings}
            >
              Load More Listings
            </button>
          </div>
        )}

        {/* Live Auctions Section */}
        <LiveAuctions listings={auctionsData} />

        {/* Show "Load More Auctions" button  */}
        {hasMoreAuctions && !loadingAuctions && auctionsData.length > 0 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={loadMoreAuctions}
              className="w-full sm:w-auto p-2 bg-green-500 text-white rounded"
              disabled={loadingAuctions}
            >
              Load More Auctions
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
