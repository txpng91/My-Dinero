import React, { useState } from 'react';
import './styles/AccountForm.css';
import { signUp, logUser } from '../api';

function AccountForm({ setToken, setUserData }) {
  const [action, setAction] = useState('login');
  const title = action === 'sign-up' ? 'Sign Up' : 'Login';

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validatePassword, setValidatePassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const functType = action === 'sign-up' ? signUp : logUser;
    if (functType === logUser) {
      try {
        const user = {
          email: email,
          password: password,
        };
        const result = await functType(user, action);
        if (result) {
          setError('');
          setEmail('');
          setPassword('');
          setUserData(result.user);
          setToken(result.token);
          alert(result.message);
        }
      } catch (error) {
        setError('Either email or password is incorrect. Please try again.');
      }
    } else {
      // Create new user with fields
      const newUser = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      };
      // Call the function to create user
      const result = await functType(newUser, action);
      if (result) {
        setError('');
        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
        setValidatePassword('');
        setAction('login');
        setEmail(result.user.email);
        setToken(result.token);
        alert(result.message);
      }
    }
  };

  const redirect = () => {
    if (action === 'login') {
      setEmail('');
      setPassword('');
      setAction('sign-up');
    } else {
      setFirstname('');
      setLastname('');
      setEmail('');
      setPassword('');
      setValidatePassword('');
      setAction('login');
    }
  };

  return (
    <div id='account-form-page'>
      <h1>Dinero</h1>
      <div id='account-form'>
        <h2>{title}</h2>
        {action === 'sign-up' ? (
          <form id='sign-up' onSubmit={handleSubmit}>
            <label htmlFor='firstName'>First Name: </label>
            <input
              type='text'
              value={firstname}
              minLength={2}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
            <label htmlFor='lastName'>Last Name: </label>
            <input
              type='text'
              value={lastname}
              minLength={2}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
            <label htmlFor='email'>Email: </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span>15 of 30 characters</span>
            <label htmlFor='password'>Password: </label>
            <input
              type='password'
              value={password}
              minLength={5}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor='password'>Confirm Password: </label>
            <input
              type='password'
              value={validatePassword}
              minLength={5}
              onChange={(e) => setValidatePassword(e.target.value)}
              required
            />

            <button
              className={
                password === validatePassword && password.length >= 5
                  ? 'showSubmitBtn'
                  : 'disableBtn'
              }
              type='submit'
            >
              {title}
            </button>
            <p>
              Already have an account?{' '}
              <span className='to-sign-up' onClick={redirect}>
                <strong>Log In</strong>
              </span>
            </p>
          </form>
        ) : (
          <form id='login' onSubmit={handleSubmit}>
            <label htmlFor='email'>Email </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span>15 of 30 characters</span>
            <label htmlFor='password'>Password </label>
            <input
              type='password'
              value={password}
              minLength={5}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className={password.length >= 5 ? 'showSubmitBtn' : 'disableBtn'}
              type='submit'
            >
              {title}
            </button>
            <p>
              Need to create a new account?{' '}
              <span className='to-sign-up' onClick={redirect}>
                <strong>Sign Up</strong>
              </span>
            </p>
          </form>
        )}
        {error && <p className='login-error'>{error}</p>}
      </div>
    </div>
  );
}

export default AccountForm;
