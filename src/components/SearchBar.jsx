import React, { useState } from "react";

function SearchBar({ setSearchQuery }) {
  // Accept setSearchQuery as a prop
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(query); // Update the query state in parent component
    setQuery(""); // Clear the search input after submitting
  };

  return (
    <div className="mb-8 relative max-w-96 mx-auto">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search listings..."
          className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="sr-only">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
