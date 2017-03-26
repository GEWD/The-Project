import React from 'react';
import CreateItem from './CreateItem.jsx';
import ReceiptItemEntryList from './ReceiptItemEntryList.jsx';
import AddMember from './AddMember.jsx';
import {Link} from 'react-router-dom';


const Itemization = ({addItem, itemName, itemAmount, items, selectItem, deleteItem, selectMember, addMember, member, members, onInputChange, memberExist, itemOnClick, memberOnClick, initialMemberSelect,sumTax,sumTip,calculateTotal}) => (
  <div>
    <Link to='/upload-receipt' className='back-history'>Upload Receipt</Link>
    <div >
      <ReceiptItemEntryList
        items={items}
        selectItem={selectItem}
        itemOnClick={itemOnClick}
        deleteItem={deleteItem}
        sumTax={sumTax}
        sumTip={sumTip}
        onInputChange={onInputChange}
        calculateTotal={calculateTotal}
      />
      <CreateItem
        itemName={itemName}
        itemAmount={itemAmount}
        onInputChange={onInputChange}
        addItem={addItem}
      />
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
  </div>
)

export default Itemization;
