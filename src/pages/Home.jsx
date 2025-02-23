import React, { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import HomePageListings from "../components/HomePageListings";
import LiveAuctions from "../components/LiveAuctions";

function Home({ listingsData }) {
  const [searchQuery, setSearchQuery] = useState(""); // Store search query

  return (
    <div className="bg-gray-100 pt-16">
      <Header />
      <Hero />
      <main className="container mx-auto p-4">
        <SearchBar setSearchQuery={setSearchQuery} />
        <HomePageListings listings={listingsData} searchQuery={searchQuery} />
        <LiveAuctions listings={listingsData} />
      </main>
    </div>
  );
}

export default Home;
