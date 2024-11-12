import React, { useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import {
  gaussJordanWithPivot,
  gaussJordanWithoutPivot,
  resolveDiagonal,
  resolveBand,
  resolveSymmetricPositiveDefinite,
} from "../utils/matrixCalculations";

const SystemResolution: React.FC = () => {
  const [matrixSize, setMatrixSize] = useState<number>(2);
  const [matrix, setMatrix] = useState<number[][]>(
    Array(2).fill(Array(3).fill(0))
  ); // Initial size n x (n + 1)
  const [solutionMatrix, setSolutionMatrix] = useState<number[][] | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [showSteps, setShowSteps] = useState<boolean>(true);
  const [matrixType, setMatrixType] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileImported, setFileImported] = useState<boolean>(false);

  const handleMatrixSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value, 10);
    const newMatrix = Array(size)
      .fill(0)
      .map(() => Array(size + 1).fill(0));
    setMatrixSize(size);
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
    setError(null);
    //
    setFileImported(false);
  };
  const handleResolution = () => {
    try {
      const matrixCopy1 = matrix.map((row) => [...row]);
      const result = gaussJordanWithPivot(matrixCopy1);
      setSolutionMatrix(result.matrix);
      setSteps(result.steps);
      setShowSteps(matrixSize <= 10);
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

  const handleRandomMatrix = () => {
    const newMatrix = Array(matrixSize)
      .fill(0)
      .map(() =>
        Array(matrixSize + 1)
          .fill(0)
          .map(() => Math.floor(Math.random() * 20) - 10)
      ); // Random values between -10 and 10

    setMatrix(newMatrix);
    setSolutionMatrix(null);
    setSteps([]);
    setFileImported(false);
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
        marginTop: "65px",
        marginRight: "auto",
        textAlign: "justify",
      }}
    >
      <h2>Génération aléatoire de la matrice (n)*(n+1)</h2>
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

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="button-container mt-3">
        <button className="btn btn-danger ms-2" onClick={handleClearMatrix}>
          Effacer
        </button>

        <button className="btn btn-warning ms-2" onClick={handleRandomMatrix}>
          Générer
        </button>
        <br />
        <button className="btn btn-primary" onClick={handleResolution}>
          Résolution
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

export default SystemResolution;
