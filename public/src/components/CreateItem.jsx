import React from 'react';

const CreateItem = ({addItem,itemName,itemAmount,items,onNameChange,onPriceChange}) => {
  return (
      <div>
        <h2>Add your items</h2>
        <input placeholder='receipt name' type='text' onChange= {onNameChange}/>
        <input placeholder='amount' type='number' onChange={onPriceChange}/>
        <button onClick= {addItem}>Add</button><br/>
        <ul>      
          {items.map((item,index) => {
            return <li key={index}>{item[0] + '   ' + item[1]}</li>
          })}
        </ul>
      </div>
    )
  }


export default CreateItem;