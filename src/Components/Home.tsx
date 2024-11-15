import React from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MathJaxContext>
      <div style={styles.container}>
        <div style={styles.leftContainer}>
          <h1 style={styles.title}>Méthode de</h1>
          <h1 style={styles.title}>Gauss-Jordan</h1>

          <div style={styles.equationContainer}>
            <MathJax dynamic>
              {
                "\\( \\left( \\begin{matrix} a & b \\\\ c & d \\end{matrix} \\right) \\left( \\begin{matrix} x_1 \\\\ x_2 \\end{matrix} \\right) = \\left( \\begin{matrix} b_1 \\\\ b_2 \\end{matrix} \\right) \\)"
              }
            </MathJax>
          </div>

          <button style={styles.button} onClick={() => navigate("/courses")}>
            Commencer
          </button>

          <footer style={styles.footer}>Made by Mayna & Noussa ♥</footer>
        </div>

        <div style={styles.rightContainer}>
          <h2 style={styles.sectionTitle}>
            C'est quoi l'ellimination de Gauss Jordan?
          </h2>
          <p style={styles.text}>
            L’élimination de Gauss-Jordan est un algorithme de transformation
            menant à un système équivalent d’équations linéaires A x = b , où R
            est sous FER, qui n’utilise que des opérations élémentaires sur les
            lignes. En langage courant, on dit que la transformation d’une
            matrice en FER est une réduction.
          </p>

          <h3 style={styles.sectionTitle}>Appliquer la méthode</h3>
          <button style={styles.practiceButton}>
            <a
              style={{ color: "white" }}
              target="_blank"
              href="https://elearn.univ-oran2.dz/pluginfile.php/79767/mod_resource/content/1/fiche%20tp1%20%28L2-%20M%C3%A9thode%20Num%C3%A9rique%29.pdf"
            >
              Exercices
            </a>
          </button>

          <h3 style={styles.sectionTitle}>Regarder une vidéo</h3>
          <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/eYSASx8_nyg?si=E2IzyUVsFfa0vvIw"
            title="Introduction to Gauss-Jordan Method"
            style={styles.video}
          ></iframe>
        </div>
      </div>
    </MathJaxContext>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row" as const,
    minHeight: "100vh",
    padding: "20px",
    boxSizing: "border-box" as const,
    // backgroundColor: "#f9f9f9",
    backgroundColor: "white",
  },
  leftContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center" as const,
  },
  rightContainer: {
    flex: 1,
    padding: "40px",
  },
  title: {
    fontSize: "64px",
    fontWeight: "bold",
    color: "#333",
    margin: "0 0 20px 0",
    lineHeight: "1.2",
  },
  equationContainer: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "40px",
  },
  button: {
    fontSize: "20px",
    padding: "12px 24px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  footer: {
    fontSize: "16px",
    color: "#555",
    marginTop: "40px",
  },
  sectionTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: "10px",
  },
  text: {
    fontSize: "16px",
    color: "#333",
    lineHeight: "1.5",
    marginBottom: "20px",
  },
  practiceButton: {
    fontSize: "18px",
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "30px",
  },
  video: {
    borderRadius: "8px",
  },
};

export default Home;
