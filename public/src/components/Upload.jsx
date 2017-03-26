import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

class UploadReceipt extends React.Component {

  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(e) {
    this.props.callGVision(this.refs.uploadForm);
  }

  render() {

    return (
      <div>
        <h2>{this.props.tripName}</h2>
        <h3>Upload Your Receipt for </h3>
        <form ref='uploadForm'
          id='uploadForm'
          action='localhost:3000/upload'
          method='post'
          encType="multipart/form-data">
          <input type="file" name="sampleFile" />
          <Link to='/additems' value='submit' onClick={this.handleFormSubmit}>Submit</Link><br/>
          <input type='text' name='receiptName' onChange={this.props.onInputChange}/>
        </form>
      </div>
    )
  }
}

export default UploadReceipt;
