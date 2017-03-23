import React from 'react';
import ReactDOM from 'react-dom';
import serverInt from '../lib/serverInteraction.js';
import Util from '../lib/util.js';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

const CreateTrip = ({tripName, handleTripNameSubmit, handleTripNameChange}) => (
  <div>
    <h3>Create Trip</h3>
    <form onSubmit={handleTripNameSubmit}>
      <label>
        Name your trip:
        <input placeholder='Yosemite 2017' type='text' value={tripName} onChange={handleTripNameChange}/>
      </label>
      <Link to='/upload-receipt' value='submit' onClick={handleTripNameSubmit}>Submit</Link>
    </form>
  </div>
)

export default CreateTrip;
