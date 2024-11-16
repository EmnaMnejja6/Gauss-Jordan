import React, { useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import {
  gaussJordanWithPivot,
  gaussJordanWithoutPivot,
  resolveDiagonal,
  resolveBand,
  resolveSymmetricPositiveDefinite,
} from "../utils/matrixCalculations";

const MatrixInputFile: React.FC = () => {
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
  const [solutionFile, setSolutionFile] = useState<string | null>(null);


  const handleMatrixSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value, 10);
    const newMatrix = Array(size)
      .fill(0)
      .map(() => Array(size + 1).fill(0));
    setMatrixSize(size);
    setMatrix(newMatrix);
  };
/*
  const handleResolution = () => {
    try {
      const matrixCopy = matrix.map((row) => [...row]);
      let result;
      result = gaussJordanWithPivot(matrix);
      setSolutionMatrix(result.matrix);
      setSteps(result.steps);
      setShowSteps(!(fileImported && matrixSize > 10));
    } catch (error) {
      setError("Erreur lors de la résolution.");
    }
  };*/
  const handleResolution = () => {
    try {
      const matrixCopy = matrix.map((row) => [...row]);
      const result = gaussJordanWithPivot(matrixCopy);
      setSolutionMatrix(result.matrix);
      setSteps(result.steps);

      if (matrixSize > 10) {
        const solutionText = result.matrix
        .map((row, index) => `x${index + 1} = ${row[row.length - 1].toFixed(4)}`)
        .join("\n");

        const blob = new Blob([solutionText], { type: "text/plain" });
        const fileUrl = URL.createObjectURL(blob);
        setSolutionFile(fileUrl);
      } else {
        setShowSteps(true);
        setSolutionFile(null);
      }
    } catch (error) {
      setError("Erreur lors de la résolution.");
    }
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
          setError(
            "Le fichier n'est pas de la forme n*(n+1) ou contient trop peu de valeurs."
          );
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
        marginRight: "auto",
        textAlign: "justify",
      }}
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
        <button className="btn btn-primary" onClick={handleResolution}>
          Résolution
        </button>
      </div>
      {matrixSize > 10 && solutionFile && (
        <div>
          <h2>Solution </h2>
          <a href={solutionFile} download="solution.txt" className="btn btn-success">
            Télécharger la solution
          </a>
        </div>
      )}

      {solutionMatrix && matrixSize <= 10 && (
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

export default MatrixInputFile;
