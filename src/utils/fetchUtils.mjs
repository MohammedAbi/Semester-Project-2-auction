import { getHeaders } from "./headerUtils.mjs";

/**
 * A reusable fetch utility function.
 * @param {string} url - The API endpoint URL.
 * @param {string} method - The HTTP method (e.g., GET, POST, PUT, DELETE).
 * @param {string} headerType - The type of headers ('api-key' or 'auth').
 * @param {object} body - The request body (for POST, PUT, etc.).
 * @returns {Promise} - The response data.
 */
export const fetchData = async (url, method = "GET", headerType = null, body = null) => {
  try {
    const headers = getHeaders(headerType); // Get appropriate headers

    const options = {
      method,
      headers,
    };

    // Add body for POST, PUT, PATCH requests
    if (body && ["POST", "PUT", "PATCH"].includes(method)) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    // Handle non-2xx responses
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Parse JSON response
    console.log(data)
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Re-throw the error for handling in the calling function
  }
};
