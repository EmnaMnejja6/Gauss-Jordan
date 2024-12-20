import { MathJax, MathJaxContext } from "better-react-mathjax";
import React, { useState } from "react";
import { inverseMatrix } from "../../utils/matrixCalculations";

const InverseManual = () => {
  const [matrixSize, setMatrixSize] = useState<number>(2);
  const [matrix, setMatrix] = useState<number[][]>(
    Array.from({ length: 2 }, () => Array(2).fill(0))
  );
  const [solutionMatrix, setSolutionMatrix] = useState<number[][] | null>(null);
  const [steps, setSteps] = useState<string[]>([]);

  const handleMatrixSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value, 10);
    const newMatrix = Array(size)
      .fill(0)
      .map(() => Array(size).fill(0));
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
    setMatrixSize(2);
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
    <div className="container">
      <h4 style={{ color: "#333" }}>Calculer l'inverse d'une matrice A </h4>

      <label style={{ fontSize: "18px", marginTop: "20px" }}>
        Taille de la matrice:
      </label>
      <input
        type="number"
        value={matrixSize}
        onChange={handleMatrixSizeChange}
        min={2}
        max={5}
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

      <div className="col-md-6">
        <MathJaxContext>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* A = */}
            <MathJax dynamic>{`\\[ A =\\]`}</MathJax>
            <table
              style={{
                marginTop: "20px",
                borderCollapse: "separate",
                borderSpacing: "8px",
              }}
            >
              <tbody>
                {matrix.map((row, rowIndex) => (
                  <tr key={`row-${rowIndex}`}>
                    {row.map((colValue, colIndex) => (
                      <td key={`cell-${rowIndex}-${colIndex}`}>
                        <input
                          type="number"
                          value={colValue}
                          onChange={(e) =>
                            handleMatrixChange(e, rowIndex, colIndex)
                          }
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
          </div>
        </MathJaxContext>

        <div style={{ marginTop: "30px" }}>
          <MathJaxContext>
            <button
              className="btn btn-primary"
              style={{
                padding: "10px 20px",
                marginRight: "10px",
                fontSize: "1rem",
              }}
              onClick={handleResolution}
            >
              <MathJax dynamic>{`\\( \\text{Calculer } A^{-1} \\)`}</MathJax>
            </button>
          </MathJaxContext>
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
          <div
            className="container"
            style={{
              marginTop: "40px",
              textAlign: "center",
              marginLeft: "50px",
            }}
          >
            <div
              className="container"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "40px",
                marginTop: "30px",
                textAlign: "center",
                marginLeft: "50px",
              }}
            >
              {/* Display A */}
              <MathJaxContext>
                <MathJax dynamic>{`\\[ A = ${renderMatrix()} \\]`}</MathJax>
              </MathJaxContext>

              {/* Display A^-1 */}
              <MathJaxContext>
                <MathJax
                  dynamic
                >{`\\[ A^{-1} = ${renderSolutionMatrix()} \\]`}</MathJax>
              </MathJaxContext>
            </div>
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
    </div>
  );
};

export default InverseManual;
