import React, { useState, useEffect } from 'react';

// TODO: Make Signup component, either separate or just conditionally render signup/login
//Have default be login, if not a user, choosee signup

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
      <input
      type="text"
      onChange={handleChange.bind(this)}
      name="password"
      placeholder="Password">
      </input>
      <button>Login</button>
    </form>
  )
}

export default Login;
