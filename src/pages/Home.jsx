import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
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
  updateListing,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-gray-100 pt-16">
      <Helmet>
        <title>Home | Auction House</title>
        <meta
          name="description"
          content="Welcome to Auction House – your destination for exciting auctions and bidding opportunities."
        />
      </Helmet>
      <Header />
      <Hero />
      <main className="container mx-auto p-4">
        <SearchBar setSearchQuery={setSearchQuery} />

        {/* Listings Section */}
        <HomePageListings listings={listingsData} searchQuery={searchQuery} />

        {/* Show "Load More Listings" button */}
        {hasMoreListings && auctionsData.length > 0 && !loadingAuctions && (
          <div className="flex justify-center mt-4">
            <button
              onClick={loadMoreListings}
              className="w-full sm:w-auto p-2 bg-blue-700 text-white rounded"
              disabled={loadingListings}
            >
              Load More Listings
            </button>
          </div>
        )}

        {/* Live Auctions Section */}
        <LiveAuctions listings={auctionsData} updateListing={updateListing} />

        {/* Show "Load More Auctions" button  */}
        {hasMoreAuctions && auctionsData.length > 0 && !loadingAuctions && (
          <div className="flex justify-center mt-4">
            <button
              onClick={loadMoreAuctions}
              className="w-full sm:w-auto p-2 bg-green-700 text-white rounded"
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
