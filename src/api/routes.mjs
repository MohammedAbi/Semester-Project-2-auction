export const API_BASE_URL = "https://v2.api.noroff.dev";

// Authentication Endpoints
export const API_AUTH = {
  BASE: `${API_BASE_URL}/auth`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
};

// Listings Endpoints
export const API_LISTINGS = {
  BASE: (includeSeller = false, includeBids = false) =>
    `${API_BASE_URL}/auction/listings?_seller=${includeSeller}&_bids=${includeBids}`,
  SINGLE: (id) => `${API_BASE_URL}/auction/listings/${id}`,
  FILTER: (tag, active) =>
    `${API_BASE_URL}/auction/listings?_tag=${tag}&_active=${active}`,
  CREATE: `${API_BASE_URL}/auction/listings`,
  UPDATE: (id) => `${API_BASE_URL}/auction/listings/${id}`,
  DELETE: (id) => `${API_BASE_URL}/auction/listings/${id}`,
  BID: (id) => `${API_BASE_URL}/auction/listings/${id}/bids`,
  SEARCH: (query) => `${API_BASE_URL}/auction/listings/search?q=${query}`,
};
