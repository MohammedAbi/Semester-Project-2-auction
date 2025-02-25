import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ListingView from "./components/ListingView";
import Footer from "./components/Footer";
import Create from "./components/Create";
import Login from "./components/login/Login";
import Contact from "./components/Contact";
import Register from "./components/register/Register";
import { fetchData } from "./utils/fetchUtils.mjs";
import { API_LISTINGS } from "./api/routes.mjs";
import Profile from "./components/Profile";

function App() {
  // Listings (Buy Now)
  const [listings, setListings] = useState([]);
  const [listingsPage, setListingsPage] = useState(1);
  const [hasMoreListings, setHasMoreListings] = useState(true);
  const [loadingListings, setLoadingListings] = useState(false);

  // Auctions
  const [auctions, setAuctions] = useState([]);
  const [auctionsPage, setAuctionsPage] = useState(1);
  const [hasMoreAuctions, setHasMoreAuctions] = useState(true);
  const [loadingAuctions, setLoadingAuctions] = useState(false);

  // Fetch Listings (Buy Now)
  useEffect(() => {
    const fetchListings = async () => {
      setLoadingListings(true);
      try {
        const data = await fetchData(
          API_LISTINGS.BASE(true, true) +
            `&_active=true&limit=9&page=${listingsPage}`,
          "GET"
        );

        setListings((prev) => {
          const newItems = data.data.filter(
            (item) => !prev.some((prevItem) => prevItem.id === item.id)
          );
          return [...prev, ...newItems];
        });

        setHasMoreListings(data.data.length === 9);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoadingListings(false);
      }
    };

    fetchListings();
  }, [listingsPage]);

  // Fetch Live Auctions
  useEffect(() => {
    const fetchAuctions = async () => {
      setLoadingAuctions(true);
      try {
        const data = await fetchData(
          API_LISTINGS.BASE(true, true) +
            `&_active=true&limit=9&page=${auctionsPage}`,
          "GET"
        );

        setAuctions((prev) => {
          const newItems = data.data.filter(
            (item) => !prev.some((prevItem) => prevItem.id === item.id)
          );
          return [...prev, ...newItems];
        });

        setHasMoreAuctions(data.data.length === 9);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      } finally {
        setLoadingAuctions(false);
      }
    };

    fetchAuctions();
  }, [auctionsPage]);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-100 pt-16">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  listingsData={listings}
                  auctionsData={auctions}
                  loadMoreListings={() => setListingsPage((prev) => prev + 1)}
                  loadMoreAuctions={() => setAuctionsPage((prev) => prev + 1)}
                  hasMoreListings={hasMoreListings}
                  hasMoreAuctions={hasMoreAuctions}
                  loadingListings={loadingListings}
                  state
                  for
                  listings
                  loadingAuctions={loadingAuctions}
                />
              }
            />
            <Route
              path="/listing/:id"
              element={<ListingView listings={listings} />}
            />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:id" element={<Create />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
