import React from 'react';
import ReactDOM from 'react-dom';

class CreateTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripName: ''
    };
  }


  render() {
    return (

      <div>
        <form>
          <label>
            Name your trip:
            <input type="text" value={this.state.tripName} name="trip-Name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CreateTrip;
// window.CreateTrip = CreateTrip;