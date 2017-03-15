import React from 'react';
import ReactDOM from 'react-dom';


class CreateTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripName: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.testClick = this.testClick.bind(this);
    this.sendServerName = this.sendServerName.bind(this);
  }
  testClick(event) {
    event.preventDefault();
    console.log('CreateTrip this is:', this);
  }
  handleChange(event) {
    // console.log('handleChange: Checking what event param is:', event);
    this.setState({tripName: event.target.value});
  }
  sendServerName() {
    const currentScope = this;
    console.log('This within sendServer is:', this, 'currentScope.state.tripname:', currentScope.state.tripName);
    fetch('http://127.0.0.1:3000/test', {
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
