import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import "./navbar.css";
import { MathJax, MathJaxContext } from "better-react-mathjax";
const Navbar: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const openSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const openLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top w-100">
      <div className="container">
        <ul className="nav nav-pills mx-auto" style={{ fontSize: "18px" }}>
          <li className="nav-item">
            <a
              className="nav-link"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              <span style={{ margin: "3px" }}>
                <i className="bx bxs-home"></i>
              </span>
              Accueil
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
          <MathJaxContext>
            <li className="nav-item">
              <NavLink
                to="/resolution"
                className="nav-link"
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                Résolution
                <MathJax dynamic>{`\\( Ax=b \\)`}</MathJax>
              </NavLink>
            </li>
          </MathJaxContext>

          <MathJaxContext>
            <li
              className="nav-item"
              style={{
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <NavLink
                to="/inverse"
                className="nav-link"
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                Inverse
                <MathJax dynamic>{`\\( A^{-1} \\)`}</MathJax>
              </NavLink>
            </li>
          </MathJaxContext>
          <MathJaxContext>
            <li
              className="nav-item"
              style={{
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <NavLink
                to="/determinant"
                className="nav-link"
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                Déterminant
                <MathJax dynamic>{`\\( |A| \\)`}</MathJax>
              </NavLink>
            </li>
          </MathJaxContext>

          <li className="bg-primary">
            <button
              className="btn btn-primary"
              style={{
                position: "absolute",
                right: "20px",
                top: "10px",
                width: "100px",
              }}
              onClick={() => setShowLoginModal(true)}
            >
              <i className="bx bxs-log-in"></i> Login
            </button>
          </li>
        </ul>

        {/* Backdrop */}
        {(showLoginModal || showSignupModal) && (
          <div className="backdrop"></div>
        )}

        {/* Login Modal */}
        {showLoginModal && (
          <div className="modal show" tabIndex={-1} role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowLoginModal(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <Login openSignup={openSignup} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Signup Modal */}
        {showSignupModal && (
          <div className="modal show" tabIndex={-1} role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowSignupModal(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <Signup openLogin={openLogin} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
