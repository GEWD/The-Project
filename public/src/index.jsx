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
        <h1>GEDW</h1>
        <p>The Project</p>
        <div>
          <h3>CreateTrip test</h3>
          <CreateTrip />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

