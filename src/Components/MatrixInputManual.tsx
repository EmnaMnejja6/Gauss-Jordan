import React, { useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import {
  gaussJordanWithPivot,
  resolveDiagonal,
  resolveBand,
  resolveSymmetricPositiveDefinite,
} from "../utils/matrixCalculations";

const MatrixInputManual: React.FC = () => {
  const [matrixSize, setMatrixSize] = useState<number>(2);
  const [matrix, setMatrix] = useState<number[][]>(
    Array(2).fill(Array(3).fill(0))
  ); // Initial size n x (n + 1)
  const [solutionMatrix, setSolutionMatrix] = useState<number[][] | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [showSteps, setShowSteps] = useState<boolean>(true);
  const [matrixType, setMatrixType] = useState<string | null>(null);
  const [bandWidth, setBandWidth] = useState<number>(0); // New state for band width
  const [error, setError] = useState<string | null>(null);

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
          result = resolveBand(matrixCopy, bandWidth);
          break;
        case "Dense":
        default:
          result = gaussJordanWithPivot(matrixCopy);
          break;
      }

      setSolutionMatrix(result.matrix);
      setSteps(result.steps);
    } catch (error) {
      setError("Erreur lors de la résolution.");
    }
  };

  const handleMatrixSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value, 10);
    const newMatrix = Array(size)
      .fill(0)
      .map(() => Array(size + 1).fill(0));
    setMatrixSize(size);
    setMatrix(newMatrix);
  };

  const handleMatrixChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    colIndex: number
  ) => {
    const newMatrix = matrix.map((row, i) =>
      row.map((value, j) =>
        i === rowIndex && j === colIndex
          ? parseFloat(e.target.value) || 0
          : value
      )
    );
    setMatrix(newMatrix);
  };

  const handleClearMatrix = () => {
    const newMatrix = Array(matrixSize)
      .fill(0)
      .map(() => Array(matrixSize + 1).fill(0));
    setMatrix(newMatrix);
    setSolutionMatrix(null);
    setSteps([]);
    setMatrixType(null);
    setBandWidth(0); // Reset band width
    setError(null);
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
        marginTop: "10px",
        marginRight: "auto",
        textAlign: "justify",
      }}
    >
      <h2>Saisie de la matrice augmentée</h2>
      <label>Taille de la matrice: </label>
      <input
        type="number"
        value={matrixSize}
        onChange={handleMatrixSizeChange}
        min={2}
        max={10}
        className="form-control mb-3"
        style={{ width: "100px", margin: "0 auto" }}
      />

      <MathJaxContext>
        <MathJax dynamic>{`\\[ ${renderMatrix()} \\]`}</MathJax>
      </MathJaxContext>

      <div className="table-responsive">
        <table className="table table-bordered">
          <tbody>
            {matrix.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((value, colIndex) => (
                  <td key={colIndex}>
                    <input
                      type="number"
                      value={matrix[rowIndex][colIndex]}
                      onChange={(e) =>
                        handleMatrixChange(e, rowIndex, colIndex)
                      }
                      className="form-control"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-3">
        <h5>Choisir le type de matrice</h5>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="matrixType"
            id="dense"
            value="Dense"
            onChange={() => setMatrixType("Dense")}
          />
          <label className="form-check-label" htmlFor="dense">
            Dense
          </label>
        </div>

        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="matrixType"
            id="diagonal"
            value="Diagonal"
            onChange={() => setMatrixType("Diagonal")}
          />
          <label className="form-check-label" htmlFor="diagonal">
            A diagonale dominante
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="matrixType"
            id="symmetricPositiveDefinite"
            value="Symmetric Positive Definite"
            onChange={() => setMatrixType("Symmetric Positive Definite")}
          />
          <label
            className="form-check-label"
            htmlFor="symmetricPositiveDefinite"
          >
            Symmetrique définie positive
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="matrixType"
            id="band"
            value="Band"
            onChange={() => setMatrixType("Band")}
          />
          <label className="form-check-label" htmlFor="band">
            Bande
          </label>
        </div>

        {/* Band width input field */}
        {matrixType === "Band" && (
          <div className="mt-3">
            <label>Largeur de la bande: </label>
            <input
              type="number"
              value={bandWidth}
              onChange={(e) => setBandWidth(parseInt(e.target.value, 10))}
              className="form-control"
              style={{ width: "100px", margin: "0 auto" }}
              min={1}
              max={matrixSize - 1}
            />
          </div>
        )}
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="button-container mt-3">
        <button className="btn btn-primary" onClick={handleResolution}>
          Résolution
        </button>
        <button className="btn btn-danger ms-2" onClick={handleClearMatrix}>
          Effacer
        </button>
      </div>

      {solutionMatrix && (
        <div>
          <h2>Résolution du système</h2>
          <MathJaxContext>
            <MathJax dynamic>{`\\[ b= ${renderSolutionMatrix()} \\]`}</MathJax>
          </MathJaxContext>

          <button
            className="btn btn-secondary mt-3"
            onClick={() => setShowSteps(!showSteps)}
          >
            {showSteps ? "Hide Steps" : "Show Steps"}
          </button>

          {showSteps && (
            <div className="steps-container mt-3">
              <h3>Solution Steps</h3>
              {steps.map((step, index) => (
                <div key={index}>
                  <MathJaxContext>
                    <MathJax dynamic>{`\\[ ${step} \\]`}</MathJax>
                  </MathJaxContext>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MatrixInputManual;
