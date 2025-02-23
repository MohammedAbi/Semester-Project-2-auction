export const getHeaders = (headerTypes = []) => {
  const headers = {
    "Content-Type": "application/json",
  };

  // Add API Key if required
  if (headerTypes.includes("api-key")) {
    headers["X-Noroff-API-Key"] = import.meta.env.VITE_API_KEY; // Use environment variable for API key
  }

  // Add Authorization Token if required
  if (headerTypes.includes("auth")) {
    const token = localStorage.getItem("token"); // Get access token from localStorage
    if (!token) {
      throw new Error("No access token found");
    }

    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};
