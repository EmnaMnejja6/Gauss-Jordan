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
            <span style={{ margin: "3px" }}>
              <i className="bx bxs-home"></i>
            </span>
            Acceuil
          </a>
        </li>
        <li className="nav-item">
          <NavLink to="/about" className="nav-link">
          <span style={{ margin: "3px" }}>
              <i className="bx bxs-info-circle"></i>
            </span>
            A propos
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/courses" className="nav-link">
          <span style={{ margin: "3px" }}>
              <i className="bx bxs-book"></i>
            </span>
            Cours
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/resolution" className="nav-link">
            <span style={{ margin: "3px" }}>
              <i className="bx bxs-calculator"></i>
            </span>
            Résolution
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/inverse" className="nav-link">
          <span style={{ margin: "3px" }}>
              <i className="bx bx-math"></i>
            </span>
            Inverse
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
