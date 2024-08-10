import axios from 'axios';

// Use ReqRes API URL
const API_URL = 'https://reqres.in/api';

// Sign In function
export const signIn = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // { token: "..." }
  } catch (error) {
    // Handle errors from server
    throw new Error(error.response ? error.response.data.error : error.message);
  }
};

// Sign Up function
export const signUp = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    return response.data; // { token: "..." }
  } catch (error) {
    // Handle errors from server
    throw new Error(error.response ? error.response.data.error : error.message);
  }
};

// Fetch User Data function (if needed)
export const fetchUserData = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data; // { data: { user: {...} } }
  } catch (error) {
    // Handle errors from server
    throw new Error(error.response ? error.response.data.error : error.message);
  }
};
