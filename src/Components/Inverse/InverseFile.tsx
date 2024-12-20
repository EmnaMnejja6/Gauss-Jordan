import React, { useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { inverseMatrix } from "../../utils/matrixCalculations";

const InverseFile: React.FC = () => {
  const [matrixSize, setMatrixSize] = useState<number>(2);
  const [matrix, setMatrix] = useState<number[][]>(
    Array(2)
      .fill(0)
      .map(() => Array(2).fill(0))
  );
  const [solutionMatrix, setSolutionMatrix] = useState<number[][] | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [showSteps, setShowSteps] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleMatrixSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value, 10);
    if (size >= 2 && size <= 5) {
      setMatrixSize(size);
      setMatrix(
        Array(size)
          .fill(0)
          .map(() => Array(size).fill(0))
      );
      setSolutionMatrix(null);
      setSteps([]);
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setError("Veuillez sélectionner un fichier valide.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;

      // Split lines, remove any empty lines, and trim extra spaces on each line
      const rows = content
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .map((line) => line.split(/\s+/));
      console.log("Rows:", rows);
      const importedMatrix = rows.map((row) => row.map(Number));
      console.log("Imported Matrix:", importedMatrix);

      const rowLengths = rows.map((row) => row.length);
      console.log("Row lengths:", rowLengths);

      if (
        importedMatrix.length !== importedMatrix[0].length ||
        !rowLengths.every((length) => length === rowLengths[0])
      ) {
        setError("Le fichier doit contenir une matrice carrée.");
        return;
      }

      setMatrix(importedMatrix);
      setMatrixSize(importedMatrix.length);
      setError(null); // Clear any previous errors
    };
    reader.readAsText(file);
  };

  const handleResolution = () => {
    const result = inverseMatrix(matrix);
    if (result) {
      setSolutionMatrix(result.matrix);
      setSteps(result.steps);
    } else {
      setSolutionMatrix(null);
      setSteps(["La matrice est singulière et n'a pas d'inverse."]);
    }
  };

  const handleDownloadSolution = () => {
    if (!solutionMatrix) return;
    const content = solutionMatrix.map((row) => row.join(" ")).join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "solution.txt";
    link.click();
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
      <label>Taille de la matrice: </label>
      <input
        type="number"
        value={matrixSize}
        onChange={handleMatrixSizeChange}
        min={2}
        className="form-control mb-3"
        style={{ width: "100px", margin: "0 auto" }}
      />
      <h4>Importer un fichier contenant une matrice carrée</h4>
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

      {solutionMatrix && (
        <div>
          <h2>Inverse</h2>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <MathJaxContext>
              <MathJax dynamic>{`\\[ A = ${renderMatrix()} \\]`}</MathJax>
            </MathJaxContext>
            <MathJaxContext>
              <MathJax
                dynamic
              >{`\\[ A^{-1} = ${renderSolutionMatrix()} \\]`}</MathJax>
            </MathJaxContext>
          </div>

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

export default InverseFile;
