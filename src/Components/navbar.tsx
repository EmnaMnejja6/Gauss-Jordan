import React from "react";

interface NavbarProps {
  onSelect: (section: string) => void;
  selectedSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ onSelect, selectedSection }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top w-100">
      <ul className="nav nav-pills mx-auto" style={{ fontSize: "20px" }}>
        <li className="nav-item">
          <a
            className={`nav-link ${selectedSection === "home" ? "active" : ""}`}
            href="#"
            onClick={() => onSelect("home")}
          >
            Home
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${
              selectedSection === "cours" ? "active" : ""
            }`}
            href="#"
            onClick={() => onSelect("cours")}
          >
            Course
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${
              selectedSection === "resolution" ? "active" : ""
            }`}
            href="#"
            onClick={() => onSelect("resolution")}
          >
            Resolution
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${
              selectedSection === "inverse" ? "active" : ""
            }`}
            href="#"
            onClick={() => onSelect("inverse")}
          >
            Inverse
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
