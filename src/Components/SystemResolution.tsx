import React, { useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import {
  gaussJordanWithPivot,
  gaussJordanWithoutPivot,
  resolveDiagonal,
  resolveSymmetric,
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
    setError(null);
    //
    setFileImported(false);
  };

  /*const handleResolution = () => {
    let result;
    result = gaussJordanWithPivot(matrix);
    /*switch (matrixType) {
      case "diagonal":
        result = resolveDiagonal(matrix);
        break;
      case "symmetric":
        result = resolveSymmetricPositiveDefinite(matrix);
        break;
      case "band":
        result = resolveBand(matrix);
        break;
      case "dense":
      default:
        result = gaussJordanWithPivot(matrix);
        break;
    }
    */
    /*setSolutionMatrix(result.matrix);
    setSteps(result.steps);
  };*/
  const handleResolution = () => {
    try {
      const matrixCopy = matrix.map(row => [...row]); // Crée une copie indépendante de la matrice
      const result = gaussJordanWithPivot(matrixCopy);
      setSolutionMatrix(result.matrix);
      setSteps(result.steps);
      setShowSteps(!(fileImported && matrixSize > 10)); // Affiche ou masque les étapes
    } catch (error) {
      setError("Erreur lors de la résolution.");
    }
  };
  
  const handleRandomMatrix = () => {
    const newMatrix = Array(matrixSize)
      .fill(0)
      .map(() => Array(matrixSize + 1).fill(0).map(() => Math.floor(Math.random() * 20) - 10)); // Random values between -10 and 10
    setMatrix(newMatrix);
    setSolutionMatrix(null);
    setSteps([]);
    setFileImported(false);
  
    try {
      const result = gaussJordanWithPivot(newMatrix);
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

  const renderSolutionMatrix = () => {
    if (!solutionMatrix) return null;
    const solutionColumn = solutionMatrix.map((row) => row[row.length - 1]);
    const matrixString = solutionColumn
      .map((value) => value.toString())
      .join("\\\\");
    return `\\left(\\begin{matrix}${matrixString}\\end{matrix}\\right)`;
  };

  
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        const values = lireFichier(content);
        const n = Math.floor(Math.sqrt(values.length)); // Essaye de trouver la dimension n
      if (n * (n + 1) !== values.length) {
        setError("Le fichier n'est pas de la forme n*(n+1) ou contient trop peu de valeurs.");
        return;
      }

      // Forme la matrice avec les valeurs filtrées
      const matrix = [];
      for (let i = 0; i < n; i++) {
        matrix.push(values.slice(i * (n + 1), (i + 1) * (n + 1)));
      }
        setMatrixSize(n);
        setMatrix(matrix);
        setSolutionMatrix(null);
        setSteps([]);
        setFileImported(true);
        setError(null);
      };
      reader.readAsText(file);
    }
  };

  const lireFichier = (fileContent: string): number[] => {
    // Filtre les nombres en ignorant les autres chaînes de texte
    return fileContent
      .split(/\s+/)
      .map((val) => parseFloat(val))
      .filter((num) => !isNaN(num));
  };
  
  

  return (
    <div
      className="container"
      style={{
        width: "600px",
        fontSize: "24px",
        marginTop: "65px",
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
        <h5>Select Matrix Type</h5>
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
            Diagonal Dominant
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
            Symmetric Positive Definite
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
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="matrixType"
            id="band"
            value="Band"
            onChange={() => setMatrixType("Band")}
          />
          <label className="form-check-label" htmlFor="dense">
            Dense
          </label>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="button-container mt-3">
        <button className="btn btn-primary" onClick={handleResolution}>
          Solve
        </button>
        <button className="btn btn-danger ms-2" onClick={handleClearMatrix}>
          Clear Matrix
        </button>
        <input
          type="file"
          accept=".txt"
          onChange={handleImport}
          className="btn btn-secondary ms-2"
        />
        <button className="btn btn-warning ms-2" onClick={handleRandomMatrix}>
          Random Matrix
        </button>
      </div>

      {solutionMatrix && (
        <div>
          <h2>System Solution</h2>
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