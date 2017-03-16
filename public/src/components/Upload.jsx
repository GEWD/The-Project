import React from 'react';
import ReactDOM from 'react-dom';

class UploadReceipt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {
    return (
      <div>
        <h2>Upload Your Receipt</h2>
        <form method='post' encType='multipart/form-data'>
          <input type='file' name='myReceipt'/>
          <input type='submit' name='submit' value='submit' onClick={this.props.upload}/>
        </form>
      </div>
    );
  }
}


export default UploadReceipt;