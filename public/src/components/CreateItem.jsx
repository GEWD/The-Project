import React from 'react';

const CreateItem = ({addItem, itemName, itemAmount, items, addMember, members, member, onInputChange, deleteItem}) => {

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
        <hr/>
        <br/>
        <label>To:
        <input placeholder='Name' name='member' type='text' value={member} onChange={onInputChange}/>
        <button onClick={addMember}>Add Member</button><br/>
        <ul>
          {members.map((member, index) => {
            return <li key={index}>{member[0]}</li>
          })}
        </ul>
        </label>
      </div>
    )
  }


export default CreateItem;
