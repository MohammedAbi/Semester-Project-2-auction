// Function to set localStorage
export const setLocaStorage = (key, value) => {
  localStorage.setItem(key, value);
};

// Function to get the token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};
