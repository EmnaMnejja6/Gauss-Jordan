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
        width: "600px",
        fontSize: "24px",
        marginTop: "80px",
        marginLeft: "500px",
        marginRight: "auto",
        textAlign: "justify",
      }}
    >
      <h2>Matrix Input</h2>
      <label>Matrix Size: </label>
      <input
        type="number"
        value={matrixSize}
        onChange={handleMatrixSizeChange}
        min={2}
        max={10}
        style={{ marginBottom: "20px" }}
      />

      <div style={{ display: "inline-block", margin: "20px 0" }}>
        <MathJaxContext>
          <MathJax dynamic>{`\\[ ${renderMatrix()} \\]`}</MathJax>
        </MathJaxContext>

        <table style={{ borderCollapse: "separate", borderSpacing: "5px" }}>
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
                      style={{
                        width: "50px",
                        textAlign: "center",
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: "20px" }}>
        <button
          className="btn btn-primary mt-3"
          style={{ backgroundColor: "#007bff", color: "white" }}
          onClick={handleResolution}
        >
          Solve
        </button>
        <button
          className="btn btn-danger mt-3 ms-2"
          onClick={handleClearMatrix}
        >
          Clear Matrix
        </button>
      </div>
      {steps.length > 0 && (
        <div>
          <h3>Etapes:</h3>
          {steps.map((step, index) => {
            if (step.includes("&")) {
              return (
                <MathJaxContext key={index}>
                  <MathJax dynamic>{`\\[ ${step} \\]`}</MathJax>
                </MathJaxContext>
              );
            } else {
              // Sinon, afficher l'étape sous forme de texte normal
              return <div key={index}>{step}</div>;
            }
          })}
        </div>
      )}

      {solutionMatrix && (
        <div>
          <h2>Inverse Matrix</h2>
          <MathJaxContext>
            <MathJax dynamic>{`\\[ ${renderSolutionMatrix()} \\]`}</MathJax>
          </MathJaxContext>
        </div>
      )}
    </div>
  );
};

export default InverseCalculation;
