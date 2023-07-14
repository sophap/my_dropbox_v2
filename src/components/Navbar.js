import "./Navbar.css";
import { Button } from "@aws-amplify/ui-react";
const Navbar = ({ signOut, user }) => {
  const { preferred_username: username } = user.attributes;
  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <h1 href="#">My Dropbox</h1>
        </div>
        <h3>View Files</h3>
        <div className="div-2">
          <span>Hello, {username}</span>
          <Button onClick={signOut}>Sign Out</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
