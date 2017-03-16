import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';


class UploadReceipt extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Upload Your Receipt</h2>
        <form ref='uploadForm' 
          id='uploadForm' 
          action='http://localhost:3000/upload' 
          method='post' 
          encType="multipart/form-data">
            <input type="file" name="sampleFile" />
            <input type='submit' value='Upload!' />
        </form>     
      </div>
    );
  }
}


export default UploadReceipt;