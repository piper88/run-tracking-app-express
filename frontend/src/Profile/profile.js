import React, { useState } from 'react';
import Login from '../Login/login';

const Profile = (props) => {
  //parent component for whole App
  const [user, setUser] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  console.log(`user ${user}`)
  function retrieveUser(name, password) {
    //call to backend to retrieve user
    setUser(name);
    console.log( `name ${name}: password ${password}`);
  }

  return (
    <Login retrieveUser={retrieveUser.bind(this)}/>
  )
}

export default Profile;
