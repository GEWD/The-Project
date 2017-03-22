import React from 'react';

class CreateItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ul>      
          {this.props.items.map((item,index) => {
            return <li>{item[0] + '   '  + item[1]}</li>
          })}
        </ul>
        <input placeholder='receipt name' type='text' onChange= {this.props.onNameChange.bind(this)}/>
        <input placeholder='amount' type='number' onChange= {this.props.onPriceChange.bind(this)}/>
        <button onClick= {this.props.addItem.bind(this)}>Add</button>
      </div>
    );
  }
}


export default CreateItem;