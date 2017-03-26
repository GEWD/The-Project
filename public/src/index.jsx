import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import TripSummary from './components/TripSummary.jsx';
import CreateTrip from './components/CreateTrip.jsx';
import Itemization from './components/Itemization.jsx';
import UploadReceipt from './components/Upload.jsx';
import MemberSummary from './components/MemberSummary.jsx';
import Breakdown from './components/Breakdown.jsx'
import Profile from './components/Profile.jsx';
import Login from './components/Login.jsx';
import Navbar from './components/Navbar.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Util from './lib/util.js';
import CreateItem from './components/CreateItem.jsx';
import $ from 'jquery';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      receiptUrl:'',
      tripName: '',
      username: '',
      tripDesc: '',
      receiptName:'',
      items:[],
      selectItem:'',
      selectMember:'',
      members:[],
      member: '',
      memberExist: false,
      name:'',
      amount: 0,
      sideMenuState: false,
      amount: '',
      sumBill: '',
      sumTax: '',
      sumTip: '',
      memberSum: {}
    }

    this.verifyAuthentication = this.verifyAuthentication.bind(this);
    this.handleClickLogout = this.handleClickLogout.bind(this);
    this.addItem = this.addItem.bind(this);
    this.handleTripNameSubmit = this.handleTripNameSubmit.bind(this);
    this.callGVision = this.callGVision.bind(this);
    this.onGVision = this.onGVision.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.addMember = this.addMember.bind(this);
    this.memberExist = this.memberExist.bind(this);
    this.itemOnClick = this.itemOnClick.bind(this);
    this.memberOnClick = this.memberOnClick.bind(this);
    this.initialMemberSelect = this.initialMemberSelect.bind(this);
    this.menuOnClick = this.menuOnClick.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.calculateMemberSum = this.calculateMemberSum.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
  }

  verifyAuthentication(userInfo) {
    this.setState({
      isAuthenticated: userInfo.isAuthenitcated,
      username: userInfo.name || '',
      members: userInfo.name !== undefined ? this.state.members.concat([[userInfo.name]]) : this.state.members,
      fb_id: userInfo.fb_id || ''
    });
  }

  handleClickLogout(event) {
    event.preventDefault();
    Util.logout(this.verifyAuthentication);
  }

  addItem (itemArray){
    this.setState({
      items: this.state.items.concat([[{
        name: this.state.name,
        amount: this.state.amount,
        members: []
      }]])
    })
    this.state.name = '';
    this.state.amount = '';
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
    let itemArray = [];
    for (var key in itemizationObject) {
      itemArray.push([{
        name:key,
        amount:itemizationObject[key],
        members: []
      }]);
    }
    this.setState({items: itemArray});
    console.log('Successfully sent post to /vision, resulting array:', this.state.items);
  }

  addMember (itemArray){
    this.memberExist(this.state.member,(exist) => {
        this.setState({
          memberExist: exist
        });
        if (!exist) {
          this.setState({
            members: this.state.members.concat([[this.state.member]])
          })
        }
    });
    this.state.member = '';
  }

  calculateTotal() {
    console.log('inside calculate Total')
    let sum = 0;
    this.state.items.map((item,index) => {
      sum+= parseInt(item[0].amount);
    })
    this.setState({
      sumBill: sum.toFixed(2)
    })
  }

  onInputChange(event) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  calculateMemberSum() {
    var memberSum = {};
    this.state.items.forEach(function(itemArr) {
      var itemObj = itemArr[0];
      var eachPrice = itemObj.amount/itemObj.members.length;
      for (var i = 0; i < itemObj.members.length; i++) {
        if (memberSum[itemObj.members[i]]) {
          memberSum[itemObj.members[i]] += eachPrice;
        } else {
          memberSum[itemObj.members[i]] = eachPrice;
        }
      }
    })
    this.setState({memberSum: memberSum});
  }


  memberExist(member, cb) {
    let exist = false;
    this.state.members.forEach((val, index) => {
      if (val[0].toUpperCase().trim() === member.toUpperCase().trim()) {
        exist = true;
      }
    })
    cb(exist);
  }

  handleTripNameSubmit(event) {
    console.log('Tripname was submitted:' + this.state.tripName);
    Util.sendServerTripName(this.state.tripName, this.state.tripDesc );
  }

  itemOnClick(index) {
    const member = this.state.selectMember;
    let members = this.state.items[index][0].members;
    let items = this.state.items.slice();
    let membersCurrIndex = members.indexOf(member);

    if (membersCurrIndex < 0) {
      items[index][0].members = members.concat([member]);
    } else {
      members.splice(membersCurrIndex, 1);
    }

    this.setState({
      items: items,
      selectItem: index
    });
  }

  initialMemberSelect() {
    if (this.state.selectMember.length === 0) {
      this.setState({
        selectMember: this.state.username
      });
    }
  }

  memberOnClick(member) {
    this.setState({
      selectMember: member
    });
  }

  menuOnClick() {
    this.setState({
      sideMenuState: true
    });
    console.log('----menu state is when menu button is clicked', this.state.sideMenuState);
  }

  closeMenu() {
    this.setState({
      sideMenuState: !this.state.sideMenuState
    });
    console.log('----site-pusher is clicked', this.state.sideMenuState);
  }

  render() {
    return (
      <div className='site-container'>
        <Router>
          <div
            onClick={this.state.sideMenuState ? this.closeMenu : null}
            className={this.state.sideMenuState ? 'site-pusher-on' : 'site-pusher'}>
            <Navbar
              isAuthenticated={this.state.isAuthenticated}
              handleClickLogout={this.handleClickLogout}
              menuOnClick={this.menuOnClick}
              sideMenuState={this.state.sideMenuState}/>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/upload-receipt">Upload Receipt</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/additems">Add Items</Link></li>
              <li><Link to="/summary">Member Summary</Link></li>
              <li><Link to="/breakdown">Breakdown</Link></li>
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
              onInputChange={this.onInputChange}
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
              onInputChange={this.onInputChange}
            />
            <PrivateRoute path="/additems" isAuthenticated={this.state.isAuthenticated} component={Itemization}
              addItem={this.addItem}
              itemName={this.state.name}
              itemAmount={this.state.amount}
              selectItem={this.state.selectItem}
              selectMember={this.state.selectMember}
              items={this.state.items}
              deleteItem={this.deleteItem}
              members={this.state.members}
              member={this.state.member}
              sumBill={this.state.sumBill}
              sumTax={this.state.sumTax}
              sumTaxTip={this.state.sumTaxTip}
              calculateTotal={this.calculateTotal}
              memberExist={this.state.memberExist}
              addMember={this.addMember}
              initialMemberSelect={this.initialMemberSelect}
              itemOnClick={this.itemOnClick}
              memberOnClick={this.memberOnClick}
              onInputChange={this.onInputChange}/>
            <PrivateRoute
              path ="/summary"
              isAuthenticated={this.state.isAuthenticated}
              component={MemberSummary}
              calculateMemberSum={this.calculateMemberSum}
              data={this.state}
            />
            <PrivateRoute
              path ="/breakdown"
              isAuthenticated={this.state.isAuthenticated}
              component={Breakdown}
              data={this.state}
            />
            <Route path ="/login" render={() => (
              this.state.isAuthenticated ? <Redirect to="/" /> : <Login />
            )}/>
            </div>
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
