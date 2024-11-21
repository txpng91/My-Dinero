// Get local url
const API_URL = 'http://localhost:5000/api/v1';

// User method --- register
export const signUp = async (newUser, action) => {
  try {
    if (action !== 'sign-up') return;
    const res = await fetch(`${API_URL}/${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    const user = res.json();
    return user;
  } catch (error) {
    console.log('Unable to sign up...: ', error);
  }
};

// User method --- login
export const logUser = async (user, action) => {
  try {
    if (action !== 'login') return;
    const res = await fetch(`${API_URL}/${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const userData = res.json();
    return userData;
  } catch (error) {
    console.log('Unable to log in....: ', error);
  }
};

// Balance method --- create with token and id
export const createBalance = async (token, id) => {
  try {
    const res = await fetch(`${API_URL}/balances/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(id),
    });
    const balance = res.json;
    return balance;
  } catch (error) {
    console.log('Unable to get balance...:', error);
  }
};

// Balance method --- get with token and id
export const getBalance = async (token, id) => {
  try {
    const res = await fetch(`${API_URL}/balances/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const balance = res.json();
    return balance;
  } catch (error) {
    console.log('Unable to get balance...:', error);
  }
};

// Balance method --- get with token and id
export const getRecurringBills = async (token, id) => {
  try {
    const res = await fetch(`${API_URL}/recurring-bills/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const recurringBills = res.json();
    return recurringBills;
  } catch (error) {
    console.log('Unable to get recurring bills...:', error);
  }
};
