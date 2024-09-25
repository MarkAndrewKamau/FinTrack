// Function to fetch income data from the backend
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
export const fetchBudgets = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/budgets/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch budgets data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
