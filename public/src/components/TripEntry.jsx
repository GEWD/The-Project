import React from 'react';

class TripEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Trip Name</h3> <p>Total: $193.00</p>
        <p>Date: 2014 March</p>
        <p>People: </p>
      </div>
    )
  }
}

export default TripEntry;
