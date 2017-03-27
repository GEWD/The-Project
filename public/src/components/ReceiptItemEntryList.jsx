import React from 'react';
import ReceiptItemEntry from './ReceiptItemEntry.jsx';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

class ReceiptItemEntryList extends React.Component {
  constructor(props) {
  super(props);
    this.state = {
      maxHeight: {
        'overflow-y': 'auto',
        'max-height': `${this.props.windowHeight / 2.5}`
      }
    };
  }

  render() {
    return (
      <div className='receipt-entry-list-container'>
        {this.props.items.map((item,index) => {
          return (
            <span key={index} className='flex-container'>
              <div
                onClick={() => this.props.itemOnClick(index)}
                className={'itemName' + (this.props.selectItem === index ? 'Selected' : '')}
                className='flex-column-receiptItem'
              >
                <ReceiptItemEntry
                  key={index}
                  item={item}
                  deleteItem={this.props.deleteItem}
                  index={index}
                />
              </div>
              <div className='flex-container'>
                <a
                onClick={() => this.props.deleteItem(index)}
                className='delete-btn flex-column-deleteItem'
                ></a>
              </div>
          </span>
        )
        })}
        <div className='flex-container flex-column-receiptItem'>
          <span className='flex-column-name receipt-item-name'>Tip</span>
          <span className='receipt-item-amount'>
            <input
              placeholder='Total Tip'
              type='number'
              name='sumTip'
              value={this.props.sumTip}
              onChange={this.props.onInputChange}
              id='input-amount-tip'
            />
          </span>
        </div>
      </div>
    )
  }
}

export default ReceiptItemEntryList;
