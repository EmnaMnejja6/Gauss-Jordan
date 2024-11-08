import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top w-100">
      <ul className="nav nav-pills mx-auto" style={{ fontSize: "20px" }}>
        <li className="nav-item">
          <a
            className="nav-link"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            Home
          </a>
        </li>
        <li className="nav-item">
          <NavLink to="/courses" className="nav-link">
            Course
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/resolution" className="nav-link">
            Resolution
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/inverse" className="nav-link">
            Inverse
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
