import React, { useState } from "react";
import MatrixInputFile from "./MatrixInputFile";
import MatrixInputRandom from "./MatrixInputRandom";
import MatrixInputManual from "./MatrixInputManual";
import "bootstrap/dist/css/bootstrap.min.css";

const Resolution: React.FC = () => {
  const [inputType, setInputType] = useState<String | null>(null);

  return (
    <div
      className="container card shadow p-4 mb-5 bg-white rounded "
      style={{
        maxWidth: "1000px",
        marginLeft: "380px",
        marginTop: "80px",
        fontSize: "18px",
      }}
    >
      <h2 className="text-center mb-4">Choisir le type de saisie</h2>
      <p className="text-muted text-center mb-4">
        Veuillez sélectionner le mode de saisie de la matrice.
      </p>
      <div className="form-check mb-3">
        <input
          type="radio"
          className="form-check-input"
          name="inputType"
          value="manual"
          onChange={() => setInputType("manual")}
          checked={inputType === "manual"}
        />
        <label className="form-check-label ms-2">Saisie Manuelle</label>
      </div>
      <div className="form-check mb-3">
        <input
          type="radio"
          className="form-check-input"
          name="inputType"
          value="random"
          onChange={() => setInputType("random")}
          checked={inputType === "random"}
        />
        <label className="form-check-label ms-2">Aléatoire</label>
      </div>
      <div className="form-check mb-4">
        <input
          type="radio"
          className="form-check-input"
          name="inputType"
          value="file"
          onChange={() => setInputType("file")}
          checked={inputType === "file"}
        />
        <label className="form-check-label ms-2">
          Importer à partir d'un fichier
        </label>
      </div>

      {inputType === "manual" && <MatrixInputManual />}
      {inputType === "random" && <MatrixInputRandom />}
      {inputType === "file" && <MatrixInputFile />}
    </div>
  );
};

export default Resolution;
