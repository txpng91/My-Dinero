import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AccountForm from './components/AccountForm';
import Overview from './components/Overview';
import './components/styles/App.css';
import Transactions from './components/Transactions';
import Budgets from './components/Budgets';
import Jars from './components/Jars';
import RecurringBills from './components/RecurringBills';
import { getBalance, getRecurringBills } from './api';

function App() {
  const [token, setToken] = useState(
    window.localStorage.getItem('token') || null
  );
  const [userData, setUserData] = useState(
    window.localStorage.getItem('data') || null
  );
  const [balance, setBalance] = useState(0.0);
  const [recurringBills, setRecurringBills] = useState([]);

  // Store JSON web token into local storage
  useEffect(() => {
    if (token && userData) {
      window.localStorage.setItem('token', token);
      window.localStorage.setItem('data', userData);
    } else {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('data');
    }
  }, [token]);

  // Store user id into local storage
  useEffect(() => {
    if (token && userData.id) {
      try {
        const fetchBalance = async () => {
          const result = await getBalance(token, userData.id);
          setBalance(result);
        };
        const fetchRecurringBills = async () => {
          const result = await getRecurringBills(token, userData.id);
          setRecurringBills(result);
        };
        fetchBalance();
        fetchRecurringBills();
      } catch (error) {
        throw error;
      }
    }
  }, [token, userData]);

  console.log(balance);

  return (
    <>
      {token && userData.id ? (
        <div id='app'>
          {/* Create navbar here */}
          <Navbar
            token={token}
            setToken={setToken}
            userData={userData}
            setUserData={setUserData}
            setBalance={setBalance}
            setRecurringBills={setRecurringBills}
          />
          <Routes>
            <Route path='/' element={<Overview balance={balance} />} />
            <Route path='/transactions' element={<Transactions />} />
            <Route path='/budgets' element={<Budgets />} />
            <Route path='/jars' element={<Jars />} />
            <Route
              path='/recurring-bills'
              element={
                <RecurringBills
                  recurringBills={recurringBills}
                  setRecurringBills={setRecurringBills}
                />
              }
            />
          </Routes>
        </div>
      ) : (
        <>
          <Routes>
            <Route
              path='/'
              element={
                <AccountForm setToken={setToken} setUserData={setUserData} />
              }
            />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
