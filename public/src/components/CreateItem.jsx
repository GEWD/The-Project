import React from 'react';
import AddMember from './AddMember.jsx';

const CreateItem = ({addItem, itemName, itemAmount, items, selectItem, selectMember, addMember, member, members, onInputChange, memberExist, itemOnClick, memberOnClick,initialMemberSelect}) => {
  return (
      <div>
        <h2>Add your items</h2>
        <input placeholder='Item name' name='name' type='text' value={itemName} onChange= {onInputChange}/>
        <input placeholder='Amount' name='amount' type='number' value={itemAmount} onChange={onInputChange}/>
        <button onClick= {addItem}>Add Item</button><br/>

        <ul>
          {items.map((item,index) => {
            return (
                <li
                  key={index}
                  onClick={() => itemOnClick(index)}
                  className={'itemName' + (selectItem === index ? 'Selected' : '')}
                >
                  <span>{item[0].name}</span>
                  <span>{item[0].amount}</span>
                  <span>{item[0].members}</span>
                </li>
              )
          })}
        </ul>
        <br/>
        <hr/>
        <AddMember addMember={addMember} member={member} members={members} onInputChange={onInputChange} memberExist={memberExist} memberOnClick={memberOnClick} selectMember={selectMember} initialMemberSelect={initialMemberSelect}/>
      </div>
    )
  }


export default CreateItem;
