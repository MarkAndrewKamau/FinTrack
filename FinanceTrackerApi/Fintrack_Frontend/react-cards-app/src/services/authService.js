import axios from 'axios';

// Define the base URL for your API
const API_URL = import.meta.env.VITE_API_BASE_URL; // Update this to match your backend URL

// Function to handle user signup
export const signup = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register/`, {username, email, password });
    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

// Function to handle user signin
export const signin = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/token/`, { username, password });
    return response.data;
  } catch (error) {
    console.error('Signin error:', error);
    throw error;
  }
};