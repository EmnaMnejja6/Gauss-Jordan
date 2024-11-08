import React, { useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { gaussJordan } from "../utils/matrixCalculations";

const MatrixInput: React.FC = () => {
  const [matrixSize, setMatrixSize] = useState<number>(2);
  const [matrix, setMatrix] = useState<number[][]>(
    Array(2).fill(Array(3).fill(0))
  ); // Initial size n x (n + 1)
  const [solutionMatrix, setSolutionMatrix] = useState<number[][] | null>(null);
  const [steps, setSteps] = useState<string[]>([]);

  const [showSteps, setShowSteps] = useState<boolean>(true); // New state to toggle step visibility

  const handleMatrixSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value, 10);
    const newMatrix = Array(size)
      .fill(0)
      .map(() => Array(size + 1).fill(0)); // Create an n x (n + 1) matrix
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
  };

  const handleResolution = () => {
    const result = gaussJordan(matrix);
    setSolutionMatrix(result.matrix);
    setSteps(result.steps);
  };

  const renderMatrix = () => {
    const matrixString = matrix
      .map((row) => row.map((value) => value.toString()).join("&"))
      .join("\\\\");

    return `\\left(\\begin{matrix}${matrixString}\\end{matrix}\\right)`;
  };

  const renderSolutionMatrix = () => {
    if (!solutionMatrix) return null;

    // Extract the last column (solutions)
    const solutionColumn = solutionMatrix.map((row) => row[row.length - 1]);

    // Format the solution as a vertical vector
    const matrixString = solutionColumn
      .map((value) => value.toString())
      .join("\\\\");

    return `\\left(\\begin{matrix}${matrixString}\\end{matrix}\\right)`;
  };

  return (
    <div style={{ width: "600vh", fontSize: "24px" }}>
      <h2>Matrix Input</h2>
      <label>Matrix Size: </label>
      <input
        type="number"
        value={matrixSize}
        onChange={handleMatrixSizeChange}
        min={2}
        max={10}
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
      <br />
      {/* Matrix type buttons */}
      <div
        className="button-container"
        style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
      >
        <button className="btn btn-secondary mt-3">Diagonal</button>
        <button className="btn btn-secondary mt-3">
          Symmetric Positive Definite
        </button>
        <button className="btn btn-secondary mt-3">Band</button>
      </div>

      {/* Resolution Button */}
      <button
        className="btn btn-primary mt-3"
        style={{ backgroundColor: "#007bff", color: "white" }}
        onClick={handleResolution}
      >
        Solve
      </button>
      {/* Clear Matrix Button */}
      <button className="btn btn-danger mt-3 ms-2" onClick={handleClearMatrix}>
        Clear Matrix
      </button>

      {/* Render the solution matrix */}
      {solutionMatrix && (
        <div>
          <h2>System Solution</h2>
          <MathJaxContext>
            <MathJax dynamic>{`\\[ b= ${renderSolutionMatrix()} \\]`}</MathJax>
          </MathJaxContext>

          {/* Toggle button to show/hide steps */}
          <button
            className="btn btn-secondary mt-3"
            onClick={() => setShowSteps(!showSteps)}
          >
            {showSteps ? "Hide Steps" : "Show Steps"}
          </button>

          {/* Conditionally render steps */}
          {showSteps && (
            <div className="steps-container mt-3">
              <h3>Solution Steps</h3>
              <div className="steps-content">
                {steps.map((step, index) => (
                  <div key={index}>
                    <MathJaxContext>
                      <MathJax dynamic>{`\\[ ${step} \\]`}</MathJax>
                    </MathJaxContext>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MatrixInput;
