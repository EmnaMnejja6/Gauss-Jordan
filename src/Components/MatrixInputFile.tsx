import React, { useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import {
  gaussJordanWithPivot,
  resolveDiagonalDominant,
  resolveBand,
  resolveSymmetricPositiveDefinite,
  resolveUpperTriangular,
  resolveLowerTriangular,
  isSymmetricPositiveDefinite,
  isUpperTriangular,
  isLowerTriangular,
  isDiagonallyDominant,
  gaussJordanBanded,
} from "../utils/matrixCalculations";

const MatrixInputFile: React.FC = () => {
  const [matrixSize, setMatrixSize] = useState<number>(2);
  const [matrix, setMatrix] = useState<number[][]>(
    Array(2).fill(Array(3).fill(0))
  );
  const [solutionMatrix, setSolutionMatrix] = useState<number[][] | null>(null);
  const [solutionVector, setSolutionVector] = useState<number[] | null>(null);
  const [matrixType, setMatrixType] = useState<string | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [showSteps, setShowSteps] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const renderSolutionMatrix = () => {
    if (!solutionMatrix) return null;

    if (matrixSize > 10) {
      return null;
    }

    const solutionColumn = solutionMatrix.map((row) => row[row.length - 1]);
    return `\\left(\\begin{matrix}${solutionColumn.join(
      "\\\\"
    )}\\end{matrix}\\right)`;
  };

  const handleDownloadSolution = () => {
    if (!solutionMatrix) return;

    const solutionVector = solutionMatrix.map((row) => row[row.length - 1]);

    const csvContent = solutionVector.join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "solution_vector.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  {
    solutionMatrix && matrixSize > 10 && (
      <button className="btn btn-primary mt-3" onClick={handleDownloadSolution}>
        Télécharger solution
      </button>
    );
  }

  const handleMatrixSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value, 10);
    const newMatrix = Array(size)
      .fill(0)
      .map(() => Array(size + 1).fill(0));
    setMatrixSize(size);
    setMatrix(newMatrix);
    setError(null);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const lines = content.split("\n").map((line) => line.trim());
      const firstLine = lines[0]?.toLowerCase();
      let matrixType = "";

      if (["spd", "dd", "upper", "lower", "dense"].includes(firstLine)) {
        matrixType = firstLine;
        lines.shift();
      }

      const values = parseFileContent(lines.join("\n"));
      const n = Math.floor(Math.sqrt(values.length));

      if (n * (n + 1) !== values.length) {
        setError(
          "Le fichier n'est pas de la forme n*(n+1) ou contient trop peu de valeurs."
        );
        return;
      }

      const importedMatrix: number[][] = Array(n)
        .fill(0)
        .map(() => Array(n + 1).fill(0));

      for (let i = 0; i < n; i++) {
        importedMatrix[i] = values.slice(i * (n + 1), (i + 1) * (n + 1));
      }

      if (!matrixType) {
        if (isSymmetricPositiveDefinite(importedMatrix, n)) matrixType = "spd";
        else if (isDiagonallyDominant(importedMatrix)) matrixType = "dd";
        else if (isUpperTriangular(importedMatrix)) matrixType = "upper";
        else if (isLowerTriangular(importedMatrix)) matrixType = "lower";
        else matrixType = "dense";
      }

      setMatrixType(matrixType);
      setMatrix(importedMatrix);
      setMatrixSize(n);
      resolveMatrix(importedMatrix, matrixType);
      setError(null);
    };

    reader.readAsText(file);
  };

  const resolveMatrix = (matrix: number[][], type: string) => {
    try {
      let result;
      switch (type) {
        case "dense":
          result = gaussJordanWithPivot(matrix);
          break;
        case "band":
          result = gaussJordanWithPivot(matrix);
          break;
        case "spd":
          result = resolveSymmetricPositiveDefinite(matrix);
          break;
        case "dd":
          result = resolveDiagonalDominant(matrix);
          break;
        case "upper":
          result = resolveUpperTriangular(matrix);
          break;
        case "lower":
          result = resolveLowerTriangular(matrix);
          break;
        default:
          throw new Error("Invalid matrix type.");
      }

      setSolutionMatrix(result.matrix);
      setSteps(result.steps);
    } catch {
      setError("Erreur lors de la résolution.");
    }
  };

  const parseFileContent = (fileContent: string): number[] => {
    return fileContent
      .split(/\s+/)
      .map((val) => parseFloat(val))
      .filter((num) => !isNaN(num));
  };

  return (
    <div
      className="container"
      style={{ width: "600px", fontSize: "24px", marginTop: "65px" }}
    >
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
      <h2>Importer un fichier</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="button-container mt-3">
        <input
          type="file"
          accept=".txt"
          onChange={handleImport}
          className="btn btn-secondary ms-2"
        />
        <br />
        <br />
      </div>

      {matrixType && (
        <div className="alert alert-info">Type de matrice: {matrixType}</div>
      )}

      {solutionMatrix && (
        <div>
          <h2>Résolution du système</h2>
          {solutionMatrix && matrixSize <= 10 ? (
            <MathJaxContext>
              <MathJax
                dynamic
              >{`\\[ b= ${renderSolutionMatrix()} \\]`}</MathJax>
            </MathJaxContext>
          ) : (
            <div></div>
          )}

          {matrixSize > 10 ? (
            <button
              className="btn btn-primary mt-3"
              onClick={handleDownloadSolution}
            >
              Télécharger solution
            </button>
          ) : (
            <>
              <button
                className="btn btn-secondary mt-3"
                onClick={() => setShowSteps(!showSteps)}
              >
                {showSteps ? "Masquer les étapes" : "Afficher les étapes"}
              </button>

              {showSteps && (
                <div className="steps-container mt-3">
                  <h3>Étapes de résolution</h3>
                  {steps.map((step, index) => (
                    <MathJaxContext key={index}>
                      <MathJax dynamic>{`\\[ ${step} \\]`}</MathJax>
                    </MathJaxContext>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MatrixInputFile;
