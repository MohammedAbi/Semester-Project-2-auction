import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../utils/fetchUtils.mjs";
import { API_LISTINGS } from "../api/routes.mjs";

function Create({ profileData, listings = [] }) {
  const navigate = useNavigate();
  const { id } = useParams();

  // Determine which source of listings to use.
  // If profileData is provided, use its listings; otherwise, fall back to the passed listings.
  const sourceListings = profileData ? profileData.listings : listings;
  const existingListing = sourceListings.find((listing) => listing.id === id);

  // Initialize state – if editing (existingListing exists), form will be populated.
  // Otherwise, it will be blank (for creation).
  const [title, setTitle] = useState(existingListing?.title || "");
  const [description, setDescription] = useState(
    existingListing?.description || ""
  );
  const [tags, setTags] = useState(existingListing?.tags.join(", ") || "");
  const [mediaUrl, setMediaUrl] = useState(
    existingListing?.media[0]?.url || ""
  );
  const [mediaAlt, setMediaAlt] = useState(
    existingListing?.media[0]?.alt || ""
  );
  const [endsAt, setEndsAt] = useState(
    existingListing?.endsAt
      ? new Date(existingListing.endsAt).toISOString().slice(0, 16)
      : ""
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only update form if editing an existing listing
    if (existingListing) {
      setTitle(existingListing.title);
      setDescription(existingListing.description);
      setTags(existingListing.tags.join(", "));
      setMediaUrl(existingListing.media[0]?.url || "");
      setMediaAlt(existingListing.media[0]?.alt || "");
      setEndsAt(
        existingListing.endsAt
          ? new Date(existingListing.endsAt).toISOString().slice(0, 16)
          : ""
      );
    }
  }, [existingListing]);

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
      const data = await fetchData(
        API_LISTINGS.CREATE,
        "POST",
        "auth",
        requestBody
      );
      console.log("Listing created:", data);
      navigate("/");
    } catch (error) {
      console.error("Failed to create listing:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        {existingListing ? "Edit Listing" : "Create New Listing"}
      </h2>
      <form onSubmit={handleSubmit}>
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
        />

        <label className="block mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          className="w-full p-2 border rounded mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          ) : existingListing ? (
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
