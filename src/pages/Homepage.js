import { useState } from "react";
import upload from "../upload.png";
import "../App.css";
import { Heading, Image, View, Card } from "@aws-amplify/ui-react";

const HomePage = () => {
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
    <div className="App">
      <div className="header">
        <Heading level={1}>My Dropbox</Heading>
        <Image src={upload} className="App-logo" alt="upload" />
        <div className="input__field" style={{ marginTop: "1rem" }}>
          <input type="file" onChange={onFileChange} />
          <button onClick={onFileUpload}>Upload</button>
        </div>
        {fileData()}
      </div>
    </div>
  );
};

export default HomePage;
