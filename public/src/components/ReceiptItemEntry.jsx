import React from 'react';

const ReceiptItemEntry = ({item, index, deleteItem}) => (
  <div>
    <div className='flex-container flex-column-receiptItem'>
      <span className='flex-column-name receipt-item-name'>{item[0].name}</span>
      <span className='flex-column-amount receipt-item-amount'>{item[0].amount}</span>
    </div>
    <div className='flex-container receipt-members-list'>
      {item[0].members.map((member, index) => {
        return <span key={index} className='receipt-member'>{member}</span>
      })}
    </div>
  </div>
)

export default ReceiptItemEntry;
