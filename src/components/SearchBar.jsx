import React from "react";

function SearchBar() {
  return (
    <div className="mb-8 relative max-w-96 mx-auto">
      <label htmlFor="search-input" className="sr-only">
        Search listings
      </label>
      <input
        type="text"
        id="search-input"
        placeholder="Search listings..."
        className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
}

export default SearchBar;
