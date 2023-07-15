import React, { Component } from "react";
// import axios from "axios";
import upload from "./upload.png";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";
import Navbar from "./components/Navbar";
import { useState } from "react";

const App = ({ signOut, user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUploadedSuccessfully, setFileUploadedSuccessfully] =
    useState(false);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("demo file", selectedFile, selectedFile.name);

    //call api
    // console.log(formData);
    setSelectedFile(null);
    setFileUploadedSuccessfully(true);
  };

  const fileData = () => {
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
  return (
    <>
      <Navbar signOut={signOut} user={user} />
      <View className="App">
        <Card>
          <Heading level={1}>My Dropbox</Heading>
          <Image src={upload} className="App-logo" alt="upload" />
          <div>
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>Upload</button>
          </div>
          {fileData()}
        </Card>
      </View>
    </>
  );
};

export default withAuthenticator(App);

// class App extends Component {
// state = {
//   selectedFile: null,
//   fileUploadedSuccessfully: false,
// };
// onFileChange = (event) => {
//   this.setState({ selectedFile: event.target.files[0] });
// };
// onFileUpload = () => {
//   const formData = new FormData();
//   formData.append(
//     "demo file",
//     this.state.selectedFile,
//     this.state.selectedFile.name
//   );
//   //call api
//   console.log(formData);
//   this.setState({ selectedFile: null });
//   this.setState({ fileUploadedSuccessfully: true });
// };
// fileData = () => {
//   if (this.state.selectedFile) {
//     return (
//       <div>
//         <h2>File Details:</h2>
//         <p>File Name: {this.state.selectedFile.name}</p>
//         <p>File Type: {this.state.selectedFile.type}</p>
//         <p>
//           Last Modified:{" "}
//           {this.state.selectedFile.lastModifiedDate.toDateString()}
//         </p>
//       </div>
//     );
//   } else if (this.state.fileUploadedSuccessfully) {
//     return (
//       <div>
//         <br />
//         <h4>Your file has been uploaded successfully</h4>
//       </div>
//     );
//   } else {
//     return (
//       <div>
//         <br />
//         <h4>Choose a file and then press the upload button</h4>
//       </div>
//     );
//   }
// };
// render() {
// const { signOut, user } = this.props;
// return (
//   <>
//     <Navbar signOut={signOut} user={user} />
//     <View className="App">
//       <Card>
//         <Heading level={1}>My Dropbox</Heading>
//         <Image src={upload} className="App-logo" alt="upload" />
//         <div>
//           <input type="file" onChange={this.onFileChange} />
//           <button onClick={this.onFileUpload}>Upload</button>
//         </div>
//         {this.fileData()}
//       </Card>
//     </View>
//   </>
// );
//   }
// }
