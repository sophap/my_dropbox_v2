import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";

const HomeLayout = ({ signOut, user }) => {
  // passing global values to Outlet via RRD
  const value = "context example";
  return (
    <>
      <Navbar signOut={signOut} user={user} />
      <section className="page">
        <Outlet context={{ value }} />
      </section>
    </>
  );
};
export default HomeLayout;
