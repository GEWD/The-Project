import React from 'react';

class AddMember extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.initialMemberSelect();
  }

  render() {

    return (
      <div>
        <label>To:
        <input placeholder='Name' name='member' type='text' value={this.props.member} onChange={this.props.onInputChange}/>
        <button onClick={this.props.addMember}>Add Member</button><br/>
        {this.props.memberExist ? <p>The name already exist!</p> : null}
        <ul>
          {this.props.members.map((member, index) => {
            return (
              <li
                key={index}
                onClick={() => this.props.memberOnClick(member[0])}
                className={'selectMember' + (this.props.selectMember === member[0] ? 'Selected' : '')}
              >{member[0]}</li>
            )
          })}
        </ul>
        </label>
      </div>
    ) 

  }
}

export default AddMember;
