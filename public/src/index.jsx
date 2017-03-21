import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import TripSummary from './components/TripSummary.jsx';
import CreateTrip from './components/CreateTrip.jsx';
import UploadReceipt from './components/Upload.jsx';
import Profile from './components/Profile.jsx';
import Login from './components/Login.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
    }
  }

  loggedIn() {
    return false;
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
              {this.state.authenticated ? null : <li><Link to="/login">Login</Link></li>}
              {!this.state.authenticated ? null : <li><Link to="/logut">Logout</Link></li>}
            </ul>
            <Route exact path ="/" component={TripSummary} onEnter={this.isAuthenticated}/>
            <Route path ="/profile" component={Profile} onEnter={this.isAuthenticated}/>
            <Route path ="/login" component={Login}/>
            <Route path ="/upload-receipt" component={UploadReceipt}/>
          </div>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// <Route exact path="/" render={() => (
//   this.loggedIn() ? (
//     <TripSummary />
//   ) : (
//     <Redirect to="/login"/>
//   )
// )}/>
