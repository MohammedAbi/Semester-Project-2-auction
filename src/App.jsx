import { useEffect} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ListingView from "./components/ListingView";
import Footer from "./components/Footer";
import Create from "./components/Create";
import Login from "./components/Login";
import Register from "./components/Register";
import Contact from "./components/Contact";
import ProfilePageListings from "./components/ProfilePageListings";

const listingsData = [
  {
    id: "1",
    title: "Vintage Art Piece",
    description: "A rare collectible from the 1920s.",
    tags: ["art", "vintage"],
    media: [
      {
        url: "https://media.istockphoto.com/id/931025190/photo/justice-gavel-on-laptop-computer-keyboard.jpg?s=2048x2048&w=is&k=20&c=nWCVLxGPYbPKxJGpe_5nFMKFpb1w29nDv6pd56pveB8=",
        alt: "Vintage Art Piece",
      },
    ],
    created: "2023-10-01T00:00:00.000Z",
    updated: "2023-10-05T00:00:00.000Z",
    endsAt: "2023-12-31T23:59:59.000Z",
    seller: {
      name: "John Doe",
      email: "john.doe@example.com",
      bio: "Art collector and enthusiast.",
      avatar: {
        url: "https://randomuser.me/api/portraits/men/1.jpg",
        alt: "John Doe",
      },
      banner: {
        url: "https://example.com/banner.jpg",
        alt: "John Doe's Banner",
      },
      wins: [],
    },
    bids: [
      {
        id: "1",
        amount: 150,
        bidder: {
          name: "Jane Smith",
          email: "jane.smith@example.com",
          bio: "Antique lover.",
          avatar: {
            url: "https://randomuser.me/api/portraits/women/2.jpg",
            alt: "Jane Smith",
          },
          banner: {
            url: "https://example.com/banner.jpg",
            alt: "Jane Smith's Banner",
          },
        },
        created: "2023-10-10T12:34:56.000Z",
      },
    ],
    _count: {
      bids: 1,
    },
  },
  {
    id: "2",
    title: "Antique Clock",
    description: "A beautiful antique clock from the 1800s.",
    tags: ["antique", "clock"],
    media: [
      {
        url: "https://media.istockphoto.com/id/931025190/photo/justice-gavel-on-laptop-computer-keyboard.jpg?s=2048x2048&w=is&k=20&c=nWCVLxGPYbPKxJGpe_5nFMKFpb1w29nDv6pd56pveB8=",
        alt: "Antique Clock",
      },
    ],
    created: "2023-10-02T00:00:00.000Z",
    updated: "2023-10-06T00:00:00.000Z",
    endsAt: "2023-12-25T23:59:59.000Z",
    seller: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      bio: "Antique dealer.",
      avatar: {
        url: "https://randomuser.me/api/portraits/women/3.jpg",
        alt: "Alice Johnson",
      },
      banner: {
        url: "https://example.com/banner.jpg",
        alt: "Alice Johnson's Banner",
      },
      wins: [],
    },
    bids: [],
    _count: {
      bids: 0,
    },
  },
  {
    id: "3",
    title: "Rare Coin Collection",
    description: "A collection of rare coins from around the world.",
    tags: ["coins", "collectible"],
    media: [
      {
        url: "https://media.istockphoto.com/id/931025190/photo/justice-gavel-on-laptop-computer-keyboard.jpg?s=2048x2048&w=is&k=20&c=nWCVLxGPYbPKxJGpe_5nFMKFpb1w29nDv6pd56pveB8=",
        alt: "Rare Coin Collection",
      },
    ],
    created: "2023-10-03T00:00:00.000Z",
    updated: "2023-10-07T00:00:00.000Z",
    endsAt: "2023-12-20T23:59:59.000Z",
    seller: {
      name: "Bob Brown",
      email: "bob.brown@example.com",
      bio: "Coin collector.",
      avatar: {
        url: "https://randomuser.me/api/portraits/men/4.jpg",
        alt: "Bob Brown",
      },
      banner: {
        url: "https://example.com/banner.jpg",
        alt: "Bob Brown's Banner",
      },
      wins: [],
    },
    bids: [
      {
        id: "2",
        amount: 200,
        bidder: {
          name: "Charlie Davis",
          email: "charlie.davis@example.com",
          bio: "Numismatist.",
          avatar: {
            url: "https://randomuser.me/api/portraits/men/5.jpg",
            alt: "Charlie Davis",
          },
          banner: {
            url: "https://example.com/banner.jpg",
            alt: "Charlie Davis's Banner",
          },
        },
        created: "2023-10-11T14:22:33.000Z",
      },
    ],
    _count: {
      bids: 1,
    },
  },
];

const profileData = {
  name: "John Doe",
  email: "johndoe@example.com",
  bio: "A passionate collector of rare items.",
  avatar: {
    url: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "John's Avatar",
  },
  banner: {
    url: "https://url.com/banner.jpg",
    alt: "John's Banner",
  },
  credits: 1500,
  listings: [
    {
      id: "listing1",
      title: "Vintage Watch",
      description: "A beautiful vintage watch from the 1950s.",
      media: [
        {
          url: "https://images.unsplash.com/photo-1603303895535-83b77d40796e?q=80&w=3135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          alt: "Vintage Watch",
        },
      ],
      tags: ["watch", "vintage", "collectible"],
      created: "2025-01-01T00:00:00.000Z",
      updated: "2025-01-01T00:00:00.000Z",
      endsAt: "2025-02-01T00:00:00.000Z",
    },
    {
      id: "listing2",
      title: "Rare Painting",
      description: "A rare 18th-century painting.",
      media: [
        {
          url: "https://images.unsplash.com/photo-1581337204873-ef36aa186caa?q=80&w=2956&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          alt: "Rare Painting",
        },
      ],
      tags: ["painting", "art", "vintage"],
      created: "2025-01-05T00:00:00.000Z",
      updated: "2025-01-05T00:00:00.000Z",
      endsAt: "2025-03-01T00:00:00.000Z",
    },
    {
      id: "listing3",
      title: "Rare Painting",
      description: "A rare 18th-century painting.",
      media: [
        {
          url: "https://images.unsplash.com/photo-1581337204873-ef36aa186caa?q=80&w=2956&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          alt: "Rare Painting",
        },
      ],
      tags: ["painting", "art", "vintage"],
      created: "2025-01-05T00:00:00.000Z",
      updated: "2025-01-05T00:00:00.000Z",
      endsAt: "2025-03-01T00:00:00.000Z",
    },
  ],
  wins: [
    {
      id: "win1",
      title: "Antique Vase",
      description: "An antique vase from the Ming dynasty.",
      media: [
        {
          url: "https://images.unsplash.com/photo-1581337204873-ef36aa186caa?q=80&w=2956&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ],
      tags: ["vase", "antique", "collectible"],
      created: "2025-01-10T00:00:00.000Z",
      updated: "2025-01-10T00:00:00.000Z",
      endsAt: "2025-01-10T00:00:00.000Z",
    },
    {
      id: "win2",
      title: "Antique Vase",
      description: "An antique vase from the Ming dynasty.",
      media: [
        {
          url: "https://images.unsplash.com/photo-1581337204873-ef36aa186caa?q=80&w=2956&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ],
      tags: ["vase", "antique", "collectible"],
      created: "2025-01-10T00:00:00.000Z",
      updated: "2025-01-10T00:00:00.000Z",
      endsAt: "2025-01-10T00:00:00.000Z",
    },
    {
      id: "win3",
      title: "Antique Vase",
      description: "An antique vase from the Ming dynasty.",
      media: [
        {
          url: "https://images.unsplash.com/photo-1581337204873-ef36aa186caa?q=80&w=2956&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ],
      tags: ["vase", "antique", "collectible"],
      created: "2025-01-10T00:00:00.000Z",
      updated: "2025-01-10T00:00:00.000Z",
      endsAt: "2025-01-10T00:00:00.000Z",
    },
    {
      id: "win4",
      title: "Antique Vase",
      description: "An antique vase from the Ming dynasty.",
      media: [
        {
          url: "https://images.unsplash.com/photo-1581337204873-ef36aa186caa?q=80&w=2956&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ],
      tags: ["vase", "antique", "collectible"],
      created: "2025-01-10T00:00:00.000Z",
      updated: "2025-01-10T00:00:00.000Z",
      endsAt: "2025-01-10T00:00:00.000Z",
    },
  ],
};

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-100 pt-16">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home listingsData={listingsData} />} />
            <Route
              path="/listing/:id"
              element={<ListingView listings={listingsData} />}
            />
            <Route path="/create" element={<Create />} />
            <Route
              path="/edit/:id"
              element={<Create profileData={profileData} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/profile"
              element={<ProfilePageListings profileData={profileData} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
