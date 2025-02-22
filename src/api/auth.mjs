// Functions for registering, logging in, etc.

import { fetchData } from "../utils/fetchUtils.mjs";
import { API_AUTH, API_PROFILES } from "./routes.mjs";

/**
 * Register a new user
 * @param {object} userData - User data for registration
 * @returns {Promise} - API response
 */
export const registerUser = async (userData) => {
  return fetchData(API_AUTH.REGISTER, "POST", "api-key", userData);
};

/**
 * Update an existing user profile
 * @param {string} name - Name of the user to update
 * @param {object} userData - Updated user data
 * @returns {Promise} - API response
 */
export const updateProfile = async (name, userData) => {
  return fetchData(API_PROFILES.UPDATE(name), "PUT", "api-key", userData);
};
