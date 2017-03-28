import React from 'react';
import ReactDOM from 'react-dom';
import TripEntry from './TripEntry.jsx';

class TripSummary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='page-container'>
        <h1>Most Recent Trips</h1>
        <div className='trip-summary'>{this.props.data.recent.map((item,index) => {
          return (<p key={index} >{item.name}</p>)
        })}
        </div>
      </div>
    )
  }
}

export default TripSummary;
