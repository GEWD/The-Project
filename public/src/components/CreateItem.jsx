import React from 'react';
import AddMember from './AddMember.jsx';
import ReceiptItemEntryList from './ReceiptItemEntryList.jsx';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

const CreateItem = ({addItem, itemName, itemAmount, onInputChange,sumBill,sumTax,sumTip,items}) => (
  <div>
    <div className='flex-container flex-column-receiptItem'>
      <input
        placeholder='Item Name'
        name='name' type='text'
        value={itemName}
        onChange= {onInputChange}
        id='input-name'
        className='flex-column-name'
      />
      <input
        placeholder='$00.00'
        name='amount'
        type='number'
        value={itemAmount}
        onChange={onInputChange}
        id='input-amount'
        className='flex-column-amount'
      />
    </div>
    <div className='btn btn-secondary btn-wide'>
      <a onClick={addItem} className='btn-link-secondary'>+ Add Item</a><br/>
    </div>
  </div>
)

export default CreateItem;
