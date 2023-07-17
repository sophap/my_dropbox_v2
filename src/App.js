import React, { Component } from 'react';
import axios from 'axios';
import upload from "./upload.png";
import "@aws-amplify/ui-react/styles.css";
import FileUploader from './FileUploader';
import "./App.css";
import {
  withAuthenticator,
  Button
} from "@aws-amplify/ui-react";

class App extends Component {
  state = {
    selectedFile: null,
    fileUploadedSuccessfully: false
  }
  onFileChange = event => {
    this.setState({selectedFile: event.target.files[0]});
  }
  onFileUpload = () => {
    const formData = new FormData();
    formData.append(
    "demo file",
    this.state.selectedFile,
    this.state.selectedFile.name
    )
    //call api
    console.log(formData);
    this.setState({selectedFile: null});
    this.setState({fileUploadedSuccessfully: true});
  }
  fileData =() => {
    if (this.state.selectedFile) {
      return (
      <div>
        <h2>File Details:</h2>
        <p>File Name: {this.state.selectedFile.name}</p>
        <p>File Type: {this.state.selectedFile.type}</p>
        <p>Last Modified: {" "}
        {this.state.selectedFile.lastModifiedDate.toDateString()}
        </p>
      </div>
      );
    } else if (this.state.fileUploadedSuccessfully) {
      return (
        <div>
          <br/>
          <h4>Your file has been uploaded successfully</h4>
        </div>
      );
    } else {
      return (
        <div>
          <br/>
          <h4>Choose a file and then press the upload button</h4>
        </div>
      );
    }
  }
  render() {
    const { signOut } = this.props;
      return (
    <View className="App">
      <Card>
        <Heading level={1}>My Dropbox</Heading>
        <Image src={upload} className="App-logo" alt="upload" />
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>
            Upload
          </button>
        </div>
        {this.fileData()}
      </Card>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
}
}

export default withAuthenticator(App);
