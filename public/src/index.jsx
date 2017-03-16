import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import TripSummary from './components/TripSummary.jsx';
import CreateTrip from './components/CreateTrip.jsx';
import UploadReceipt from './components/Upload.jsx';
import Login from './components/Login.jsx';

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
        <Router>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/upload-receipt">Upload Receipt</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
            <Route exact path ="/" component={TripSummary}/>
            <Route path ="/login" component={Login}/>
            <Route path ="/upload-receipt" component={UploadReceipt} upload={this.UploadReceipt.bind(this)}/>
          </div>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

