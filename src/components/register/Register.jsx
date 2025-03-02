import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { API_AUTH, API_PROFILES } from "../../api/routes.mjs";
import { fetchData } from "../../utils/fetchUtils.mjs";
import { registerUser, updateProfile } from "../../api/auth.mjs";

function Register({ profileData }) {
  const navigate = useNavigate();
  const location = useLocation();
  const editing = location.state?.profileData ? true : false; // Check if editing

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(profileData?.avatar?.url || "");
  const [avatarAlt, setAvatarAlt] = useState(profileData?.avatar?.alt || "");
  const [bannerUrl, setBannerUrl] = useState(profileData?.banner?.url || "");
  const [bannerAlt, setBannerAlt] = useState(profileData?.banner?.alt || "");

  const [venueManager, setVenueManager] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load profile data if editing
  useEffect(() => {
    if (editing) {
      const profileData = location.state.profileData;
      setName(profileData.name);
      setEmail(profileData.email);
      setBio(profileData.bio);
      setAvatarUrl(profileData.avatar?.url || ""); // Set defaults to empty strings if values are undefined
      setAvatarAlt(profileData.avatar?.alt || "");
      setBannerUrl(profileData.banner?.url || "");
      setBannerAlt(profileData.banner?.alt || "");
      setVenueManager(profileData.venueManager ?? false);
    }
  }, [editing, location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure passwords match
    if (!editing && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    const userData = {
      name,
      email,
      password: editing ? undefined : password,
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

    try {
      let response;
      if (editing) {
        // ✅ Include API key in header for profile update
        response = await fetchData(
          `${API_PROFILES.UPDATE(name)}`,
          "PUT",
          ["api-key", "auth"],
          userData
        );
      } else {
        // ✅ Include API key in header for user registration
        response = await fetchData(API_AUTH, "POST", ["api-key"], userData);
      }

      // Handle response - after success, navigate to login or profile
      console.log("User data:", response); // Debugging
      navigate(editing ? "/profile" : "/login");
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        {editing ? "Edit Profile" : "Register"}
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2" htmlFor="name">
          Name*
        </label>
        <input
          id="name"
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
             placeholder="Enter your name"
        />

        <label className="block mb-2" htmlFor="email">
          Email*
        </label>
        <input
          id="email"
          type="email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email address"
          disabled={editing} // Prevent email change when editing
        />

        {!editing && (
          <>
            <label className="block mb-2" htmlFor="password">
              Password*
            </label>
            <input
              id="password"
              type="password"
              className="w-full p-2 border rounded mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
            <label className="block mb-2" htmlFor="confirmPassword">
              Confirm Password*
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full p-2 border rounded mb-4"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
               placeholder="Confirm your password"
            />
          </>
        )}

        <label className="block mb-2" htmlFor="bio">
          Bio (optional)
        </label>
        <textarea
          id="bio"
          className="w-full p-2 border rounded mb-4"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about yourself (optional)"
        />

        <label className="block mb-2" htmlFor="avatarUrl">
          Avatar URL (optional)
        </label>
        <input
          id="avatarUrl"
          type="url"
          className="w-full p-2 border rounded mb-4"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
           placeholder="Enter your avatar image URL (optional)"
        />

        <label className="block mb-2" htmlFor="avatarAlt">
          Avatar Alt Text (optional)
        </label>
        <input
          id="avatarAlt"
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={avatarAlt}
          onChange={(e) => setAvatarAlt(e.target.value)}
          placeholder="Describe your avatar image (optional)"
        />

        <label className="block mb-2" htmlFor="bannerUrl">
          Banner URL (optional)
        </label>
        <input
          id="bannerUrl"
          type="url"
          className="w-full p-2 border rounded mb-4"
          value={bannerUrl}
          onChange={(e) => setBannerUrl(e.target.value)}
          placeholder="Enter your banner image URL (optional)"
        />

        <label className="block mb-2" htmlFor="bannerAlt">
          Banner Alt Text (optional)
        </label>
        <input
          id="bannerAlt"
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={bannerAlt}
          onChange={(e) => setBannerAlt(e.target.value)}
          placeholder="Describe your banner image (optional)"
        />

        <label className="block mb-2" htmlFor="venueManager">
          Venue Manager (optional)
        </label>
        <input
          id="venueManager"
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
              {editing ? "Updating..." : "Registering..."}
            </span>
          ) : editing ? (
            "Update Profile"
          ) : (
            "Register"
          )}
        </button>
      </form>

      {!editing && (
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-700 font-normal hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default Register;
