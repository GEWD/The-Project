import React from 'react';
import ReactDOM from 'react-dom';
import CreateTrip from './CreateTrip.jsx';
import TripEntry from './TripEntry.jsx';

class TripSummary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h1>Trip Summary</h1>
        <TripEntry />
        <TripEntry />
        <CreateTrip />
      </div>
    )
  }
}

export default TripSummary;
