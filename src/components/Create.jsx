import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../utils/fetchUtils.mjs";
import { API_LISTINGS } from "../api/routes.mjs";
import { getUser } from "../utils/localStorageUtils.mjs";

function Create({ profileData, listings = [] }) {
  const navigate = useNavigate();
  const { id } = useParams(); // Extract ID for editing mode
  const isEditing = Boolean(id);

  // Determine source of listings
  const sourceListings = profileData ? profileData.listings : listings;
  const existingListing = sourceListings.find((listing) => listing.id === id);
  const [user, setUser] = useState(null);

  // State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaAlt, setMediaAlt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [userError, setUserError] = useState("");

  // Fetch listing if editing but not found in local data
  useEffect(() => {
    if (isEditing && !existingListing) {
      const fetchListing = async () => {
        try {
          const response = await fetch(API_LISTINGS.SINGLE(id));

          // Check if the response is ok (status 200)
          if (!response.ok) {
            const textResponse = await response.text(); // Read as text
            console.error("Error response:", textResponse); // Log error response
            throw new Error(`Failed to fetch listing: ${response.status}`);
          }

          // If the response is OK, parse it as JSON
          const listingData = await response.json();
          setTitle(listingData.data.title);
          setDescription(listingData.data.description);
          setTags(listingData.data.tags.join(", "));
          setMediaUrl(listingData.data.media[0]?.url || "");
          setMediaAlt(listingData.data.media[0]?.alt || "");
          setEndsAt(
            new Date(listingData.data.endsAt).toISOString().slice(0, 16)
          );
        } catch (error) {
          console.error("Error fetching listing:", error);
        }
      };

      fetchListing();
    } else if (existingListing) {
      setTitle(existingListing.title);
      setDescription(existingListing.description);
      setTags(existingListing.tags.join(", "));
      setMediaUrl(existingListing.media[0]?.url || "");
      setMediaAlt(existingListing.media[0]?.alt || "");
      setEndsAt(new Date(existingListing.endsAt).toISOString().slice(0, 16));
    }
  }, [id, existingListing, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestBody = {
      title,
      description,
      tags: tags.split(",").map((tag) => tag.trim()),
      media: mediaUrl ? [{ url: mediaUrl, alt: mediaAlt }] : [],
      endsAt: new Date(endsAt).toISOString(),
    };

    try {
      const endpoint = isEditing
        ? API_LISTINGS.UPDATE(id)
        : API_LISTINGS.CREATE;
      const method = isEditing ? "PUT" : "POST";

      // Assuming fetchData handles sending the request
      const response = await fetchData(
        endpoint,
        method,
        ["auth", "api-key"],
        requestBody
      );
      console.log("Listing saved:", response);
      navigate("/profile");
    } catch (error) {
      console.error("Failed to save listing:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loggedInUser = getUser(); // Get user from local storage

    if (!loggedInUser) {
      setUserError(
        "You must be logged in. Redirecting to login in 3 seconds..."
      );

      const timeout = setTimeout(() => {
        navigate("/login"); 
      }, 3000);

      return () => clearTimeout(timeout); 
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]);

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
      <Helmet>
        <title>
          {isEditing ? "Edit Listing" : "Create Listing"} | Auction House
        </title>
        <meta
          name="description"
          content="Create a new auction listing or edit an existing one at Auction House. Set your price and start bidding today!"
        />
      </Helmet>

      <h2 className="text-2xl font-bold mb-4">
        {isEditing ? "Edit Listing" : "Create New Listing"}
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Display user error inside the form */}
        {userError && (
          <p className="text-center text-red-600 font-semibold mb-4">
            {userError}
          </p>
        )}

        <label className="block mb-2" htmlFor="title">
          Title*
        </label>
        <input
          type="text"
          id="title"
          className="w-full p-2 border rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter the title of the listing"
        />

        <label className="block mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          className="w-full p-2 border rounded mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide a description of the listing"
        />

        <label className="block mb-2" htmlFor="tag">
          Tags (comma-separated)
        </label>
        <input
          id="tag"
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Enter tags, separated by commas"
        />

        <label className="block mb-2" htmlFor="mediaUrl">
          Media URL
        </label>
        <input
          id="mediaUrl"
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
          placeholder="Enter the media URL (optional)"
        />

        <label className="block mb-2" htmlFor="mediaAlt">
          Media Alt Text
        </label>
        <input
          id="mediaAlt"
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={mediaAlt}
          onChange={(e) => setMediaAlt(e.target.value)}
          placeholder="Describe the media (optional)"
        />

        <label className="block mb-2" htmlFor="ends">
          Ends At*
        </label>
        <input
          id="ends"
          type="datetime-local"
          className="w-full p-2 border rounded mb-4"
          value={endsAt}
          onChange={(e) => setEndsAt(e.target.value)}
          required
          placeholder="Select the end date and time"
        />

        <button
          type="submit"
          className="w-full bg-blue-700 text-white p-3 rounded hover:bg-blue-800 flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="white"
                  strokeWidth="4"
                  fill="none"
                ></circle>
                <path
                  className="opacity-75"
                  fill="white"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : isEditing ? (
            "Update Listing"
          ) : (
            "Create Listing"
          )}
        </button>
      </form>
    </div>
  );
}

export default Create;
