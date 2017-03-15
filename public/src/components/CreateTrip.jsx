import React from 'react';
import ReactDOM from 'react-dom';


class CreateTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripName: ''
    };
    //Must bind all functions with 'this' to CreateTrip
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.testClick = this.testClick.bind(this);
    this.sendServerName = this.sendServerName.bind(this);
  }
  //If you want to check the current scope, uncommend and click this components header
  // testClick(event) {
  //   event.preventDefault();
  //   console.log('CreateTrip this is:', this);
  // }

  //Automatically updates the property tripName of state 
  handleChange(event) {
    this.setState({tripName: event.target.value});
  }
  //Handles post request to the server with tripName in req.body
  sendServerName() {
    const currentScope = this;
    fetch('http://127.0.0.1:3000/testTripName', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        submittedTripName: currentScope.state.tripName
      })
    });
  }
  //Handles subsequent function calls after submit 
  handleSubmit(event) {
    console.log('Tripname was submitted:' + this.state.tripName);
    event.preventDefault();
    this.sendServerName();
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
