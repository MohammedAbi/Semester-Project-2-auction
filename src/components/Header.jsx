import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // for redirecting after logout

function Header({ token, user, setToken, setUser }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Toggle profile menu visibility
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  // Logout function
  const logout = () => {
    // Clear token and user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Update state to reflect logout
    setToken(null);
    setUser(null);

    // Redirect to home or login page after logging out
    navigate("/");
  };

  return (
    <header className="bg-gray-800 fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-start">
            <a href="/" className="text-2xl font-bold text-white">
              Auction House
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <a
              href="/create"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Create
            </a>
            {!token ? (
              <>
                <a
                  href="/login"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Register
                </a>
              </>
            ) : (
              // Show Profile and Logout if user is logged in
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="text-gray-300 hover:text-white focus:outline-none"
                  aria-label="Open profile menu"
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4ZM12 12C8.13401 12 4 13.3431 4 15V16C4 17.6569 8.13401 19 12 19C15.866 19 20 17.6569 20 16V15C20 13.3431 15.866 12 12 12Z"
                    />
                  </svg>
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg z-10">
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Profile settings
                    </a>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
            <a
              href="/contact"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-label="Open mobile menu"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-800 text-white p-4 space-y-4">
            <a
              href="/create"
              className="block rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Create
            </a>
            {!token ? (
              <>
                <a
                  href="/login"
                  className="block rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="block rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Register
                </a>
              </>
            ) : (
              <>
                <a
                  href="/profile"
                  className="block rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Profile
                </a>
                <button
                  onClick={logout}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left"
                >
                  Logout
                </button>
              </>
            )}
            <a
              href="/contact"
              className="block rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Contact
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
