import React, { Component } from 'react';
import axios from 'axios';

class UploadForm extends Component {
  state = {
    uploadedFileData: null,
  };

  handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const fileData = reader.result;
      localStorage.setItem('uploadedFile', fileData);
      this.setState({ uploadedFileData: fileData });
    };

    reader.readAsDataURL(file);
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const file = event.target.fileInput.files[0];
  
    try {
      const accessToken = 't-g1045n2UWKDJAWZ2RZMRDZTPJNTAYU2TUH4RMR5I';
      const form = new FormData();
      form.append('file_name', '上传test.pdf');
      form.append('parent_type', 'explorer');
      form.append('parent_node', 'Beoifye2flJ5ZSd3UQHcuXpOnLP');
      form.append('size', file.size);
      form.append('file', file);
  
      const response = await fetch('https://open.feishu.cn/open-apis/drive/v1/files/upload_all', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
        },
        body: form
      });
  
      const responseData = await response.json(); // handle successful response here
      console.log(responseData);
    } catch (error) {
      console.error(error); // handle error response here
    }
  };

  render() {
    const { uploadedFileData } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="fileInput">Upload PDF:</label>
          <input type="file" id="fileInput" accept=".pdf" onChange={this.handleFileUpload} />
        </div>
        <button type="submit">Submit</button>
        {uploadedFileData && (
          <div>
            <h2>Uploaded PDF:</h2>
            <iframe src={uploadedFileData} title="Uploaded file" />
          </div>
        )}
      </form>
    );
  }
}

export default UploadForm;