import React from 'react';
import ReceiptItemEntry from './ReceiptItemEntry.jsx';

const ReceiptItemEntryList = ({items, selectItem, itemOnClick, deleteItem}) =>  (
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
  </div>
)

export default ReceiptItemEntryList;
