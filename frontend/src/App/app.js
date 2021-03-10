import React, { useState } from 'react';
import Login from '../Login/login';
import './app.css';
import Signup from '../Signup/signup';
import axios from 'axios';

const App = (props) => {
  //parent component for whole App
  const [user, setUser] = useState('');
  const [newOrReturning, setNewOrReturning] = useState('neither')
  const [loggedIn, setLoggedIn] = useState(false);

  // used for returning users after signup and login
  function loginUser(email, password) {
    //send request to backend to either create or retrieve user, then set user here
    axios.post('/api/login', {
      email, password
    }).then(response => {
      localStorage.setItem('token', response.data.token);
      setLoggedIn(true);
      setUser(response.data.email)
    })
    .catch(err => {
      console.error(err);
    })
  }

function handleClick(event) {
  event.preventDefault();
  if (event.target.id === "newUser") {
    setNewOrReturning('new');
  } else {
    setNewOrReturning('returning');
  }
}
// signup user, then retrieve user
// used when new user
function signupUser(email, password) {
  //the token is response
  axios.post('/api/signup', {
    email,
    password,
  }).then(response => {
    console.log(`response in signupUser`);
    console.log(response);
    //cache response.token to localStorage
    localStorage.setItem('token', response.data.token);
    //not currently returning email, only token?
    setUser(response.data.email);
    setLoggedIn(true);
    console.log(response.data.token);
  })
  .catch(err => {
    //do something with the error...tbd
    console.error(err);
  })
}

  if (!loggedIn) {
    switch (newOrReturning) {
      case 'neither':
        return (
          <div>
            <button id="newUser" onClick={handleClick.bind(this)}>New User</button>
            <button id="returningUser" onClick={handleClick.bind(this)}>Returning User</button>
          </div>
        )
      case "new":
        return (
          <Signup signupUser = {signupUser.bind(this)}/>
        )
        default:
          return (
            <Login retrieveUser={loginUser.bind(this)}/>
          )
      }
  }

  else {
    return (
      //return Profile component
      <h1>Profile</h1>
    )
  }

}

export default App;
