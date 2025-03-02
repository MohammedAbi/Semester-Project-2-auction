import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from "../../utils/fetchUtils.mjs";
import { API_AUTH } from "../../api/routes.mjs";
import { setLocaStorage } from "../../utils/localStorageUtils.mjs";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const body = { email, password };
      const response = await fetchData(
        API_AUTH.LOGIN,
        "POST",
        [null, null],
        body
      );

      console.log("API Response:", response);

      if (response.errors) {
        throw new Error(response.errors[0]?.message || "Login failed");
      }

      if (response.data?.accessToken) {
        setLocaStorage("token", response.data.accessToken);
        setLocaStorage("user", JSON.stringify(response.data));
        navigate("/");
      } else {
        throw new Error("Invalid login credentials.");
      }
    } catch (error) {
      setError(error.message);
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
      <Helmet>
        <title>Login | Auction House</title>
        <meta
          name="description"
          content="Log in to Auction House to bid on items and manage your account."
        />
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
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
        />

        <label className="block mb-2" htmlFor="password">
          Password*
        </label>
        <input
          type="password"
          id="password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
              Logging in...
            </span>
          ) : (
            "Login"
          )}
        </button>
      </form>
      <div className="text-center mt-4">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-700 font-normal hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
