import React from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useNavigate } from "react-router-dom";

const GaussJordan: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MathJaxContext>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          padding: "20px",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "40px",
            fontSize: "40px",
          }}
        >
          <MathJax dynamic>
            {
              "\\( \\left( \\begin{matrix} a & b \\\\ c & d \\end{matrix} \\right) \\left( \\begin{matrix} x_1 \\\\ x_2 \\end{matrix} \\right) = \\left( \\begin{matrix} b_1 \\\\ b_2 \\end{matrix} \\right) \\)"
            }
          </MathJax>
        </div>
        <h1 style={styles.title}>Méthode de</h1>
        <h1 style={styles.title}>Gauss-Jordan</h1>
        <button style={styles.button} onClick={() => navigate("/courses")}>
          Commencer
        </button>
      </div>
    </MathJaxContext>
  );
};

const styles = {
  title: {
    fontSize: "128px",
    fontWeight: "bold",
    marginBottom: "40px",
    marginLeft: "60px",
    lineHeight: "20px",
    marginTop: "200px",
  },
  button: {
    fontSize: "20px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
    marginLeft: "60px",
  },
};

export default GaussJordan;
