import React, { useState } from 'react';
import Add from '../Add/add';
import axios from 'axos';

//profile will contain list of past runs and Add component, where user can add a new run to their profile

const Profile = (props) => {

  const [addRun, setAddRun] = useState(false);

  function fetchRuns() {
    //fetch runs from backend
  }

  if (addRun) {
    return (
      <Add />
    )
  } else {
    //default -- show past workouts
    return (
      <div>
      <h3>Past Workouts</h3>
      {/*dynamically add runs after fetching from backend*/}
      {fetchRuns()}
      <button onClick={setAddRun(true)}>Add new run</button>
      </div>
    )
  }
}
