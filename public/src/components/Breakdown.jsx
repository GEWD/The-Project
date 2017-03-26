import React from 'react';

class Breakdown extends React.Component {
  constructor(props) {
    super(props);
    this.sumTax = parseInt(this.props.data.sumTax);
    this.sumTip = parseInt(this.props.data.sumTip);
    this.memberCount = this.props.data.members.length;
    this.perPerson = ((this.sumTax + this.sumTip) / this.memberCount) ;
  }

  render() {
    return (
      <div>
        <h3>Total per person due to {this.props.data.username}</h3>
        <ul>
          {Object.keys(this.props.data.memberSum).map((member,index) => {
            return (<li key={index}>{member} : ${(this.props.data.memberSum[member] + this.perPerson).toFixed(2)}</li>)
          })}
        </ul>
      </div>
    );
  }
}

export default Breakdown;

