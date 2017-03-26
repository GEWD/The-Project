import React from 'react';
import ReceiptItemEntry from './ReceiptItemEntry.jsx';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

const ReceiptItemEntryList = ({items, selectItem, itemOnClick, deleteItem,sumTax,sumTip,onInputChange,calculateTotal}) =>  (
  <div>
    {items.map((item,index) => {
      return (
        <span key={index} className='flex-container'>
          <div
            onClick={() => itemOnClick(index)}
            className={'itemName' + (selectItem === index ? 'Selected' : '')}
            className='flex-column-receiptItem'
          >
            <ReceiptItemEntry
              item={item}
              deleteItem={deleteItem}
              index={index}
              key={index}
            />
          </div>

          <button
          onClick={() => deleteItem(index)}
          className='delete-btn flex-column-deleteItem'
          ></button>
        </span>
      )
    })}
    <input placeholder='Total Tip' type='number' name='sumTip' value={sumTip} onChange={onInputChange}/>
    <Link to='/summary' onClick={calculateTotal}> Submit </Link>
  </div>
)

export default ReceiptItemEntryList;
