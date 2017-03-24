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
import $ from 'jquery';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      tripName: '',
      tripDesc: '',
      receiptName:'',
      items:[],
      name:'',
      amount: 0
    }
    this.verifyAuthentication = this.verifyAuthentication.bind(this);
    this.handleClickLogout = this.handleClickLogout.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onPriceChange = this.onPriceChange.bind(this);
    this.onReceiptNameChange = this.onReceiptNameChange.bind(this);
    this.handleTripNameSubmit = this.handleTripNameSubmit.bind(this);
    this.handleTripNameChange = this.handleTripNameChange.bind(this);
    this.callGVision = this.callGVision.bind(this);
    this.onGVision = this.onGVision.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  verifyAuthentication(isAuthenticated) {
    this.setState({
      isAuthenticated: isAuthenticated
    });
  }

  handleClickLogout(event) {
    event.preventDefault();
    Util.logout(this.verifyAuthentication);
  }

  addItem (itemArray){
    this.setState({
      items: this.state.items.concat([[this.state.name, this.state.amount]])
    })
  }

  onReceiptNameChange(event){
    this.setState({
      receiptName:event.target.value
    })
  }

  deleteItem(index) {
    delete this.state.items[index];
    this.setState({
      items: this.state.items
    })
  }

  callGVision(form) {
    let data = new FormData(form);
    let currentScope = this;
    $.ajax({
      type: 'POST',
      url: '/upload',
      data: data,
      processData:false,
      contentType:false,
      success: (results) => {
        console.log('.as.d.awd.as.data', results);
        console.log('this is ssss:', this, '....', currentScope);
        this.onGVision(results);
        console.log('Successfully sent post to /vision, resulting array:', this.state.items);
      },
    });
  }

   onGVision(itemizationObject) {
    //{item: price, item: price}
    let itemArray = [];
    for (var key in itemizationObject) {
      itemArray.push([key, itemizationObject[key]]);
    }
    this.setState({items: itemArray});
    console.log('Successfully sent post to /vision, resulting array:', this.state.items);
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

  handleTripNameChange(event) {
    let name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  handleTripNameSubmit(event) {
    console.log('Tripname was submitted:' + this.state.tripName);
    Util.sendServerTripName(this.state.tripName, this.state.tripDesc );
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
              <li><Link to="/additems">Add Items</Link></li>
              <li><Link to="/create-trip">Create Trip</Link></li>
              {this.state.isAuthenticated ? null : <li><Link to="/login">Login</Link></li>}
              {!this.state.isAuthenticated ? null : <li><Link to="/logout" onClick={this.handleClickLogout}>Logout</Link></li>}
            </ul>
            <PrivateRoute path="/" isAuthenticated={this.state.isAuthenticated} component={TripSummary}/>
            <PrivateRoute
              path="/create-trip"
              component={CreateTrip}
              isAuthenticated={this.state.isAuthenticated}
              tripName={this.state.tripName}
              handleTripNameChange={this.handleTripNameChange}
              handleTripNameSubmit={this.handleTripNameSubmit}
            />
            <PrivateRoute
              path ="/profile"
              isAuthenticated={this.state.isAuthenticated}
              component={Profile}
            />
            <PrivateRoute
              path ="/upload-receipt"
              isAuthenticated={this.state.isAuthenticated}
              component={UploadReceipt}
              tripName={this.state.tripName}
              tripDesc={this.state.tripDesc}
              callGVision={this.callGVision}
              onReceiptNameChange={this.onReceiptNameChange}
            />
            <PrivateRoute path="/additems" isAuthenticated={this.state.isAuthenticated} component={CreateItem}
              addItem={this.addItem}
              itemName={this.state.name}
              itemAmount={this.state.amount}
              items={this.state.items}
              onNameChange={this.onNameChange}
              onPriceChange={this.onPriceChange}
              deleteItem={this.deleteItem}/>
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
