import React from "react";
import emna from "../images/emna.jpg";
import ons from "../images/ons.jpg";
import madame from "../images/madame.jpg";

const About: React.FC = () => {
  return (
    <div
      style={{
        padding: "3rem 1rem",
        borderColor: "black",
        border: "1px",
        borderRadius: "10px",
        marginTop: "80px",
        maxWidth: "150vh",
        marginLeft: "380px",
        boxShadow: "0px 0px 10px rgba(206, 200, 200, 0.97)",
      }}
    >
      <h3 style={{ fontSize: "20 px", marginBottom: "1.5rem" }}>À propos</h3>
      <p
        style={{
          fontSize: "17 px",
          maxWidth: "800px",
          margin: "0 auto 3rem",
          lineHeight: "1.8",
          padding: "1rem",
          backgroundColor: "rgb(231, 249, 255)",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(191, 207, 252, 0.03)",
        }}
      >
        Bienvenue sur notre site web! Ce site a été créé dans le contexte d'un
        projet pour la matière Algorithmes Numériques. Ce site est dédié à la
        résolution des systèmes linéaires et au calcul de l'inverse d'une
        matrice en utilisant la méthode de Gauss-Jordan. Vous trouverez des
        informations sur notre équipe et les fonctionnalités offertes.
      </p>

      <h3 style={{ fontSize: "20 px", marginBottom: "1.5rem" }}>
        Fonctionnalités du site web
      </h3>
      <div
        style={{
          textAlign: "left",
          maxWidth: "800px",
          margin: "0 auto 3rem",
          fontSize: "17 px",
          lineHeight: "1.8",
          padding: "1rem",
          backgroundColor: "rgb(231, 249, 255)",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(191, 207, 252, 0.03)",
        }}
      >
        <ul
          style={{
            listStyle: "none",
            padding: "0",
            fontSize: "17px",
          }}
        >
          <li
            style={{
              marginBottom: "1rem",
              padding: "0.5rem",
              borderBottom: "1px solid #ddd",
            }}
          >
            <strong>➤</strong> Résolution des systèmes linéaires avec saisie
            manuelle de matrices (taille jusqu'à 5).
          </li>
          <li
            style={{
              marginBottom: "1rem",
              padding: "0.5rem",
              borderBottom: "1px solid #ddd",
            }}
          >
            <strong>➤</strong> Résolution des systèmes linéaires avec génération
            aléatoire de matrices (taille jusqu'à 5).
          </li>
          <li
            style={{
              marginBottom: "1rem",
              padding: "0.5rem",
              borderBottom: "1px solid #ddd",
            }}
          >
            <strong>➤</strong> Résolution des systèmes linéaires par importation
            de matrices agumentées (n * n+1) à partir d'un fichier avec
            détection automatique du type de matrice.
          </li>
          <li
            style={{
              marginBottom: "1rem",
              padding: "0.5rem",
              borderBottom: "1px solid #ddd",
            }}
          >
            <strong>➤</strong> Téléchargement de la matrice augmentée du système
            dans un fichier pour une réutilisabilité facile.
          </li>
          <li
            style={{
              marginBottom: "1rem",
              padding: "0.5rem",
              borderBottom: "1px solid #ddd",
            }}
          >
            <strong>➤</strong> Calcul d'inverse d'une matrice
          </li>
          <li
            style={{
              marginBottom: "1rem",
              padding: "0.5rem",
              borderBottom: "1px solid #ddd",
            }}
          >
            <strong>➤</strong> Calcul de determinant d'une matrice
          </li>
          <li
            style={{
              marginBottom: "1rem",
              padding: "0.5rem",
            }}
          >
            <strong>➤</strong> Les fichiers téléchargés incluent un code dans la
            première ligne qui identifie le type de matrice :
            <ul
              style={{
                marginLeft: "2rem",
                listStyle: "circle",
                marginTop: "1rem",
              }}
            >
              <li>
                <strong style={{ color: "blue" }}>spd</strong> : Symétrique
                définie positive
              </li>
              <li>
                <strong style={{ color: "blue" }}>dd</strong> : Diagonale
                dominante
              </li>
              <li>
                <strong style={{ color: "blue" }}>upper</strong> : Triangulaire
                supérieure
              </li>
              <li>
                <strong style={{ color: "blue" }}>inf</strong> : Triangulaire
                inférieure
              </li>
              <li>
                <strong style={{ color: "blue" }}>d</strong> : Diagonale
              </li>
              <li>
                <strong style={{ color: "blue" }}>band</strong> : Bande
              </li>
              <li>
                <strong style={{ color: "blue" }}>dense</strong> : Dense
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <h3 style={{ fontSize: "20 px", marginBottom: "1.5rem" }}>
        Développeurs
      </h3>
      <br />
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
              width: "250px",
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
              style={{ height: "200px" }}
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
            width: "250px",
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
            style={{ height: "200px", objectFit: "cover" }}
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
