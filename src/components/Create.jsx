// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// function Create({ listings = [] }) {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const existingListing = listings.find((listing) => listing.id === id);

//   const [title, setTitle] = useState(existingListing?.title || "");
//   const [description, setDescription] = useState(
//     existingListing?.description || ""
//   );
//   const [tags, setTags] = useState(existingListing?.tags.join(", ") || "");
//   const [mediaUrl, setMediaUrl] = useState(
//     existingListing?.media[0]?.url || ""
//   );
//   const [mediaAlt, setMediaAlt] = useState(
//     existingListing?.media[0]?.alt || ""
//   );
//   const [endsAt, setEndsAt] = useState(
//     existingListing?.endsAt
//       ? new Date(existingListing.endsAt).toISOString().slice(0, 16)
//       : ""
//   );
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (existingListing) {
//       setTitle(existingListing.title);
//       setDescription(existingListing.description);
//       setTags(existingListing.tags.join(", "));
//       setMediaUrl(existingListing.media[0]?.url);
//       setMediaAlt(existingListing.media[0]?.alt);
//       setEndsAt(
//         existingListing.endsAt
//           ? new Date(existingListing.endsAt).toISOString().slice(0, 16)
//           : ""
//       );
//     }
//   }, [existingListing]);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setLoading(true);

//     const updatedListing = {
//       id: existingListing ? existingListing.id : Date.now().toString(),
//       title,
//       description,
//       tags: tags.split(",").map((tag) => tag.trim()),
//       media: [{ url: mediaUrl, alt: mediaAlt }],
//       endsAt,
//       updated: new Date().toISOString(),
//     };

//     setTimeout(() => {
//       if (existingListing) {
//         console.log("Updating Listing:", updatedListing);
//       } else {
//         console.log("Creating New Listing:", updatedListing);
//       }
//       setLoading(false);
//       navigate("/");
//     }, 4000);
//   };

//   return (
//     <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">
//         {existingListing ? "Edit Listing" : "Create Listing"}
//       </h2>
//       <form onSubmit={handleSubmit}>
//         <label className="block mb-2">Title*</label>
//         <input
//           type="text"
//           className="w-full p-2 border rounded mb-4"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />

//         <label className="block mb-2">Description</label>
//         <textarea
//           className="w-full p-2 border rounded mb-4"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         <label className="block mb-2">Tags (comma-separated)</label>
//         <input
//           type="text"
//           className="w-full p-2 border rounded mb-4"
//           value={tags}
//           onChange={(e) => setTags(e.target.value)}
//         />

//         <label className="block mb-2">Media URL</label>
//         <input
//           type="text"
//           className="w-full p-2 border rounded mb-4"
//           value={mediaUrl}
//           onChange={(e) => setMediaUrl(e.target.value)}
//         />

//         <label className="block mb-2">Media Alt Text</label>
//         <input
//           type="text"
//           className="w-full p-2 border rounded mb-4"
//           value={mediaAlt}
//           onChange={(e) => setMediaAlt(e.target.value)}
//         />

//         <label className="block mb-2">Ends At*</label>
//         <input
//           type="datetime-local"
//           className="w-full p-2 border rounded mb-4"
//           value={endsAt}
//           onChange={(e) => setEndsAt(e.target.value)}
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-700 text-white p-3 rounded hover:bg-blue-800 flex justify-center items-center"
//           disabled={loading}
//         >
//           {loading ? (
//             <span className="flex items-center">
//               <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="white"
//                   strokeWidth="4"
//                   fill="none"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="white"
//                   d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//                 ></path>
//               </svg>
//               Processing...
//             </span>
//           ) : existingListing ? (
//             "Update Listing"
//           ) : (
//             "Create Listing"
//           )}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Create;
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

  // useEffect(() => {
  //   // Re-run when id or sourceListings changes
  //   const foundListing = sourceListings.find((listing) => listing.id === id);
  //   if (foundListing) {
  //     setTitle(foundListing.title);
  //     setDescription(foundListing.description);
  //     setTags(foundListing.tags.join(", "));
  //     setMediaUrl(foundListing.media[0]?.url || "");
  //     setMediaAlt(foundListing.media[0]?.alt || "");
  //     setEndsAt(
  //       foundListing.endsAt
  //         ? new Date(foundListing.endsAt).toISOString().slice(0, 16)
  //         : ""
  //     );
  //   } else {
  //     // If no listing found, clear the form (for creating new listing)
  //     setTitle("");
  //     setDescription("");
  //     setTags("");
  //     setMediaUrl("");
  //     setMediaAlt("");
  //     setEndsAt("");
  //   }
  // }, [id, sourceListings]);
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
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const updatedListing = {
      id: existingListing ? existingListing.id : Date.now().toString(),
      title,
      description,
      tags: tags.split(",").map((tag) => tag.trim()),
      media: [{ url: mediaUrl, alt: mediaAlt }],
      endsAt,
      updated: new Date().toISOString(),
    };

    // Simulate API call delay
    setTimeout(() => {
      if (existingListing) {
        console.log("Updating Listing:", updatedListing);
      } else {
        console.log("Creating New Listing:", updatedListing);
      }
      setLoading(false);
      navigate("/profile");
    }, 4000);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        {existingListing ? "Edit Listing" : "Create Listing"}
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Title*</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="block mb-2">Description</label>
        <textarea
          className="w-full p-2 border rounded mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="block mb-2">Tags (comma-separated)</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <label className="block mb-2">Media URL</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
        />

        <label className="block mb-2">Media Alt Text</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={mediaAlt}
          onChange={(e) => setMediaAlt(e.target.value)}
        />

        <label className="block mb-2">Ends At*</label>
        <input
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
