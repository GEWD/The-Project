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
            <Route path ="/upload-receipt" component={UploadReceipt}/>
          </div>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

