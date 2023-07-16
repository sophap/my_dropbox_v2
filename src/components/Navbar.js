import "./Navbar.css";
import { Button } from "@aws-amplify/ui-react";
import { Link } from "react-router-dom";

const Navbar = ({ signOut, user }) => {
  const { preferred_username: username } = user.attributes;
  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <a href="/">
            <h1>My Dropbox</h1>
          </a>
        </div>
        <a href="/files">
          <h3>View Files</h3>
        </a>
        <div className="div-2">
          <span>Hello, {username}</span>
          <Button onClick={signOut}>Sign Out</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
