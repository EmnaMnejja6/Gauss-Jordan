import React from "react";
import emna from "../images/emna.jpg";
import ons from "../images/ons.jpg";
import madame from "../images/madame.jpg";

const About: React.FC = () => {
  return (
    <div
      style={{
        padding: "3rem 1rem",
        textAlign: "center",
        borderColor: "black",
        border: "1px solid",
        borderRadius: "10px",
        marginTop: "80px",
        marginLeft: "420px",
        maxWidth: "150vh",
      }}
    >
      <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>À propos</h2>
      <p
        style={{ fontSize: "1.2rem", maxWidth: "800px", margin: "0 auto 3rem" }}
      >
        Bienvenue sur notre site web! Ce site a été créé dans le contexte d'un
        projet pour la matière Algorithme Numériques. Ce site est dédié pour la
        résolution des systèmes linéaires et le calcul de l'inverse d'une
        matrice en utilisant la méthode de Gauss-Jordan. Ici, vous trouverez des
        informations sur notre équipe.
      </p>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {[
          {
            name: "Ons Mhiri",
            role: "Étudiante en Ingénierie des Données",
            institution: "Faculté des Sciences de Sfax",
            img: ons,
            linkedin: "https://www.linkedin.com/in/ons-mhiri-085458266/",
            github: "https://github.com/OnsMhiri",
          },
          {
            name: "Emna Mnejja",
            role: "Étudiante en Ingénierie des Données",
            institution: "Faculté des Sciences de Sfax",
            img: emna,
            linkedin: "https://www.linkedin.com/in/emna-mnejja-90294b259/",
            github: "https://github.com/EmnaMnejja6",
          },
        ].map((member, index) => (
          <div
            className="card"
            key={index}
            style={{
              width: "300px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              overflow: "hidden",
              transition: "transform 0.3s ease",
            }}
          >
            <img
              className="card-img-top"
              src={member.img}
              alt={`${member.name}`}
              style={{ height: "300px", objectFit: "cover" }}
            />
            <div className="card-body" style={{ padding: "1rem" }}>
              <h5
                className="card-title"
                style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}
              >
                {member.name}
              </h5>
              <p
                className="card-text"
                style={{ fontSize: "1rem", color: "#555" }}
              >
                {member.role}
              </p>
              <p
                className="card-text"
                style={{ fontSize: "0.9rem", color: "#777" }}
              >
                {member.institution}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                  marginTop: "1rem",
                }}
              >
                <a href={member.linkedin} target="_blank" className="card-link">
                  <i
                    className="bx bxl-linkedin"
                    style={{ fontSize: "1.5rem", color: "#0e76a8" }}
                  ></i>
                </a>
                <a href={member.github} target="_blank" className="card-link">
                  <i
                    className="bx bxl-github"
                    style={{ fontSize: "1.5rem", color: "#333" }}
                  ></i>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "4rem", textAlign: "center" }}>
        <p style={{ fontSize: "1.2rem", color: "#555" }}>
          Ce projet est encadré par madame Sirine Marrakchi
        </p>
        <div
          className="card"
          style={{
            width: "300px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            overflow: "hidden",
            transition: "transform 0.3s ease",
            margin: "0 auto",
            marginTop: "2rem",
          }}
        >
          <img
            className="card-img-top"
            src={madame}
            alt="Madame Sirine Marrakchi"
            style={{ height: "300px", objectFit: "cover" }}
          />
          <div className="card-body" style={{ padding: "1rem" }}>
            <h5
              className="card-title"
              style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}
            >
              Dr. Sirine Marrakchi
            </h5>
            <p
              className="card-text"
              style={{ fontSize: "1rem", color: "#555" }}
            >
              Docteur en Informatique
            </p>
            <a
              href="https://www.linkedin.com/in/sirine-marrakchi-5a691a66/"
              target="_blank"
              className="card-link"
            >
              <i
                className="bx bxl-linkedin"
                style={{ fontSize: "1.5rem", color: "#0e76a8" }}
              ></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
