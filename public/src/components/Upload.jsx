import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

class UploadReceipt extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filename: ''
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleFormSubmit(e) {
    this.props.callGVision(this.refs.uploadForm);
  }

  handleFileUpload(e) {
    this.setState({
      filename: e.target.files[0].name
    });
  }

  render() {
    return (
      <div>
        <div>
          <Link to='/create-trip' className='back-history'>{this.props.tripName.length > 0 ? this.props.tripName : 'Create Trip'}</Link>
        </div>
        <div className='page-container'>
          <h1>Receipt Upload</h1>
          <form ref='uploadForm'
            id='uploadForm'
            action='localhost:3000/upload'
            method='post'
            encType="multipart/form-data">
            <input
              id='text-field'
              type='text'
              placeholder='Receipt Name'
              name='receiptName'
              onChange={this.props.onInputChange}
            />
            <label className='file-upload-btn'>
              {this.state.filename.length > 0 ?
                <span className='upload-filename'>{this.state.filename}</span>
                :
                <span className='upload-btn-text'>Upload Receipt</span>
              }
              <input
                type='file'
                name='sampleFile'
                className='file-field'
                onChange={(e) => this.handleFileUpload(e) }
              />
            </label>
            <div className='btn-primary'>
              <Link
                to='/additems'
                value='submit'
                onClick={this.handleFormSubmit}
                className='btn-link'
              >Submit</Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default UploadReceipt;
