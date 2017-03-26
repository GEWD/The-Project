import React from 'react';
import CreateItem from './CreateItem.jsx';
import ReceiptItemEntryList from './ReceiptItemEntryList.jsx';
import AddMember from './AddMember.jsx';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';


const Itemization = ({addItem, itemName, itemAmount, items, selectItem, deleteItem, selectMember, addMember, member, members, onInputChange, memberExist, itemOnClick, memberOnClick, initialMemberSelect}) => (
  <div>
    <CreateItem
      itemName={itemName}
      itemAmount={itemAmount}
      onInputChange={onInputChange}
      addItem={addItem}
    />
    <ReceiptItemEntryList
      items={items}
      selectItem={selectItem}
      itemOnClick={itemOnClick}
      deleteItem={deleteItem}
    />
    <Link to='/summary' value='sumbit'>Submit</Link>
    <AddMember
      addMember={addMember}
      member={member}
      members={members}
      onInputChange={onInputChange}
      memberExist={memberExist}
      memberOnClick={memberOnClick}
      selectMember={selectMember}
      initialMemberSelect={initialMemberSelect}
    />
  </div>
)

export default Itemization;
