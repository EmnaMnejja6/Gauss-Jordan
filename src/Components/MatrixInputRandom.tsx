import React, { useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import {
  gaussJordanWithPivot,
  resolveDiagonalDominant,
  resolveBand,
  resolveSymmetricPositiveDefinite,
  resolveLowerTriangular,
  resolveUpperTriangular,
} from "../utils/matrixCalculations";
const SystemResolution: React.FC = () => {
  const [matrixSize, setMatrixSize] = useState<number>(3);
  const [matrixType, setMatrixType] = useState<string>("");
  const [bandWidth, setBandWidth] = useState<number>(1);
  const [showSteps, setShowSteps] = useState<boolean>(true);
  const [matrix, setMatrix] = useState<number[][]>(
    Array(3).fill(Array(3).fill(0))
  );
  const [vector, setVector] = useState<number[]>(Array(3).fill(0));
  const [solutionMatrix, setSolutionMatrix] = useState<number[][] | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const renderSolutionMatrix = () => {
    if (!solutionMatrix) return null;
    const solutionColumn = solutionMatrix.map((row) => row[row.length - 1]);
    const matrixString = solutionColumn
      .map((value) => value.toString())
      .join("\\\\");
    return `\\left(\\begin{matrix}${matrixString}\\end{matrix}\\right)`;
  };
  const handleResolution = () => {
    try {
      const augmentedMatrix = matrix.map((row, index) => [
        ...row,
        vector[index],
      ]);
      let result;

      switch (matrixType) {
        case "Upper Triangular":
          result = resolveUpperTriangular(augmentedMatrix);
          break;
        case "Lower Triangular":
          result = resolveLowerTriangular(augmentedMatrix);
          break;
        case "Diagonal Dominant":
          result = resolveDiagonalDominant(augmentedMatrix);
          break;
        case "Symmetric Positive Definite":
          result = resolveSymmetricPositiveDefinite(augmentedMatrix);
          break;
        case "Band":
          result = resolveBand(augmentedMatrix, bandWidth);
          break;
        case "Dense":
        default:
          result = gaussJordanWithPivot(augmentedMatrix);
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
    setMatrixSize(size);
    setMatrix(Array(size).fill(Array(size).fill(0)));
    setVector(Array(size).fill(0));
  };

  const handleRandomMatrix = () => {
    let newMatrix = Array(matrixSize)
      .fill(0)
      .map(() => Array(matrixSize).fill(0));

    if (matrixType === "Dense") {
      newMatrix = Array(matrixSize)
        .fill(0)
        .map(() =>
          Array(matrixSize)
            .fill(0)
            .map(() => Math.floor(Math.random() * 20) - 10)
        );
    } else if (matrixType === "lower") {
      for (let i = 0; i < matrixSize; i++) {
        for (let j = 0; j < matrixSize; j++) {
          newMatrix[i][j] = j <= i ? Math.floor(Math.random() * 20) - 10 : 0;
        }
      }
    } else if (matrixType === "upper") {
      for (let i = 0; i < matrixSize; i++) {
        for (let j = 0; j < matrixSize; j++) {
          newMatrix[i][j] = j >= i ? Math.floor(Math.random() * 20) - 10 : 0;
        }
      }
    } else if (matrixType === "Diagonal Dominant") {
      for (let i = 0; i < matrixSize; i++) {
        let rowSum = 0;
        for (let j = 0; j < matrixSize; j++) {
          if (i !== j) {
            newMatrix[i][j] = Math.floor(Math.random() * 20) - 10;
            rowSum += Math.abs(newMatrix[i][j]);
          }
        }
        // Ensure diagonal dominance
        newMatrix[i][i] = rowSum + Math.floor(Math.random() * 10) + 1;
      }
    } else if (matrixType === "Symmetric Positive Definite") {
      const A = Array(matrixSize)
        .fill(0)
        .map(() =>
          Array(matrixSize)
            .fill(0)
            .map(() => Math.floor(Math.random() * 10) + 1)
        );
      // Multiply A by its transpose
      for (let i = 0; i < matrixSize; i++) {
        for (let j = 0; j < matrixSize; j++) {
          for (let k = 0; k < matrixSize; k++) {
            newMatrix[i][j] += A[k][i] * A[k][j]; // Symmetric Positive Definite
          }
        }
      }
    } else if (matrixType === "Band") {
      // Band matrix
      for (let i = 0; i < matrixSize; i++) {
        for (let j = 0; j < matrixSize; j++) {
          newMatrix[i][j] =
            Math.abs(i - j) <= bandWidth // Bandwidth condition
              ? Math.floor(Math.random() * 20) - 10
              : 0;
        }
      }
    }

    // Random vector b
    const newVector = Array(matrixSize)
      .fill(0)
      .map(() => Math.floor(Math.random() * 20) - 10);

    setMatrix(newMatrix);
    setVector(newVector);
    setError(null);
  };
  const handleClearMatrix = () => {
    const newMatrix = Array(matrixSize)
      .fill(0)
      .map(() => Array(matrixSize + 1).fill(0));
    setMatrix(newMatrix);
    setSolutionMatrix(null);
    setSteps([]);
    //setMatrixType(null);
    setError(null);
    //
    //setFileImported(false);
  };
  const handleDownloadMatrix = () => {
    let matrixTypeCode = "";

    // Map the selected matrix type to its code
    switch (matrixType) {
      case "Dense":
        matrixTypeCode = "dense";
        break;
      case "Diagonal Dominant":
        matrixTypeCode = "dd";
        break;
      case "Symmetric Positive Definite":
        matrixTypeCode = "spd";
        break;
      case "lower":
        matrixTypeCode = "lower";
        break;
      case "upper":
        matrixTypeCode = "upper";
        break;
      case "Band":
        matrixTypeCode = "band";
        break;
      default:
        matrixTypeCode = "unknown";
    }

    // Construct the content of the file
    let fileContent = matrixTypeCode + "\n"; // First line contains the matrix type code

    // Augment the matrix with the solution vector b
    matrix.forEach((row, rowIndex) => {
      const augmentedRow = [...row, vector[rowIndex]]; // Add the corresponding b value
      fileContent += augmentedRow.join(" ") + "\n"; // Append the augmented row
    });

    // Create a downloadable file
    const blob = new Blob([fileContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    // Trigger file download
    const link = document.createElement("a");
    link.href = url;
    link.download = "augmented_matrix.txt";
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
  };

  const renderMatrix = (matrix: number[][]) => {
    const matrixString = matrix
      .map((row) => row.map((value) => value.toString()).join("&"))
      .join("\\\\");
    return `\\left(\\begin{matrix}${matrixString}\\end{matrix}\\right)`;
  };

  const renderVector = (vector: number[]) => {
    const vectorString = vector.map((value) => value.toString()).join("\\\\");
    return `\\left(\\begin{matrix}${vectorString}\\end{matrix}\\right)`;
  };

  return (
    <div
      className="container"
      style={{
        fontSize: "18px",
        textAlign: "justify",
      }}
    >
      <h4>Génération aléatoire de la matrice (A) et du vecteur (b)</h4>
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
      <div className="mb-3">
        <h5>Choisir le type de matrice</h5>

        <div
          className="btn-group d-flex mb-3"
          role="group"
          aria-label="Matrix Type"
        >
          {[
            { type: "Dense", label: "Dense" },
            { type: "lower", label: "Triangulaire Inférieure" },
            { type: "upper", label: "Triangulaire Supérieure" },
            { type: "Diagonal Dominant", label: "Diagonale Dominante" },
            {
              type: "Symmetric Positive Definite",
              label: "Symétrique Définie Positive",
            },
            { type: "Band", label: "Bande" },
          ].map(({ type, label }, idx) => (
            <button
              key={idx}
              type="button"
              className={`btn ${
                matrixType === type ? "btn-dark" : "btn-outline-dark"
              }`}
              style={{ flex: 1 }}
              onClick={() => setMatrixType(type)}
            >
              {label}
            </button>
          ))}
        </div>

        {matrixType === "Band" && (
          <div className="mt-3">
            <label>
              Largeur de la bande:{" "}
              <span style={{ color: "grey", fontSize: "16px" }}>
                <span style={{ marginRight: "3px" }}>
                  <i className="bx bxs-error"></i>
                </span>
                largeur de la bande supérieur = largeur de la bande inférieure
              </span>{" "}
            </label>
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

      <div className="button-container mt-3">
        <button className="btn btn-danger ms-2" onClick={handleClearMatrix}>
          <span>
            <i
              style={{ fontSize: "16px", color: "white", marginRight: "5px" }}
              className="bx bxs-trash-alt"
            ></i>
          </span>
          Effacer
        </button>

        <button className="btn btn-warning ms-2" onClick={handleRandomMatrix}>
          <span>
            <i style={{ fontSize: "18px" }} className="bx bx-refresh"></i>
          </span>{" "}
          Générer
        </button>
        <button className="btn btn-success ms-2" onClick={handleDownloadMatrix}>
          <span>
            <i
              style={{ fontSize: "16px", color: "white", marginRight: "5px" }}
              className="bx bxs-download"
            ></i>
          </span>
          Télécharger la matrice
        </button>
        <br />
      </div>
      <div className="row">
        <div className="col-md-8">
          <MathJaxContext>
            <MathJax dynamic>{`\\[A= ${renderMatrix(matrix)} \\]`}</MathJax>
          </MathJaxContext>
        </div>
        <div className="col-md-4">
          <MathJaxContext>
            <MathJax dynamic>{`\\[b= ${renderVector(vector)} \\]`}</MathJax>
          </MathJaxContext>
        </div>
      </div>
      <button
        style={{
          marginLeft: "60px",
          marginTop: "10px",
          width: "800px",
          fontSize: "18px",
        }}
        className="btn btn-primary"
        onClick={handleResolution}
      >
        Résolution
      </button>
      {error && <div className="alert alert-danger">{error}</div>}

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
