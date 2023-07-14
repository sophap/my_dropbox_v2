import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

class FileUploader extends Component {
  state = {
    selectedFile: null,
    fileUploadedSuccessfully: false,
    fileList: [],
  };

  onFileChange = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = async () => {
    const { selectedFile } = this.state;

    const formData = new FormData();
    formData.append('filedata', selectedFile);
    formData.append('filename', selectedFile.name);

    try {
      const session = await Auth.currentSession();
      const accessToken = session.getAccessToken().getJwtToken();
      formData.append('token', accessToken); 

      const response = await fetch('https://lwh35fi9y5.execute-api.us-east-1.amazonaws.com/Development/file', {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        this.setState({ selectedFile: null, fileUploadedSuccessfully: true });
        this.fetchFileList(); // Refresh the file list after successful upload
      } else {
        console.error('File upload failed:', response.statusText);
      }
    } catch (error) {
      console.error('File upload failed:', error);
    }
  };

  fetchFileList = async () => {
    try {
      const response = await fetch('https://lwh35fi9y5.execute-api.us-east-1.amazonaws.com/Development/file', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const fileList = await response.json();
        this.setState({ fileList });
      } else {
        console.error('Failed to fetch file list:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch file list:', error);
    }
  };

  deleteFile = async fileName => {
    try {
      const response = await fetch('https://lwh35fi9y5.execute-api.us-east-1.amazonaws.com/Development/file', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file: fileName }),
      });

      if (response.ok) {
        this.fetchFileList(); // Refresh the file list after successful deletion
      } else {
        console.error('Failed to delete file:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to delete file:', error);
    }
  };

  componentDidMount() {
    this.fetchFileList();
  }

  fileData = () => {
    const { selectedFile, fileUploadedSuccessfully, fileList } = this.state;

    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
        </div>
      );
    } else if (fileUploadedSuccessfully) {
      return (
        <div>
          <br />
          <h4>Your file has been uploaded successfully</h4>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose a file and then press the upload button</h4>
        </div>
      );
    }
  };

  render() {
    const { fileList } = this.state;

    return (
      <div>
        <input type="file" onChange={this.onFileChange} />
        <button onClick={this.onFileUpload}>Upload</button>
        {this.fileData()}
        <h2>Uploaded Files:</h2>
        {fileList.length > 0 ? (
          <ul>
            {fileList.map(file => (
              <li key={file.file}>
                <a href={file.url} target="_blank" rel="noopener noreferrer">
                  {file.file}
                </a>
                <button onClick={() => this.deleteFile(file.file)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No files uploaded</p>
        )}
      </div>
    );
  }
}

export default FileUploader;
