import React from 'react';
import upload from "./upload.png";
import "@aws-amplify/ui-react/styles.css";
import FileUploader from './FileUploader';
import "./App.css";
import {
  withAuthenticator,
  Button
} from "@aws-amplify/ui-react";

function App({ signOut }) {
  return (
    <div className="App">
      <header>
        <h1>My Dropbox</h1>
        <img src={upload} className="App-logo" alt="logo" />
      </header>
      <main>
        <FileUploader />
      </main>
      <footer><Button onClick={signOut}>Sign Out</Button></footer>
    </div>
    
  );
}

export default withAuthenticator(App);
