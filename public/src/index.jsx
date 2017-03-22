import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import TripSummary from './components/TripSummary.jsx';
import CreateTrip from './components/CreateTrip.jsx';
import UploadReceipt from './components/Upload.jsx';
import Login from './components/Login.jsx';
import CreateItem from './components/CreateItem.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items:[],
      name:'',
      amount: 0
    };
    this.addItem = this.addItem.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onPriceChange = this.onPriceChange.bind(this);
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
              <li><Link to="/login">Login</Link></li>
              {/*<li><Link to="/additem">Add Item</Link></li>*/}
            </ul>
            <Route exact path ="/" component={TripSummary}/>
            <Route path ="/login" component={Login}/>
            <Route path ="/upload-receipt" component={UploadReceipt}/>
            <CreateItem addItem={this.addItem} itemName={this.state.name} itemAmount={this.state.amount} items={this.state.items} onNameChange= {this.onNameChange} onPriceChange ={this.onPriceChange}/>
          </div>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

