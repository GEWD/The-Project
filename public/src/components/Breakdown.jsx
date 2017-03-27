import React from 'react';
// import {Link} from 'react-router-dom';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';


class Breakdown extends React.Component {
  constructor(props) {
    super(props);
    this.sumTax = Number(this.props.data.sumTax);
    this.sumTip = Number(this.props.data.sumTip);
    this.memberCount = this.props.data.members.length;
    this.perPerson = ((this.sumTax + this.sumTip) / this.memberCount) ;
  }

  render() {
    return (
      <div>
          <Link to='/summary' className='back-history'>Calculation Summary</Link>
        <div>
          <div className='receipt-info'>
            <h2>Final Breakdown</h2>
            <h4>Total per person due to {this.props.data.username}</h4>
            <div>
          </div>
            {Object.keys(this.props.data.memberSum).map((member,index) => {
              return (
                <div key={index} className='flex-container receipt-tax'>
                  <span className='flex-column-name'>{member}</span>
                  <span className='flex-column-amount receipt-item-amount'>{(this.props.data.memberSum[member] + this.perPerson).toFixed(2)}</span>
                </div>
              )
            })}
          </div>
        </div>
        <Link to='/' onClick={this.props.recent}> Back To Homepage (Recent) </Link>
      </div>
    );
  }
}

export default Breakdown;

