import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/players" className="navbar-link">
          Add A Puppy
        </Link>
      </nav>
    </div>
  );
}
