// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import LoadingIndicator from "./LoadingIndicator";

// function Listings({ listings }) {
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 3000);
//   }, []);

//   return (
//     <section id="listings" className="mb-12">
//       <h2 className="text-3xl font-bold text-blue-700 mb-6">
//         Featured Listings
//       </h2>
//       {loading ? (
//         <div className="flex justify-center items-center min-h-screen">
//           <LoadingIndicator size="w-12 h-12" color="border-blue-700" />
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {listings.map((listing) => (
//             <div
//               key={listing.id}
//               className="bg-white shadow-lg rounded-2xl overflow-hidden"
//             >
//               <img
//                 src={listing.media[0]?.url || ""}
//                 alt={listing.media[0]?.alt || "Image"}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-gray-800">
//                   {listing.title}
//                 </h3>
//                 <p className="text-gray-600 mt-2">{listing.description}</p>
//                 <p className="text-gray-700 font-medium mt-3">
//                   Auction Ends: {new Date(listing.endsAt).toLocaleString()}
//                 </p>
//                 <div className="mt-5">
//                   <button
//                     onClick={() => navigate(`/listing/${listing.id}`)}
//                     className="w-full bg-blue-700 text-white px-5 py-3 rounded-lg hover:bg-blue-800 transition"
//                   >
//                     View Listing
//                   </button>
//                   <button
//                     onClick={() => navigate(`/edit/${listing.id}`)}
//                     className="w-full bg-gray-400 text-white px-5 py-3 mt-2 rounded-lg hover:bg-gray-500 transition"
//                   >
//                     Edit Listing
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }

// export default Listings;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import LoadingIndicator from "./LoadingIndicator";

// function Listings({ listings, isWinList }) {
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 3000);
//   }, []);

//   return (
//     <section id="listings" className="mb-12">
//       <h2 className="text-3xl font-bold text-blue-700 mb-6">
//         Featured Listings
//       </h2>
//       {loading ? (
//         <div className="flex justify-center items-center min-h-screen">
//           <LoadingIndicator size="w-12 h-12" color="border-blue-700" />
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {listings.map((listing) => (
//             <div
//               key={listing.id}
//               className="bg-white shadow-lg rounded-2xl overflow-hidden"
//             >
//               <img
//                 src={listing.media[0]?.url || ""}
//                 alt={listing.media[0]?.alt || "Image"}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-gray-800">
//                   {listing.title}
//                 </h3>
//                 <p className="text-gray-600 mt-2">{listing.description}</p>
//                 <p className="text-gray-700 font-medium mt-3">
//                   Auction Ends: {new Date(listing.endsAt).toLocaleString()}
//                 </p>
//                 <div className="mt-5">
//                   {!isWinList && (
//                     <button
//                       onClick={() => navigate(`/listing/${listing.id}`)}
//                       className="w-full bg-blue-700 text-white px-5 py-3 rounded-lg hover:bg-blue-800 transition"
//                     >
//                       View Listing
//                     </button>
//                   )}
//                   <button
//                     onClick={() => navigate(`/edit/${listing.id}`)}
//                     className="w-full bg-gray-400 text-white px-5 py-3 mt-2 rounded-lg hover:bg-gray-500 transition"
//                   >
//                     Edit Listing
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }

// export default Listings;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import LoadingIndicator from "./LoadingIndicator";

// function Listings({ listings, isWinList }) {
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 3000); // Simulate loading
//   }, []);

//   return (
//     <section id="listings" className="mb-12">
//       <h2 className="text-3xl font-bold text-blue-700 mb-6">
//         Featured Listings
//       </h2>
//       {loading ? (
//         <div className="flex justify-center items-center min-h-screen">
//           <LoadingIndicator size="w-12 h-12" color="border-blue-700" />
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {listings.map((listing) => (
//             <div
//               key={listing.id}
//               className="bg-white shadow-lg rounded-2xl overflow-hidden"
//             >
//               <img
//                 src={listing.media[0]?.url || ""}
//                 alt={listing.media[0]?.alt || "Image"}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-gray-800">
//                   {listing.title}
//                 </h3>
//                 <p className="text-gray-600 mt-2">{listing.description}</p>
//                 <p className="text-gray-700 font-medium mt-3">
//                   Auction Ends: {new Date(listing.endsAt).toLocaleString()}
//                 </p>
//                 <div className="mt-5">
//                   {/* Only show "View Listing" and "Edit Listing" for regular listings, not for wins */}
//                   {!isWinList && (
//                     <>
//                       <button
//                         onClick={() => navigate(`/listing/${listing.id}`)}
//                         className="w-full bg-blue-700 text-white px-5 py-3 rounded-lg hover:bg-blue-800 transition"
//                       >
//                         View Listing
//                       </button>
//                       <button
//                         onClick={() => navigate(`/edit/${listing.id}`)}
//                         className="w-full bg-gray-400 text-white px-5 py-3 mt-2 rounded-lg hover:bg-gray-500 transition"
//                       >
//                         Edit Listing
//                       </button>
//                     </>
//                   )}

//                   {/* For wins, just show the Edit button */}
//                   {isWinList && (
//                     <button
//                       onClick={() => navigate(`/edit/${listing.id}`)}
//                       className="w-full bg-gray-400 text-white px-5 py-3 mt-2 rounded-lg hover:bg-gray-500 transition"
//                     >
//                       Edit Listing
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }

// export default Listings;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";

function HomePageListings({ listings }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulate loading
  }, []);

  return (
    <section id="listings" className="mb-12">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">
        Featured Listings
      </h2>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <LoadingIndicator size="w-12 h-12" color="border-blue-700" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden"
            >
              <img
                src={listing.media[0]?.url || ""}
                alt={listing.media[0]?.alt || "Image"}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {listing.title}
                </h3>
                <div className="flex flex-wrap gap-2 mt-4 mb-4">
                  {listing.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-800 font-semibold px-2 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 mt-2">{listing.description}</p>
                <p className="text-gray-700 font-medium mt-3">
                  Updated At: {new Date(listing.updated).toLocaleString()}
                </p>
                <p className="text-gray-700 font-medium mt-3">
                  Auction Ends: {new Date(listing.endsAt).toLocaleString()}
                </p>
                <div className="mt-5">
                  <button
                    onClick={() => navigate(`/listing/${listing.id}`)}
                    className="w-full bg-blue-700 text-white px-5 py-3 rounded-lg hover:bg-blue-800 transition"
                  >
                    View Listing
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default HomePageListings;
