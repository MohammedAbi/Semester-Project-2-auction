// Function to set localStorage
export const setLocaStorage = (key, value) => {
  if (value === null || value === undefined) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, value);
  }
};


// Function to get the token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};


export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;  // Ensure the object is correctly parsed
};
