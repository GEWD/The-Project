import React from 'react';
import ReactDOM from 'react-dom';
import serverInt from '../lib/serverInteraction.js';

class CreateTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripName: ''
    };
    //Must bind all functions with 'this' to CreateTrip
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //Automatically updates the property tripName of state 
  handleChange(event) {
    this.setState({tripName: event.target.value});
  }

  //Handles subsequent function calls after submit 
  handleSubmit(event) {
    console.log('Tripname was submitted:' + this.state.tripName);
    event.preventDefault();
    serverInt.sendServerTripName(this.state.tripName);
  }

  render() {
    return (
      <div>
        <h3 onClick={this.testClick}>CreateTrip test</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name your trip:
            <input placeholder="Yosemite 2017" type="text" value={this.state.tripName} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CreateTrip;
