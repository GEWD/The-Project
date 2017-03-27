import React from 'react';
import AddMember from './AddMember.jsx';
import ReceiptItemEntryList from './ReceiptItemEntryList.jsx';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

const CreateItem = ({addItem, itemName, itemAmount, onInputChange,sumBill,sumTax,sumTip,items}) => (
  <div>
    <h2>Add your items</h2>
    <input placeholder='Item name' name='name' type='text' value={itemName} onChange= {onInputChange}/>
    <input placeholder='Amount' name='amount' type='number' value={itemAmount} onChange={onInputChange}/>
    <button onClick={addItem}>Add Item</button><br/><br/>
  </div>
)

export default CreateItem;
