import React from "react";
import emna from "../images/emna.jpg";
import ons from "../images/ons.jpg";
import madame from "../images/madame.jpg";
const About: React.FC = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "5rem",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2>À propos</h2>
          <p style={{ fontSize: "22px" }}>
            Bienvenue sur notre site web! Ce site a été créé dans le contexte
            d'un projet pour la matiére Algorithme Numériques. Ce site est dédié
            pour la résolution des systèmes linéaires et le calcul de l'inverse
            d'une matrice en utilisant la méthode de Gauss-Jordan. Ici, vous
            trouverez des informations sur notre équipe.
          </p>
        </div>
        <div
          style={{ display: "inline-flex", flexDirection: "row", gap: "2rem" }}
        >
          <div className="card" style={{ width: "19rem" }}>
            <img className="card-img-top" src={ons} />
            <div className="card-body" style={{ textAlign: "center" }}>
              <h5 className="card-title">Ons Mhiri</h5>
              <p className="card-text">Étudiante en Ingénierie des Données</p>
              <p className="card-text">Faculté des Sciences de Sfax</p>
              <a
                href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Afsd_profile%3AACoAAEE022UBr53moggK_tvkENrr3VvHMDXgAcc&keywords=ons%20mhiri&origin=RICH_QUERY_SUGGESTION&position=1&searchId=10f9f7dd-0a4d-4dd7-87b4-6d2f83e40c69&sid=A-6&spellCorrectionEnabled=false"
                className="card-link"
                target="_blank"
              >
                <i className="bx bxl-linkedin"></i>
              </a>
              <a
                href="https://github.com/OnsMhiri"
                target="_blank"
                className="card-link"
              >
                <i className="bx bxl-github"></i>
              </a>
            </div>
          </div>

          <div className="card" style={{ width: "19rem" }}>
            <img className="card-img-top" src={emna} />
            <div className="card-body" style={{ textAlign: "center" }}>
              <h5 className="card-title">Emna Mnejja</h5>
              <p className="card-text">Étudiante en Ingénierie des Données</p>
              <p className="card-text">Faculté des Sciences de Sfax</p>
              <a
                href="https://www.linkedin.com/in/emna-mnejja-90294b259/"
                target="_blank"
                className="card-link"
              >
                <i className="bx bxl-linkedin"></i>
              </a>
              <a
                href="https://github.com/EmnaMnejja6"
                target="_blank"
                className="card-link"
              >
                <i className="bx bxl-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <p
        style={{
          fontSize: "22px",
          alignContent: "center",
          marginLeft: "400px",
        }}
      >
        Ce projet est encadré par madame Sirine Marrakchi
      </p>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "nowrap",
          marginTop: "5rem",
        }}
      >
        <div className="card" style={{ width: "18rem" }}>
          <img className="card-img-top" src={madame} />
          <div className="card-body" style={{ textAlign: "center" }}>
            <h5 className="card-title">Dr. Sirine Marrakchi</h5>
            <p className="card-text">Docteur en Informatique</p>
            <a href="#" className="card-link">
              <i className="bx bxl-linkedin"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/sirine-marrakchi-5a691a66/"
              target="_blank"
              className="card-link"
            >
              <i className="bx bxl-researchgate"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
