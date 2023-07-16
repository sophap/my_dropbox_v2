// import React, { Component } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import HomeLayout from "./pages/HomeLayout";
import Homepage from "./pages/Homepage";
import Filespage from "./pages/Filespage";
import "@aws-amplify/ui-react/styles.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = ({ signOut, user }) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout signOut={signOut} user={user} />,
      errorElement: <h2>There was an error...</h2>,
      children: [
        {
          index: true,
          element: <Homepage />,
        },
        {
          path: "files",
          element: <Filespage />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
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
