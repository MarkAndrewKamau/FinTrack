import axios from 'axios';

// Define the base URL for your API
const API_URL = 'http://localhost:8000/api'; // Update this to match your backend URL

// Function to handle user signup
export const signup = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register/`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

// Function to handle user signin
export const signin = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/token/`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Signin error:', error);
    throw error;
  }
};
