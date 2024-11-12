import { MathJax, MathJaxContext } from "better-react-mathjax";
import React, { useState } from "react";
import MatrixTransformation from "./Decoration";

// Inverse function added here
function inverseMatrix(matrix: number[][]): number[][] | null {
  const n = matrix.length;
  const inv = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  );

  const mat = matrix.map((row) => [...row]); // Deep copy to avoid mutation

  for (let i = 0; i < n; i++) {
    let diag = mat[i][i];
    if (diag === 0) return null; // Singular matrix, no inverse

    for (let j = 0; j < n; j++) {
      mat[i][j] /= diag;
      inv[i][j] /= diag;
    }

    for (let k = 0; k < n; k++) {
      if (k !== i) {
        const factor = mat[k][i];
        for (let j = 0; j < n; j++) {
          mat[k][j] -= factor * mat[i][j];
          inv[k][j] -= factor * inv[i][j];
        }
      }
    }
  }
  return inv;
}

function formatAugmentedMatrix(matrix: number[][]): string {
  const n = matrix.length;
  const formattedMatrix = matrix
    .map((row) => {
      const leftSide = row
        .slice(0, n)
        .map((cell) => cell.toFixed(2))
        .join(" & ");
      const rightSide = row
        .slice(n)
        .map((cell) => cell.toFixed(2))
        .join(" & ");
      return `${leftSide} & \\vert & ${rightSide}`; // Ajoute une ligne verticale entre les deux parties
    })
    .join(" \\\\ ");

  return `\\begin{pmatrix} ${formattedMatrix} \\end{pmatrix}`;
}

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
    <div style={{ width: "600vh" }}>
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

      <button
        className="btn btn-primary mt-3"
        style={{ backgroundColor: "#007bff", color: "white" }}
        onClick={handleResolution}
      >
        Solve
      </button>
      <button className="btn btn-danger mt-3 ms-2" onClick={handleClearMatrix}>
        Clear Matrix
      </button>

      {steps.length > 0 && (
        <div>
          <h3>Steps:</h3>
          {steps.map((step, index) => (
            <p key={index}>{step}</p>
          ))}
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
