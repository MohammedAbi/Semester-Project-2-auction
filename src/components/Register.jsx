import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

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

  const handleSubmit = (event) => {
    event.preventDefault();

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

    setTimeout(() => {
      console.log(
        editing ? "Updating profile:" : "Registering user:",
        userData
      );
      setLoading(false);
      if (editing) {
        navigate("/profile");
      } else navigate("/login");
    }, 2000);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        {editing ? "Edit Profile" : "Register"}
      </h2>
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
          disabled={editing} // Prevent email change when editing
        />

        {!editing && (
          <>
            <label className="block mb-2">Password*</label>
            <input
              type="password"
              className="w-full p-2 border rounded mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="block mb-2">Confirm Password*</label>
            <input
              type="password"
              className="w-full p-2 border rounded mb-4"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </>
        )}

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
