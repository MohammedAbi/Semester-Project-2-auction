import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();
  const [name, setName] = useState("test_user");
  const [email, setEmail] = useState("test@stud.noroff.no");
  const [message, setMessage] = useState("This is a test message.");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validation checks
    if (!name || !email || !message) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(name)) {
      setError("Name can only contain letters, numbers, and underscores.");
      setLoading(false);
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/.test(email)) {
      setError("Please enter a valid stud.noroff.no email address.");
      setLoading(false);
      return;
    }

    // Simulate a successful form submission
    setTimeout(() => {
      setSuccess("Thank you for contacting us! We will get back to you soon.");
      setLoading(false);
      setName("");
      setEmail("");
      setMessage("");

      // Redirect to home page after submission
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }, 2000);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>

      <p className="mb-4 text-gray-700">
        Have any questions or need support? Fill out the form below, and we’ll
        get back to you as soon as possible.
      </p>

      {error && <div className="text-red-600 mb-4">{error}</div>}
      {success && <div className="text-green-600 mb-4">{success}</div>}

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

        <label className="block mb-2">Message*</label>
        <textarea
          className="w-full p-2 border rounded mb-4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
              Sending...
            </span>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </div>
  );
}

export default Contact;
