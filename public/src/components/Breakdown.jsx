import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';


class Breakdown extends React.Component {
  constructor(props) {
    super(props);
    this.sumTax = Number(this.props.data.sumTax);
    this.sumTip = Number(this.props.data.sumTip);
    this.memberCount = this.props.data.members.length;
    this.perPerson = ((this.sumTax + this.sumTip) / this.memberCount);
  }

  render() {
    return (
      <div>
          <Link to='/summary' className='back-history'>Calculation Summary</Link>
        <div>
          <div className='receipt-info'>
            <h2>Final Breakdown</h2>
            <h4>Total per person due to {this.props.data.username}</h4>
          </div>
          <div className='receipt-summary'>
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
        <div className='sumbit-btn-bar-outer-container'>
            <div className='sumbit-btn-bar-inner-container'>
              <Link
                to='/recent-trips'
                onClick={this.props.recent}
                className='btn btn-primary btn-wide btn-link'
              >Recent Trips</Link>
            </div>
        </div>
      </div>
    );
  }
}

export default Breakdown;

