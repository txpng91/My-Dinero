import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Navbar.css';

function Navbar({ setToken, setUserData }) {
  const [navSize, setNavSize] = useState('navbar');
  const navigate = useNavigate('');
  const logOut = () => {
    setToken('');
    setUserData({});
    navigate('/');
  };

  const changeSize = () => {
    if (navSize === 'navbar') {
      setNavSize('minimize');
    } else if (navSize === 'minimize') {
      setNavSize('navbar');
    }
  };

  return (
    <div
      id={navSize === 'minimize' ? 'minimize-nav' : 'navbar'}
      onClick={() => navSize === 'minimize' && changeSize()}
    >
      <div className='nav-head'>
        <h2 className='logo'>My Dinero</h2>
      </div>
      <div className='nav-body'>
        <Link to={'/'}>Overview</Link>

        <Link to={'/transactions'}>Transactions</Link>

        <Link to={'/budgets'}>Budgets</Link>

        <Link to={'/jars'}>Jars</Link>

        <Link to={'/recurring-bills'}>Recurring Bills</Link>
      </div>
      <div className='nav-footer'>
        <button onClick={changeSize}>Minimize Menu</button>
        <button onClick={logOut}>Sign Out</button>
      </div>
    </div>
  );
}

export default Navbar;
