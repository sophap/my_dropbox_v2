import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import "./Filespage.css";

const Filespage = () => {
  const [files, setFiles] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [accessTokenReady, setAccessTokenReady] = useState(false);
  useEffect(() => {

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
  useEffect(() => {
    if (accessTokenReady) {
      fetchFiles();
    }
  }, [accessTokenReady]);

    // Function to fetch the list of files from your Lambda function
    const fetchFiles = async () => {
      try {
        const response = await fetch(
          `https://oibedj0s0d.execute-api.us-east-1.amazonaws.com/Development/file?token=${encodeURIComponent(
            accessToken
          )}`,
          {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
        ); // Replace with your actual Lambda endpoint URL

        if (response.ok) {
          const data = await response.json();
          setFiles(data); // Assuming your Lambda response returns an array of files
        } else {
            console.log('Failed to fetch files');
        }
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };
  const handleDownload = (file) => {
    // Create a temporary anchor element to trigger the download
    const link = document.createElement('a');
    link.href = file.Url; // Replace with the actual URL of the file in S3
    link.download = file.file; // Specify the filename for the download
    link.target = '_blank'; // Open the link in a new tab
    link.click(); // Programmatically trigger the download
  };

  const handleDelete = async (fileId) => {
    const username = (await Auth.currentAuthenticatedUser()).username;
    const folderName = username; // Assuming the folder name is the same as the username
    const fileName = fileId;
    try {
      const response = await fetch('https://oibedj0s0d.execute-api.us-east-1.amazonaws.com/Development/file', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ folderName, fileName }), // Send the file ID or any other identifier to identify the file to delete
      });
      if (response.ok) {
        console.log('File deleted successfully');
        // Update the files state to remove the deleted file from the UI
        setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
      } else {
        console.log('Failed to delete file');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <div>
      <h2>View Files</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            {/* Display file details or provide links to download/view files */}
            <span>{file.file}</span>
            <a href={file.url} target="_blank" rel="noopener noreferrer">Download</a>
            <button onClick={() => handleDownload(file)}>Download</button>
            <button onClick={() => handleDelete(file.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filespage;
