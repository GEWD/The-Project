import React from 'react';
import AddMember from './AddMember.jsx';

const CreateItem = ({addItem, itemName, itemAmount, items, addMember, member, members, onInputChange, memberExist, deleteItem}) => {
  return (
      <div>
        <h2>Add your items</h2>
        <input placeholder='Item name' name='name' type='text' value={itemName} onChange= {onInputChange}/>
        <input placeholder='Amount' name='amount' type='number' value={itemAmount} onChange={onInputChange}/>
        <button onClick= {addItem}>Add Item</button><br/>
        <ul>
          {items.map((item,index) => {
            return <li onClick ={() => {
              deleteItem(index);
            }} key={index}>{item[0] + '   ' + item[1] }</li>
          })}
        </ul>
        <br/>
        <hr/>
        <AddMember addMember={addMember} member={member} members={members} onInputChange={onInputChange} memberExist={memberExist}/>
      </div>
    )
  }


export default CreateItem;
