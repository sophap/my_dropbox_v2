import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import upload from "../upload.png";
import axios from "axios";
import "../App.css";
import { Heading, Image } from "@aws-amplify/ui-react";

const HomePage = ({ token }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUploadedSuccessfully, setFileUploadedSuccessfully] =
    useState(false);
  const [base64, setBase64] = useState("");

  const URL =
    "https://oibedj0s0d.execute-api.us-east-1.amazonaws.com/Development/file";

  useEffect(() => {
    // Function to get the current session
    const getCurrentSession = async () => {
      try {
        const session = await Auth.currentSession({ bypassCache: true }); // Refresh the token
        const accessToken = session.getAccessToken().getJwtToken();
        setAccessToken(accessToken);
        setAccessTokenReady(true);

      } catch (error) {
        console.log('Error retrieving session:', error);
        setAccessTokenReady(false); // Set the token readiness to false in case of an error
      }
    };
    getCurrentSession();
  }, []);
  const onFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();

    reader.onloadend = function () {
      const base64String = reader.result.split(",")[1];
      setBase64(base64String);
    };

    reader.readAsDataURL(file);
  };

  const onFileUpload = async () => {
    try {
      const response = await axios.post(URL, {
        fileData: base64,
        fileName: selectedFile.name,
        fileType: selectedFile.type,
        token: token,
      });
      console.log(response);
      setSelectedFile(null);
      setFileUploadedSuccessfully(true);
    } catch (error) {
      console.log(error);
    }
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

    reader.readAsArrayBuffer(file);
  };
  
  async function onFileUpload() {
    
    try {
      if (!accessTokenReady) {
        console.log('Access token not ready or expired. Please wait or refresh the page.');
        return;
      }
      const response = await fetch(
        'https://oibedj0s0d.execute-api.us-east-1.amazonaws.com/Development/file',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
          },
          body: JSON.stringify(payload), // Convert the fileData to JSON
        }
      );

      if (response.ok) {
        console.log('File uploaded');
        window.location.reload();
        setSelectedFile(null);
      } else {
        console.log('Uploading failed');
        console.log(payload);
      }
    } catch (error) {
      console.error(error);
    }
  }
      return (
        <div className="App">
          <div className="header">
            <Heading level={1}>My Dropbox</Heading>
            <Image src={upload} className="App-logo" alt="upload" />
            <div className="input__field" style={{ marginTop: "1rem" }}>
              <input type="file" onChange={onFileChange} />
              <button onClick={onFileUpload} disabled={!accessTokenReady}>Upload</button>
            </div>
            {selectedFile && (
          <div>
            <br />
            <h4>File Details:</h4>
            <p>File Name: {selectedFile.name}</p>
            <p>File Type: {selectedFile.type}</p>
            <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
          </div>
        )}
          </div>
        </div>
      );
    };

export default HomePage;

