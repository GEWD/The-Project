import React from 'react';
import ReceiptItemEntry from './ReceiptItemEntry.jsx';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

const ReceiptItemEntryList = ({items, selectItem, itemOnClick, deleteItem,sumTax,sumTip,onInputChange,calculateTotal}) =>  (
  <div>
    <ul>
      {items.map((item,index) => {
        return (
            <div key={index}>
              <li
                className={'itemName' + (selectItem === index ? 'Selected' : '')}
                onClick={() => itemOnClick(index)}
              >
              <ReceiptItemEntry
                item={item}
                deleteItem={deleteItem}
                index={index}
                key={index}
              />
              </li>
              <button onClick={() => deleteItem(index) }>Delete</button>
            </div>
          )
      })}
    </ul>
    <input placeholder='Total Tip' type='number' name='sumTip' value={sumTip} onChange={onInputChange}/>
    <Link to='/summary' onClick={calculateTotal}> Submit </Link>
  </div>
)

export default ReceiptItemEntryList;
