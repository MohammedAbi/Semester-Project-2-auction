import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import HomePageListings from "../components/HomePageListings";
import LiveAuctions from "../components/LiveAuctions";

function Home({ listingsData }) {
  return (
    <div className="bg-gray-100 pt-16">
      <Header />
      <Hero />
      <main className="container mx-auto p-4">
        <SearchBar />
        <HomePageListings listings={listingsData} />
        <LiveAuctions listings={listingsData} />
      </main>
    </div>
  );
}

export default Home;
