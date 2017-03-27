import React from 'react';
import Util from '../lib/util.js';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

class MemberSummary extends React.Component {
  constructor(props) {
    super(props);
    this.sumBill = Number(this.props.data.sumBill);
    this.sumTax = Number(this.props.data.sumTax);
    this.sumTip = Number(this.props.data.sumTip);
    this.sumTotal = Number(this.props.data.sumTotal);
    this.memberCount = this.props.data.members.length;
    this.perPerson = ((this.sumTax + this.sumTip) / this.memberCount);
    // this.state = {
    // };
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.pricePerPerson = this.pricePerPerson.bind(this);
    // this.items = this.props.data.items;
    // this.trip = this.data.trip;
    // this.payor = this.data.payor;
    // this.items_split = this.data.items_split;
    // this.receiptName = this.data.receiptName;
    // this.receiptUrl = this.data.receiptUrl;
    // let itemsArray = Object.keys(data.items_split);

    // this.state = {
    // };
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.pricePerPerson = this.pricePerPerson.bind(this);
    // this.items = this.props.data.items;
    // this.trip = this.data.trip;
    // this.payor = this.data.payor;
    // this.items_split = this.data.items_split;
    // this.receiptName = this.data.receiptName;
    // this.receiptUrl = this.data.receiptUrl;
    // let itemsArray = Object.keys(data.items_split);
  }

  

  handleSubmit(event) {
    event.preventDefault();
    // this.setState({dummyData});
    Util.insertIntoDb(this.props.data);
  }


  
  render() {
    return (
      <div>
        <h4>{this.props.data.tripName}</h4>
        <h4>{this.props.data.receiptName} {'URL'}</h4>
        <h4>Paid By: {this.props.data.username}</h4>
        <ul>
          {this.props.data.items.map((el,idx) => {
            return (
              <li key={idx}>
                <ul ><strong>{el[0].name}</strong> ${Number(el[0].amount).toFixed(2)}
                  {el[0].members.map((member, index) => {
                    return (<li key={index}><i>{member}</i>   ${(Number(el[0].amount)/el[0].members.length).toFixed(2)}</li>)
                  })}
                </ul> 
              </li> 
            )  
          })}
        </ul>
        <p>Sub Total: ${this.sumBill.toFixed(2)}</p>
        <p>Total Tax: ${this.sumTax}</p>
        <p>Total Tip: ${this.sumTip.toFixed(2)}</p>
        <p>Total: ${(Number(this.sumTip) + Number(this.sumBill)).toFixed(2)}</p>
        <p>Tax + Tip per person: ${this.perPerson.toFixed(2)}</p>
        <Link to='/breakdown' onClick={this.props.calculateMemberSum}>Submit</Link>
        <input type="submit" value="Confirm" onClick={this.handleSubmit}/>
      </div>
    )
  }
}
export default MemberSummary;