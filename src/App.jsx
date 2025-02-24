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
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Track current page
  const [hasMore, setHasMore] = useState(true); // To track if there are more pages

  // Fetch listings data
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await fetchData(
          API_LISTINGS.BASE(true, true) + `&page=${page}`,
          "GET"
        );

        // Prevent duplicate listings
        setListings((prevListings) => {
          const newListings = data.data.filter(
            (newListing) =>
              !prevListings.some(
                (prevListing) => prevListing.id === newListing.id
              )
          );
          return [...prevListings, ...newListings];
        });

        // Check if there are more pages
        setHasMore(data.data.length > 0);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [page]); // Run every time the page changes

  // Load more listings when user scrolls to the bottom (optional)
  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-100 pt-16">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home listingsData={listings} />} />
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
          {hasMore && (
            <button
              onClick={handleLoadMore}
              className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
              Load More
            </button>
          )}
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
