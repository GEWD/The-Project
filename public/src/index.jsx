import React from 'react';
import ReactDOM from 'react-dom';

import CreateTrip from './components/CreateTrip.jsx';
import UploadReceipt from './components/Upload.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.UploadReceipt = this.UploadReceipt.bind(this);
  }

  UploadReceipt(image) {
    $.ajax({
      type: 'POST',
      url:'/upload',
      data: {photo: image},
      success: (data,results) => {
        console.log('Image successfully uploaded');
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  render() {
    return (
      <div>
        <h1>GEDW</h1>
        <p>The Project</p>
        <div>
          <h3>CreateTrip test</h3>
          <CreateTrip />
          <UploadReceipt upload={this.UploadReceipt.bind(this)}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

