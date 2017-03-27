import React from 'react';
import ReactDOM from 'react-dom';
import serverInt from '../lib/serverInteraction.js';
import Util from '../lib/util.js';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

const CreateTrip = ({tripName, tripDesc, handleTripNameSubmit, onInputChange}) => (
  <div className='create-trip-page-container'>
    <h1>Create Trip</h1>
      <input
        id='text-field'
        name='tripName'
        placeholder='Trip Name'
        type='text'
        value={tripName}
        onChange={onInputChange}
      />
      <textarea
        rows='4'
        id='tripDesc'
        name='tripDesc'
        placeholder='Your Trip Description'
        value={tripDesc}
        onChange={onInputChange}/>
        <Link
          to='/upload-receipt'
          value='submit'
          className='btn btn-primary btn-link'
          onClick={handleTripNameSubmit}
          >New Trip
        </Link>
  </div>
)

export default CreateTrip;
