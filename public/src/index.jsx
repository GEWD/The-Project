import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <h1>GEDW</h1>
        <p>The Project</p>
        </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

