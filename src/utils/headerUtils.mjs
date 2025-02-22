/**
 * Generates headers based on the type of request.
 * @param {string} headerType - The type of header to generate ('api-key' or 'auth').
 * @returns {object} - The headers object.
 */
export const getHeaders = (headerType) => {
  const headers = {
    "Content-Type": "application/json", // Default header
  };

  // Add headers based on the headerType
  if (headerType === "api-key") {
    headers["X-API-Key"] = import.meta.env.VITE_API_KEY; // Use environment variable for API key
  } else if (headerType === "auth") {
    const token = localStorage.getItem("token"); // Get access token from localStorage
    if (!token) {
      throw new Error("No access token found");
    }
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};
