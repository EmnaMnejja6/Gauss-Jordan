import React, { useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import {
  gaussJordanWithPivot,
  gaussJordanWithoutPivot,
  resolveDiagonal,
  resolveBand,
  resolveSymmetricPositiveDefinite,
} from "../utils/matrixCalculations";
import MatrixInputFile from "./MatrixInputFile";
import MatrixInputRandom from "./MatrixInputRandom";
import MatrixInputManual from "./MatrixInputManual";

const Resolution: React.FC = () => {
  const [inputType, setInputType] = useState<String | null>(null);

  return (
    <div
      className="container"
      style={{
        width: "600px",
        fontSize: "24px",
        marginTop: "80px",
        marginLeft: "500px",
        marginRight: "auto",
        textAlign: "justify",
      }}
    >
      <h2>Choisir le type de saisie</h2>
      {inputType === "manual"}
      <div className="form-check">
        <input
          type="radio"
          className="form-check-input"
          name="inputType"
          value="manual"
          onChange={() => setInputType("manual")}
          checked={inputType === "manual"}
        />
        <label className="form-check-label">Saisie Manuelle</label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          className="form-check-input"
          name="inputType"
          value="random"
          onChange={() => setInputType("random")}
          checked={inputType === "random"}
        />
        <label className="form-check-label">Aléatoire</label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          className="form-check-input"
          name="inputType"
          value="file"
          onChange={() => setInputType("file")}
          checked={inputType === "file"}
        />
        <label className="form-check-label">
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
