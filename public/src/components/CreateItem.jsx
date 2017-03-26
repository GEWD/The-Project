import React from 'react';
import AddMember from './AddMember.jsx';
import ReceiptItemEntryList from './ReceiptItemEntryList.jsx';

const CreateItem = ({addItem, itemName, itemAmount, onInputChange}) => (
  <div>
    <h2>Add your items</h2>
    <input placeholder='Item name' name='name' type='text' value={itemName} onChange= {onInputChange}/>
    <input placeholder='Amount' name='amount' type='number' value={itemAmount} onChange={onInputChange}/>
    <button onClick={addItem}>Add Item</button><br/>
  </div>
)

export default CreateItem;
