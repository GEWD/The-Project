import React from 'react';
import ReactDOM from 'react-dom';
import TripEntry from './TripEntry.jsx';

class TripSummary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h1>Most Recent Trips</h1>
        <div>{this.props.data.recent.map((item,index) => {
          return (<p>{item.name}</p>)
        })
        }</div>
      </div>
    )
  }
}

export default TripSummary;
