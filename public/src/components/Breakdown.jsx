import React from 'react';
import {Link} from 'react-router-dom';

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
          <h1>Final Breakdown</h1>
          <h3>Total per person due to {this.props.data.username}</h3>
          <ul>
            {Object.keys(this.props.data.memberSum).map((member,index) => {
              return (<li key={index}>{member} : ${(this.props.data.memberSum[member] + this.perPerson).toFixed(2)}</li>)
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Breakdown;

