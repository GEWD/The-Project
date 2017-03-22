import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import TripSummary from './components/TripSummary.jsx';
import CreateTrip from './components/CreateTrip.jsx';
import UploadReceipt from './components/Upload.jsx';
import Profile from './components/Profile.jsx';
import Login from './components/Login.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Util from './lib/util.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    }
    this.verifyAuthentication = this.verifyAuthentication.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  verifyAuthentication(isAuthenticated) {
    this.setState({
      isAuthenticated: isAuthenticated
    });
  }

  handleClick(event) {
    event.preventDefault();
    Util.logout(this.verifyAuthentication);
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/upload-receipt">Upload Receipt</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              {this.state.isAuthenticated ? null : <li><Link to="/login">Login</Link></li>}
              {!this.state.isAuthenticated ? null : <li><Link to="/logout" onClick={this.handleClick}>Logout</Link></li>}
            </ul>
            <PrivateRoute path="/" isAuthenticated={this.state.isAuthenticated} component={TripSummary}/>
            <PrivateRoute path ="/profile" isAuthenticated={this.state.isAuthenticated} component={Profile}/>
            <PrivateRoute path ="/upload-receipt" isAuthenticated={this.state.isAuthenticated} component={UploadReceipt}/>
            <Route path ="/login" render={() => (
              this.state.isAuthenticated ? <Redirect to="/" /> : <Login />
            )}/>
          </div>
        </Router>
      </div>
    );
  }

  componentWillMount() {
    Util.verify(this.verifyAuthentication);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
