import React, { useState, useEffect } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import {
  gaussJordanWithPivot,
  resolveDiagonalDominant,
  resolveBand,
  resolveSymmetricPositiveDefinite,
  resolveUpperTriangular,
  resolveLowerTriangular,
} from "../utils/matrixCalculations";
import { useNavigate } from "react-router";

interface MatrixInputManualProps {
  matrixSize: number;
  onMatrixSizeChange: (size: number) => void;
}
const MatrixInputManual: React.FC<MatrixInputManualProps> = ({
  matrixSize,
  onMatrixSizeChange,
}: MatrixInputManualProps) => {
  const [matrixData, setMatrixData] = useState<number[][]>([]); // Matrix data state
  //const [matrixSize, setMatrixSize] = useState<number>(2);
  const [matrixType, setMatrixType] = useState("");
  const [bandWidth, setBandWidth] = useState(1);
  const [matrix, setMatrix] = useState(
    Array.from({ length: matrixSize }, () => Array(matrixSize).fill(0))
  );
  const [vector, setVector] = useState<number[]>(Array(2).fill(0));
  const [solutionMatrix, setSolutionMatrix] = useState<number[][] | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [showSteps, setShowSteps] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMatrixData([]); // Clear the matrix data
  }, [matrixType]);
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

    onMatrixSizeChange(size);
    setMatrix(
      Array(size)
        .fill(0)
        .map(() => Array(size).fill(0))
    );
    setVector(Array(size).fill(0));
  };

  const handleMatrixChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    colIndex: number
  ) => {
    const value = parseFloat(e.target.value) || 0;

    const updatedMatrix = matrix.map((row, rIdx) =>
      row.map((val, cIdx) => {
        if (rIdx === rowIndex && cIdx === colIndex) return value;

        // Ensure symmetry for symmetric positive definite matrices
        if (
          matrixType === "Symmetric Positive Definite" &&
          rIdx < cIdx &&
          rowIndex === cIdx &&
          colIndex === rIdx
        ) {
          return value;
        }

        return val;
      })
    );

    // Ensure symmetry for symmetric positive definite matrices
    if (matrixType === "Symmetric Positive Definite") {
      updatedMatrix[colIndex][rowIndex] = value;
    }

    // Validate diagonal dominance (only for this matrix type)
    if (matrixType === "Diagonal Dominant") {
      const diagonalElement = Math.abs(updatedMatrix[rowIndex][rowIndex]);
      const rowSum = updatedMatrix[rowIndex].reduce(
        (sum, val, idx) => (idx !== rowIndex ? sum + Math.abs(val) : sum),
        0
      );

      if (diagonalElement < rowSum) {
        alert(
          `Valeur invalide: ligne ${rowIndex + 1} doit satisfaire |a[${
            rowIndex + 1
          },${rowIndex + 1}]| ≥ ${rowSum}.`
        );
        return; // Do not update the matrix if diagonal dominance is violated
      }
    }

    setMatrix(updatedMatrix);
  };

  const handleVectorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newVector = vector.map((value, i) =>
      i === index ? parseFloat(e.target.value) || 0 : value
    );
    setVector(newVector);
  };

  const handleClearMatrix = () => {
    setMatrix(
      Array(matrixSize)
        .fill(0)
        .map(() => Array(matrixSize).fill(0))
    );
    setVector(Array(matrixSize).fill(0));
    setSolutionMatrix(null);
    setSteps([]);
    setMatrixType("dense");
    setBandWidth(0);
    setError(null);
  };

  const renderMatrix = () => {
    const matrixString = matrix
      .map((row) => row.map((value) => value.toString()).join("&"))
      .join("\\\\");
    return `\\left(\\begin{matrix}${matrixString}\\end{matrix}\\right)`;
  };

  const renderVector = () => {
    const vectorString = vector.map((value) => value.toString()).join("\\\\");
    return `\\left(\\begin{matrix}${vectorString}\\end{matrix}\\right)`;
  };

  const renderSolutionMatrix = () => {
    if (!solutionMatrix) return null;
    const solutionColumn = solutionMatrix.map((row) => row[row.length - 1]);
    const matrixString = solutionColumn
      .map((value) => value.toString())
      .join("\\\\");
    return `\\left(\\begin{matrix}${matrixString}\\end{matrix}\\right)`;
  };

  const handleMatrixTypeChange = (type: string) => {
    setMatrixType(type);
    setMatrix(
      Array(matrixSize)
        .fill(0)
        .map(() => Array(matrixSize).fill(0))
    );
    setVector(Array(matrixSize).fill(0));
    setSolutionMatrix(null);
    setSteps([]);
    setError(null);
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

  return (
    <div
      className="container"
      style={{ width: "800px", fontSize: "24px", marginTop: "10px" }}
    >
      <div className="mb-3">
        <h5>Choisir le type de matrice</h5>
        {[
          { type: "Dense", label: "Dense" },
          { type: "Diagonal Dominant", label: "Diagonale Dominante" },
          { type: "lower", label: "Triangulaire Inférieure" },
          { type: "upper", label: "Triangulaire Supérieure" },
          {
            type: "Symmetric Positive Definite",
            label: "Symétrique Définie Positive",
          },
          { type: "Band", label: "Bande" },
        ].map(({ type, label }, idx) => (
          <div className="form-check" key={idx}>
            <input
              type="radio"
              className="form-check-input"
              name="matrixType"
              id={type}
              value={type}
              onChange={() => handleMatrixTypeChange(type)}
            />
            <label className="form-check-label" htmlFor={type}>
              {label}
            </label>
          </div>
        ))}
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

      <h2>Saisie de la matrice A et du vecteur b</h2>
      <label>Taille de la matrice: </label>
      <input
        type="number"
        value={matrixSize}
        onChange={handleMatrixSizeChange}
        className="form-control mb-3"
        style={{ width: "100px", margin: "0 auto" }}
      />

      <div className="row">
        <div className="col-md-8">
          <MathJaxContext>
            <MathJax dynamic>{`\\[ A = ${renderMatrix()} \\]`}</MathJax>
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
                          value={value}
                          onChange={(e) =>
                            handleMatrixChange(e, rowIndex, colIndex)
                          }
                          className="form-control"
                          disabled={
                            (matrixType === "lower" && rowIndex < colIndex) ||
                            (matrixType === "upper" && rowIndex > colIndex) ||
                            (matrixType === "Symmetric Positive Definite" &&
                              rowIndex < colIndex) ||
                            (matrixType === "Band" &&
                              Math.abs(rowIndex - colIndex) > bandWidth)
                          }
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-4">
          <MathJaxContext>
            <MathJax dynamic>{`\\[ b= ${renderVector()} \\]`}</MathJax>
          </MathJaxContext>
          <div className="table-responsive">
            <table className="table table-bordered">
              <tbody>
                {vector.map((value, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => handleVectorChange(e, index)}
                        className="form-control"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="button-container mt-3">
        <button className="btn btn-primary" onClick={handleResolution}>
          Résolution
        </button>
        <button className="btn btn-danger ms-2" onClick={handleClearMatrix}>
          <span>
            <i
              style={{ fontSize: "16px", color: "white", marginRight: "5px" }}
              className="bx bxs-trash-alt"
            ></i>
          </span>
          Effacer
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
      </div>

      {solutionMatrix && (
        <div>
          <h2>Résolution du système</h2>
          <MathJaxContext>
            <MathJax dynamic>{`\\[ b = ${renderSolutionMatrix()} \\]`}</MathJax>
          </MathJaxContext>
        </div>
      )}
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
  );
};
export default MatrixInputManual;
