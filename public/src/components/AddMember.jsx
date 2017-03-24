import React from 'react';

const AddMember = ({addMember, members, member, onInputChange, memberExist}) => (
  <div>
    <label>To:
    <input placeholder='Name' name='member' type='text' value={member} onChange={onInputChange}/>
    <button onClick={addMember}>Add Member</button><br/>
    {memberExist ? <p>The name already exist!</p> : null}
    <ul>
      {members.map((member, index) => {
        return <li key={index}>{member[0]}</li>
      })}
    </ul>
    </label>
  </div>
)

export default AddMember;
