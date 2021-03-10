import React, { useState } from 'react';
import handleToggle from '../utils/toggleUtil.js';
const Signup = (props) => {

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmedPassword, setUserConfirmedPassword] = useState('');

  function handleSubmit(event) {
    //return user info to parent component
    if (userPassword !== userConfirmedPassword) {
      return (
        alert('Passwords do not match')
      )
    } else {
      props.signupUser(userEmail, userPassword);
    }
    event.preventDefault();
  }

  function handleChange(event) {
    switch (event.target.name) {
      case 'email':
        setUserEmail(event.target.value);
        break;
      case 'password':
        setUserPassword(event.target.value);
        break;
      // for confirmPassword case
      default:
        setUserConfirmedPassword(event.target.value);
        break;
    }
  }

  return (
    <form onSubmit={handleSubmit.bind(this)}>
      <input
      type="text"
      onChange = {handleChange.bind(this)}
      name="email"
      placeholder="Enter Email"
      >
      </input>
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
      <input
      type="password"
      id="confirmPassword"
      onChange={handleChange.bind(this)}
      name="confirmPassword"
      placeholder="Confirm password">
      </input>
      <i
      className="far fa-eye"
      id="togglePassword"
      onClick={handleToggle.bind(this)}></i>
      <button>Signup</button>
    </form>
  )
}

export default Signup;
