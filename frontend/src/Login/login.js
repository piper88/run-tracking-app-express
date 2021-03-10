import React, { useState, useEffect } from 'react';
import handleToggle from '../utils/toggleUtil.js';
import './login.css';

const Login = (props) => {

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  function handleSubmit(event) {
    //return user info to parent component
    props.retrieveUser(userEmail, userPassword);
    event.preventDefault();
  }

  function handleChange(event) {
    let credentials = event.target;
    event.target.name ==='email' ? setUserEmail(credentials.value) : setUserPassword(credentials.value);
  }

  return (
    <form onSubmit={handleSubmit.bind(this)}>
      <input
      type="text"
      onChange={handleChange.bind(this)}
      name="email"
      placeholder="Enter email">
      </input>
      <div className="container">
      <input
      type="password"
      id="password"
      onChange={handleChange.bind(this)}
      name="password"
      placeholder="Enter password">
      </input>
      <i
      className="far fa-eye"
      id="togglePassword"
      onClick={handleToggle.bind(this)}></i>
      </div>
      <button>Login</button>
    </form>
  )
}

export default Login;
