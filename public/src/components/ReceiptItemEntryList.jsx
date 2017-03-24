import React from 'react';
import ReceiptItemEntry from './ReceiptItemEntry.jsx';

const ReceiptItemEntryList = ({items, selectItem, itemOnClick}) =>  (
  <div>
    <ul>
      {items.map((item,index) => {
        return (
            <li
              key={index}
              onClick={() => itemOnClick(index)}
              className={'itemName' + (selectItem === index ? 'Selected' : '')}
            >
             <ReceiptItemEntry item={item}/>
            </li>
          )
      })}
    </ul>
  </div>
)

export default ReceiptItemEntryList;
