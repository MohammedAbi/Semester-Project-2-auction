import { getHeaders } from "./headerUtils.mjs";

/**
 * A reusable fetch utility function.
 * @param {string} url - The API endpoint URL.
 * @param {string} method - The HTTP method (e.g., GET, POST, PUT, DELETE).
 * @param {string[]} headerTypes - An array specifying required headers (e.g., ['api-key', 'auth']).
 * @param {object} body - The request body (for POST, PUT, etc.).
 * @returns {Promise} - The response data.
 */
export const fetchData = async (
  url,
  method = "GET",
  headerTypes = [],
  body = null
) => {
  try {
    const headers = getHeaders(headerTypes); // Get appropriate headers
    console.log("Request Headers:", headers); // Debugging line

    const options = {
      method,
      headers,
    };

    // Add body for requests that require it
    if (body && ["POST", "PUT", "PATCH"].includes(method)) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    // Handle non-2xx responses
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Full API Error:", errorData);
      throw new Error(
        `HTTP error! Status: ${response.status} - ${errorData.message}`
      );
    }

    const data = await response.json(); // Parse JSON response
    console.log("Response Data:", data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Re-throw for handling in calling function
  }
};
