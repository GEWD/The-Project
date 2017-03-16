import React from 'react';
import ReactDOM from 'react-dom';
import CreateTrip from './components/CreateTrip.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <h1>GEWD</h1>
        <p>The Project</p>
        <div>
          <CreateTrip />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

