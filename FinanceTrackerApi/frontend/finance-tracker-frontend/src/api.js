export const fetchIncome = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/incomes/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token in request headers
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch income data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Function to fetch expenses data from the backend
export const fetchExpenses = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/expenses/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch expenses data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Function to fetch budgets data from the backend
// src/api.js
export const fetchBudgets = async () => {
  try {
      const response = await fetch('http://127.0.0.1:8000/api/budgets/', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
      });
      if (!response.ok) {
          throw new Error('Failed to fetch budget data');
      }
      return await response.json();
  } catch (error) {
      console.error(error);
      return []; // Return an empty array on error
  }
};


// Function to retrieve notifications data from the backend
export const fetchNotifications = async () => {
  try {
      const response = await fetch('http://127.0.0.1:8000/api/notifications/', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
      });
      if (!response.ok) {
          throw new Error('Failed to fetch notifications data');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error(error);
      throw error; // Propagate the error for handling in the component
  }
};
