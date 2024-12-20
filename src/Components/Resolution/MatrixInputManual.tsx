import React, { useState, useEffect } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import {
  gaussJordanWithPivot,
  resolveDiagonalDominant,
  resolveBand,
  resolveSymmetricPositiveDefinite,
  resolveUpperTriangular,
  resolveLowerTriangular,
  resolveDiagonal,
} from "../../utils/matrixCalculations";

interface MatrixInputManualProps {
  matrixSize: number;
  onMatrixSizeChange: (size: number) => void;
}

const MatrixInputManual: React.FC<MatrixInputManualProps> = ({
  matrixSize,
  onMatrixSizeChange,
}: MatrixInputManualProps) => {
  const [, setMatrixData] = useState<number[][]>([]); // Matrix data state
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
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    setMatrixData([]);
  }, [matrixType]);

  const handleResolution = () => {
    try {
      const augmentedMatrix = matrix.map((row, index) => [
        ...row,
        vector[index],
      ]);
      let result;

      switch (matrixType) {
        case "upper":
          result = resolveUpperTriangular(augmentedMatrix);
          break;
        case "lower":
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
        case "Diagonal":
          result = resolveDiagonal(augmentedMatrix);
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
    let size = parseInt(e.target.value, 10);

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
        return;
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
      case "Lower Triangular":
        matrixTypeCode = "lower";
        break;
      case "Upper Triangular":
        matrixTypeCode = "upper";
        break;
      case "Band":
        matrixTypeCode = "band";
        break;
      case "Diagonal":
        matrixTypeCode = "diagonal";
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
    <div className="container">
      {/*choisir le type de matrice */}
      <div className="mb-3">
        <h4>Choisir le type de matrice</h4>
        <div className="btn-group" role="group">
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
            { type: "Diagonal", label: "Diagonale" },
          ].map(({ type, label }, idx) => (
            <button
              key={idx}
              type="button"
              className={`btn ${
                matrixType === type ? "btn-dark" : "btn-outline-dark"
              }`}
              onClick={() => handleMatrixTypeChange(type)}
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
              onChange={(e) => setBandWidth(parseInt(e.target.value, 5))}
              className="form-control"
              style={{ width: "100px", margin: "0 auto" }}
              min={2}
              max={matrixSize - 1}
            />
          </div>
        )}
      </div>
      {/*saisie*/}
      <h4>Saisie de la matrice A et du vecteur b</h4>
      <label>Taille de la matrice: </label>
      <input
        type="number"
        value={matrixSize}
        min={2}
        max={5}
        onChange={handleMatrixSizeChange}
        className="form-control mb-3"
        style={{ width: "100px", margin: "0 auto" }}
      />

      <div className="row">
        {/* Matrix A */}
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
              <MathJax dynamic>{`\\[ A = \\]`}</MathJax>

              {/* Inputs for Matrix A */}
              <div className="table-responsive">
                <table className="table table-borderless">
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
                                (matrixType === "lower" &&
                                  rowIndex < colIndex) ||
                                (matrixType === "upper" &&
                                  rowIndex > colIndex) ||
                                (matrixType === "Symmetric Positive Definite" &&
                                  rowIndex < colIndex) ||
                                (matrixType === "Band" &&
                                  Math.abs(rowIndex - colIndex) > bandWidth) ||
                                (matrixType === "Diagonal" &&
                                  rowIndex !== colIndex)
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
          </MathJaxContext>
        </div>

        {/* Vector b */}
        <div className="col-md-4">
          <MathJaxContext>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* b = */}
              <MathJax dynamic>{`\\[ b = \\]`}</MathJax>

              {/* Inputs for Vector b */}
              <div className="table-responsive" style={{ margin: "0 10px" }}>
                <table className="table table-borderless">
                  <tbody>
                    {vector.map((value, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="number"
                            value={value}
                            onChange={(e) => handleVectorChange(e, index)}
                            className="form-control"
                            placeholder={`b[${index}]`}
                            style={{
                              textAlign: "center",
                              borderRadius: "8px",
                              border: "1px solid rgb(155, 157, 159)",
                              width: "60px",
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </MathJaxContext>
        </div>
      </div>

      {/*buttons*/}
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
          <h4>Résolution du système</h4>
          <div className="row">
            <div className="col-md-7">
              <MathJaxContext>
                <MathJax dynamic>{`\\[ A = ${renderMatrix()} \\]`}</MathJax>
              </MathJaxContext>
            </div>
            <div className="col-md-5">
              <MathJaxContext>
                <MathJax dynamic>{`\\[ b = ${renderVector()} \\]`}</MathJax>
              </MathJaxContext>
            </div>
          </div>
          <h4>Solution</h4>
          <MathJaxContext>
            <MathJax dynamic>{`\\[ X = ${renderSolutionMatrix()} \\]`}</MathJax>
          </MathJaxContext>
          <button
            className="btn btn-secondary mt-3"
            onClick={() => setShowSteps(!showSteps)}
          >
            {showSteps ? "Masquer les étapes" : "Montrer les étapes"}
          </button>
        </div>
      )}

      {showSteps && (
        <div className="steps-container mt-3">
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
