import { MathJax, MathJaxContext } from "better-react-mathjax";
import React, { useState } from "react";


export function inverseMatrix(mat: number[][]): {
  matrix: number[][]; // La matrice finale après réduction
  steps: string[]; // Les étapes pendant le calcul
} {
  const steps: string[] = [];
  const n = mat.length;
  
  // Créer une copie profonde de la matrice pour l'opération
  const augmentedMatrix = mat.map(row => [...row, ...Array(n).fill(0)]);
  for (let i = 0; i < n; i++) {
    augmentedMatrix[i][i + n] = 1;
  }

  // Afficher la matrice augmentée initiale
  steps.push("Matrice augmentée initiale :");
  steps.push(formatAugmentedMatrix(augmentedMatrix));

  let factor: number, diag: number;
  let permute: boolean;

  // Gauss-Jordan Elimination
  for (let k = 0; k < n; k++) {
    diag = augmentedMatrix[k][k];
    if (diag === 0) {
      permute = false;
      for (let i = k + 1; i < n; i++) {
        if (augmentedMatrix[i][k] !== 0) {
          [augmentedMatrix[k], augmentedMatrix[i]] = [augmentedMatrix[i], augmentedMatrix[k]];
          permute = true;
          steps.push(`Permutation des lignes ${k + 1} et ${i + 1}`);
          steps.push(formatAugmentedMatrix(augmentedMatrix));
          break;
        }
      }
      if (!permute) {
        steps.push("La matrice est singulière et ne peut pas être inversée.");
        return { matrix: mat, steps };
      }
      diag = augmentedMatrix[k][k];  // Mettre à jour la diagonale après permutation
    }

    // Normalisation de la ligne
    for (let j = 0; j < 2 * n; j++) {
      augmentedMatrix[k][j] /= diag;
    }
    steps.push(`Normalisation de la ligne ${k + 1}`);
    steps.push(formatAugmentedMatrix(augmentedMatrix));

   // Élimination des éléments au-dessus de la diagonale
    for (let i = 0; i < k; i++) {
      const factor = augmentedMatrix[i][k];
      for (let j = 0; j < 2 * n; j++) {
        augmentedMatrix[i][j] -= factor * augmentedMatrix[k][j];
      }
      steps.push(`Opération de ligne ${i + 1} : r_${i + 1} - (${factor}) * r_${k + 1}`);
      steps.push(formatAugmentedMatrix(augmentedMatrix));
    }

    // Élimination des éléments en-dessous de la diagonale
    for (let i = k + 1; i < n; i++) {
      const factor = augmentedMatrix[i][k];
      for (let j = 0; j < 2 * n; j++) {
        augmentedMatrix[i][j] -= factor * augmentedMatrix[k][j];
      }
      steps.push(`Opération de ligne ${i + 1} : r_${i + 1} - (${factor}) * r_${k + 1}`);
      steps.push(formatAugmentedMatrix(augmentedMatrix));
    }
    steps.push(`Matrice augmentée après l'itération ${k + 1}:`);
    steps.push(formatAugmentedMatrix(augmentedMatrix));
    steps.push("");
  }

  // Séparer la matrice inverse de la matrice augmentée
  const inverseMatrix = augmentedMatrix.map(row => row.slice(n));

  return { matrix: inverseMatrix, steps };
}

function formatAugmentedMatrix(matrix: number[][]): string {
  const n = matrix.length;
  const formattedMatrix = matrix
    .map(row => {
      const leftSide = row.slice(0, n).map(cell => cell.toFixed(2)).join(" & ");
      const rightSide = row.slice(n).map(cell => cell.toFixed(2)).join(" & ");
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
