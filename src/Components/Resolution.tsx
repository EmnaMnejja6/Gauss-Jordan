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
  const handleResolution = () => {
    try {
      const matrixCopy = matrix.map((row) => [...row]);
      let result;

      switch (matrixType) {
        case "Diagonal":
          result = resolveDiagonal(matrixCopy);
          break;
        case "Symmetric Positive Definite":
          result = resolveSymmetricPositiveDefinite(matrixCopy);
          break;
        case "Band":
          result = resolveBand(matrixCopy);
          break;
        case "Dense":
        default:
          result = gaussJordanWithPivot(matrixCopy);
          break;
      }

      setSolutionMatrix(result.matrix);
      setSteps(result.steps);
      setShowSteps(!(fileImported && matrixSize > 10));
    } catch (error) {
      setError("Erreur lors de la résolution.");
    }
  };

  const renderMatrix = () => {
    const matrixString = matrix
      .map((row) => row.map((value) => value.toString()).join("&"))
      .join("\\\\");
    return `\\left(\\begin{matrix}${matrixString}\\end{matrix}\\right)`;
  };

  const renderSolutionMatrix = () => {
    if (!solutionMatrix) return null;
    const solutionColumn = solutionMatrix.map((row) => row[row.length - 1]);
    const matrixString = solutionColumn
      .map((value) => value.toString())
      .join("\\\\");
    return `\\left(\\begin{matrix}${matrixString}\\end{matrix}\\right)`;
  };

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
