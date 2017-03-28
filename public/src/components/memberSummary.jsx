

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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    // event.preventDefault();
    // this.setState({dummyData});
    Util.insertIntoDb(this.props.data);
    this.props.calculateMemberSum();
  }

  render() {
    return (
      <div className='member-summary-page'>
        <Link to='/additems' className='back-history'>Receipt Items</Link>
        <div className='container'>
          <div className='receipt-info'>
            <h2>Receipt Summary</h2>
            <h4>{this.props.data.tripName}</h4>
            <h4>Paid By: {this.props.data.username}</h4>
          </div>
          <div className='receipt-summary'>
            {this.props.data.items.map((el, idx) => {
              return (
                <div key={idx}>
                  <div className='flex-container'>
                    <span className='flex-column-name receipt-item-name'>{el[0].name}</span>
                    <span className='flex-column-amount receipt-item-amount'> ${Number(el[0].amount).toFixed(2)}</span>
                  </div>
                  <div className='receipt-item-mem-summary'>
                      {el[0].members.map((member, index) => {
                        return (
                          <div key={index} className='summary-mem-item'>
                            <span className='flex-column-name summary-mem-name'><i>{member}</i></span>
                            <span className='flex-column-amount receipt-item-amount'>${(Number(el[0].amount) / el[0].members.length).toFixed(2)}</span>
                          </div>
                        )
                      })}
                  </div>
                </div>
              )
            })}
            <hr/>
            <div className='flex-container receipt-tax'>
              <span className='flex-column-name'>Sub Total:</span>
              <span className='flex-column-amount receipt-item-amount'>{this.sumBill.toFixed(2)}</span>
            </div>

            <div className='flex-container receipt-tax'>
              <span className='flex-column-name'>Total Tax:</span>
              <span className='flex-column-amount receipt-item-amount'>{this.sumTax}</span>
            </div>

            <div className='flex-container receipt-tax'>
              <span className='flex-column-name'>Total Tip:</span>
              <span className='flex-column-amount receipt-item-amount'>{this.sumTip.toFixed(2)}</span>
            </div>

            <div className='flex-container receipt-tax'>
              <span className='flex-column-name'>Total:</span>
              <span className='flex-column-amount receipt-item-amount'>{(Number(this.sumTip) + Number(this.sumBill)).toFixed(2)}</span>
            </div>

            <div className='flex-container receipt-tax'>
              <span className='flex-column-name'>Tax + Tip per person:</span>
              <span className='flex-column-amount receipt-item-amount'>{this.perPerson.toFixed(2)}</span>
            </div>

          </div>
          <div className='sumbit-btn-bar-outer-container'>
            <div className='sumbit-btn-bar-inner-container'>
              <Link
                to='/breakdown'
                onClick={this.handleSubmit}
                className='btn btn-primary btn-wide btn-link'
              >Submit</Link>
            </div>
          </div>
      </div>
      </div>
    )
  }
}
export default MemberSummary;

