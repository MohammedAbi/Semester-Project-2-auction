import React from "react";

function CreateListing() {
  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Listing</h2>
      <form>
        <label className="block mb-2">Title*</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter title"
        />

        <label className="block mb-2">Description</label>
        <textarea
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter description"
        ></textarea>

        <label className="block mb-2">Tags (comma-separated)</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          placeholder="e.g. art, vintage"
        />

        <label className="block mb-2">Media URL</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter image URL"
        />

        <label className="block mb-2">Media Alt Text</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter image description"
        />

        <label className="block mb-2">Ends At*</label>
        <input
          type="datetime-local"
          className="w-full p-2 border rounded mb-4"
        />

        <button
          type="button"
          className="w-full bg-blue-700 text-white p-3 rounded hover:bg-blue-800"
        >
          Create Listing
        </button>
      </form>
    </div>
  );
}

export default CreateListing;
