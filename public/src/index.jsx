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

import CreateItem from './components/CreateItem.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      items:[],
      name:'',
      amount: 0
    }
    this.verifyAuthentication = this.verifyAuthentication.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onPriceChange = this.onPriceChange.bind(this);
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

  addItem (itemArray){
    this.setState({
      items: this.state.items.concat([[this.state.name, this.state.amount]])
    })
  }

  onNameChange(event) {
    this.setState({
      name: event.target.value
    })
  }

  onPriceChange(event) {
    this.setState({
      amount: event.target.value
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
            <Route path ="/upload-receipt" component={UploadReceipt}/>
            <CreateItem 
              addItem={this.addItem} 
              itemName={this.state.name} 
              itemAmount={this.state.amount} 
              items={this.state.items} 
              onNameChange={this.onNameChange} 
              onPriceChange={this.onPriceChange}/>
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
