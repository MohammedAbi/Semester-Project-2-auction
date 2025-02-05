import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Listings from "../components/Listings";


function Home({listingsData}) {
  return (
    <div className="bg-gray-100 pt-16">
      <Header />
      <Hero />
      <main className="container mx-auto p-4">
        <SearchBar />
        <Listings listings={listingsData} />
      </main>
    </div>
  );
}

export default Home;
