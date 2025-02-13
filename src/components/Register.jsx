import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("John Doe"); // Test name
  const [email, setEmail] = useState("johndoe@example.com"); // Test email
  const [password, setPassword] = useState("TestPassword123"); // Test password
  const [bio, setBio] = useState("This is my profile bio"); // Test bio
  const [avatarUrl, setAvatarUrl] = useState(
    "https://img.service.com/avatar.jpg"
  ); // Test avatar URL
  const [avatarAlt, setAvatarAlt] = useState("My avatar alt text"); // Test avatar alt text
  const [bannerUrl, setBannerUrl] = useState(
    "https://img.service.com/banner.jpg"
  ); // Test banner URL
  const [bannerAlt, setBannerAlt] = useState("My banner alt text"); // Test banner alt text
  const [venueManager, setVenueManager] = useState(true); // Test venueManager as true
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const userData = {
      name,
      email,
      password,
      bio,
      avatar: {
        url: avatarUrl,
        alt: avatarAlt,
      },
      banner: {
        url: bannerUrl,
        alt: bannerAlt,
      },
      venueManager,
    };

    // Simulate registration request with a timeout
    setTimeout(() => {
      console.log("Registering user:", userData);
      setLoading(false);
      navigate("/"); // Redirect to the dashboard after successful registration
    }, 2000);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Name*</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="block mb-2">Email*</label>
        <input
          type="email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2">Password*</label>
        <input
          type="password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label className="block mb-2">Bio (optional)</label>
        <textarea
          className="w-full p-2 border rounded mb-4"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <label className="block mb-2">Avatar URL (optional)</label>
        <input
          type="url"
          className="w-full p-2 border rounded mb-4"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />

        <label className="block mb-2">Avatar Alt Text (optional)</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={avatarAlt}
          onChange={(e) => setAvatarAlt(e.target.value)}
        />

        <label className="block mb-2">Banner URL (optional)</label>
        <input
          type="url"
          className="w-full p-2 border rounded mb-4"
          value={bannerUrl}
          onChange={(e) => setBannerUrl(e.target.value)}
        />

        <label className="block mb-2">Banner Alt Text (optional)</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={bannerAlt}
          onChange={(e) => setBannerAlt(e.target.value)}
        />

        <label className="block mb-2">Venue Manager (optional)</label>
        <input
          type="checkbox"
          className="mb-4"
          checked={venueManager}
          onChange={(e) => setVenueManager(e.target.checked)}
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
              Registering...
            </span>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </div>
  );
}

export default Register;
