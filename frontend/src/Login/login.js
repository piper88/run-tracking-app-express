import React, { useState, useEffect } from 'react';

const Login = (props) => {

  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');

  function handleSubmit(event) {
    //return user info to parent component
    props.retrieveUser(userName, userPassword);
    event.preventDefault();
  }

  function handleChange(event) {
    let credentials = event.target;
    event.name ==='user' ? setUserName(credentials.value) : setUserPassword(credentials.value);
  }

  return (
    <form onSubmit={handleSubmit.bind(this)}>
      <input
      type="text"
      onChange={handleChange.bind(this)}
      name="user"
      placeholder="Username">
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
