import { MathJax, MathJaxContext } from "better-react-mathjax";
import React, { useState } from "react";
import { CalculDeterminant } from "../../utils/matrixCalculations";
const DeterminantManual = () => {
  const [matrixSize, setMatrixSize] = useState<number>(2);
  const [matrix, setMatrix] = useState<number[][]>(
    Array.from({ length: 2 }, () => Array(2).fill(0))
  );
  const [determinant, setDeterminant] = useState<number | null>(null);
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
    setSteps([]);
  };

  const handleResolution = () => {
    const { determinant, steps } = CalculDeterminant(matrix);
    setDeterminant(determinant);
    setSteps(steps);
  };

  const renderMatrix = () => {
    const matrixString = matrix
      .map((row) => row.map((value) => value.toString()).join("&"))
      .join("\\\\");

    return `\\left| \\begin{matrix} ${matrixString} \\end{matrix} \\right|`;
  };

  return (
    <div className="container">
      <h4 style={{ color: "#333" }}>
        Calculer le determinant d'une matrice A{" "}
      </h4>

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
              <MathJax dynamic>{`\\( \\text{Calculer } |A| \\)`}</MathJax>
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

        {determinant !== null && (
          <div>
            <h3>Résultat:</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <MathJaxContext>
                <MathJax
                  dynamic
                >{`\\[ |A| = ${renderMatrix()} = ${determinant} \\]`}</MathJax>
              </MathJaxContext>
            </div>
          </div>
        )}

        {steps.length > 0 && (
          <div style={{ marginTop: "30px", textAlign: "left" }}>
            <h3>Steps:</h3>
            {steps.map((step, index) =>
              step.startsWith("\\text") || step.includes("\\begin") ? (
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

export default DeterminantManual;
