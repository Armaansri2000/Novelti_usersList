import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar({ path, setPath }) {
  useEffect(() => {
    console.log(window.location.href);
  });
  return (
    <div className="navbarContainer">
      <Link to="/">Home</Link>
      {!path.includes("/updateUser") && (
        <Link to="/createUser">Create User</Link>
      )}
    </div>
  );
}

export default Navbar;
