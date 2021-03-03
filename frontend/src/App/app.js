import React, { useState } from 'react';
import Login from '../Login/login';
import './app.css'

const App = (props) => {
  //parent component for whole App
  const [user, setUser] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  function retrieveUser(name, password) {
    //eventually will call to backend to retrieve user from mongodb
    setUser(name);
    setLoggedIn(true);
    console.log( `name ${name}: password ${password}`);
  }

  if (!loggedIn) {
    return (
      <Login class="App" retrieveUser={retrieveUser.bind(this)}/>
    )
  } else {
    return (
      //return Profile component
      <h1>Profile</h1>
    )
  }

}

export default App;
