import { MathJax, MathJaxContext } from "better-react-mathjax";
import React, { useState } from "react";
import { inverseMatrix } from "../utils/matrixCalculations";

const InverseCalculation = () => {
  const [matrixSize, setMatrixSize] = useState<number>(2);
  const [matrix, setMatrix] = useState<number[][]>(
    Array(2).fill(Array(2).fill(0))
  );
  const [solutionMatrix, setSolutionMatrix] = useState<number[][] | null>(null);
  const [steps, setSteps] = useState<string[]>([]);

  const handleMatrixSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value, 10);
    const newMatrix = Array(size)
      .fill(0)
      .map(() => Array(size).fill(0)); // Square matrix for inversion
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
      .map(() => Array(matrixSize).fill(0));
    setMatrix(newMatrix);
    setSolutionMatrix(null);
    setSteps([]);
  };

  const handleResolution = () => {
    const result = inverseMatrix(matrix);
    if (result) {
      setSolutionMatrix(result.matrix);
      setSteps(result.steps); // Clear previous steps
    } else {
      setSolutionMatrix(null);
      setSteps(["La matrice est singulière et n'a pas d'inverse."]);
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
    const matrixString = solutionMatrix
      .map((row) => row.map((value) => value.toFixed(2)).join("&"))
      .join("\\\\");
    return `\\left(\\begin{matrix}${matrixString}\\end{matrix}\\right)`;
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "800px",
        padding: "40px",
        marginLeft: "500px",
        marginRight: "auto",
        borderRadius: "8px",
        marginTop: "80px",
        marginBottom: "20px",
        textAlign: "center",
        border: "1px solid ",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
      }}
    >
      <h2 style={{ fontSize: "2rem", color: "#333" }}>Calculer l'inverse</h2>

      <label style={{ fontSize: "1.2rem", marginTop: "20px" }}>Taille:</label>
      <input
        type="number"
        value={matrixSize}
        onChange={handleMatrixSizeChange}
        min={2}
        max={10}
        style={{
          marginLeft: "10px",
          padding: "5px",
          width: "60px",
          textAlign: "center",
          fontSize: "1rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <MathJaxContext>
          <MathJax dynamic>{`\\[ ${renderMatrix()} \\]`}</MathJax>
        </MathJaxContext>
      </div>

      <table
        style={{
          margin: "auto",
          marginTop: "20px",
          borderCollapse: "separate",
          borderSpacing: "8px",
        }}
      >
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((colIndex) => (
                <td key={colIndex}>
                  <input
                    type="number"
                    value={matrix[rowIndex][colIndex]}
                    onChange={(e) => handleMatrixChange(e, rowIndex, colIndex)}
                    style={{
                      width: "50px",
                      height: "50px",
                      textAlign: "center",
                      fontSize: "1rem",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "30px" }}>
        <button
          className="btn btn-primary"
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            fontSize: "1rem",
          }}
          onClick={handleResolution}
        >
          Inverser
        </button>
        <button
          className="btn btn-danger"
          style={{ padding: "10px 20px", fontSize: "1rem" }}
          onClick={handleClearMatrix}
        >
          <span>
            <i
              style={{ fontSize: "16px", color: "white", marginRight: "5px" }}
              className="bx bxs-trash-alt"
            ></i>
          </span>
          Effacer
        </button>
      </div>

      {solutionMatrix && (
        <div style={{ marginTop: "40px" }}>
          <h3 style={{ color: "#333" }}>Inverse Matrix:</h3>
          <MathJaxContext>
            <MathJax dynamic>{`\\[ ${renderSolutionMatrix()} \\]`}</MathJax>
          </MathJaxContext>
        </div>
      )}

      {steps.length > 0 && (
        <div style={{ marginTop: "30px", textAlign: "left" }}>
          <h3>Steps:</h3>
          {steps.map((step, index) =>
            step.includes("&") ? (
              <MathJaxContext key={index}>
                <MathJax dynamic>{`\\[ ${step} \\]`}</MathJax>
              </MathJaxContext>
            ) : (
              <div key={index}>{step}</div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default InverseCalculation;
