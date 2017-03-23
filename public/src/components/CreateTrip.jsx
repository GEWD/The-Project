import React from 'react';
import ReactDOM from 'react-dom';
import serverInt from '../lib/serverInteraction.js';
import Util from '../lib/util.js';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

const CreateTrip = ({tripName, tripDesc, handleTripNameSubmit, handleTripNameChange}) => (
  <div>
    <h3>Create Trip</h3>
      <input id='tripName' name='tripName'placeholder='Yosemite 2017' type='text' value={tripName} onChange={handleTripNameChange}/>
      <textarea id='tripDesc' name='tripDesc' placeholder='Your Trip Description' value={tripDesc} onChange={handleTripNameChange}/>
      <Link to='/upload-receipt' value='submit' onClick={handleTripNameSubmit}>Submit</Link>
  </div>
)

export default CreateTrip;
