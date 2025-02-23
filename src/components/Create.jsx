import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../utils/fetchUtils.mjs";
import { API_LISTINGS } from "../api/routes.mjs";

function Create({ profileData, listings = [] }) {
  const navigate = useNavigate();
  const { id } = useParams(); // Extract ID for editing mode
  const isEditing = Boolean(id);

  // Determine source of listings
  const sourceListings = profileData ? profileData.listings : listings;
  const existingListing = sourceListings.find((listing) => listing.id === id);

  // State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaAlt, setMediaAlt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch listing if editing but not found in local data
  useEffect(() => {
    if (isEditing && !existingListing) {
      const fetchListing = async () => {
        try {
          const listingData = await fetchData(
            `${API_LISTINGS.GET}/${id}`,
            "GET",
            ["auth", "api-key"]
          );
          setTitle(listingData.title);
          setDescription(listingData.description);
          setTags(listingData.tags.join(", "));
          setMediaUrl(listingData.media[0]?.url || "");
          setMediaAlt(listingData.media[0]?.alt || "");
          setEndsAt(new Date(listingData.endsAt).toISOString().slice(0, 16));
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
        ? `${API_LISTINGS.UPDATE}/${id}`
        : API_LISTINGS.CREATE;
      const method = isEditing ? "PUT" : "POST";

      const response = await fetchData(
        endpoint,
        method,
        ["auth", "api-key"],
        requestBody
      );
      console.log("Listing saved:", response);
      navigate("/");
    } catch (error) {
      console.error("Failed to save listing:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        {isEditing ? "Edit Listing" : "Create New Listing"}
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
