import React from 'react';

const ReceiptItemEntry = ({item}) => (
  <div>
    <span className='receipt-item-name'>{item[0].name}</span>
      <span className='receipt-item-amount'>{item[0].amount}</span>
      <div className='receipt-members-list'>
        {item[0].members.map((member, index) => {
          return <span key={index} className='receipt-member'>{member}</span>
        })}
      </div>
  </div>
)

export default ReceiptItemEntry;
