import React, { useState } from "react";
import MatrixInputFile from "./MatrixInputFile";
import MatrixInputRandom from "./MatrixInputRandom";
import MatrixInputManual from "./MatrixInputManual";
import "bootstrap/dist/css/bootstrap.min.css";

const Resolution: React.FC = () => {
  const [inputType, setInputType] = useState<String | null>(null);
  const [matrixSize, setMatrixSize] = useState<number>(2); // Default matrix size

  // Callback function to update matrix size and handle inputType change
  const handleMatrixSizeChange = (size: number) => {
    setMatrixSize(size);

    // If size > 5, switch to "file" input method
    if (size > 5) {
      setInputType("file");
    }
  };

  return (
    <div>
      <div
        className="container card shadow p-4 mb-5 bg-white rounded"
        style={{
          width: "1000px",
          marginLeft: "300px",
          marginTop: "80px",
          fontSize: "18px",
        }}
      >
        <h3 className="text-center mb-4">Choisir le type de saisie</h3>

        <div
          className="btn-group d-flex mb-4"
          role="group"
          aria-label="Input Type"
        >
          {[
            { value: "manual", label: "Saisie Manuelle", icon: "bx-pencil" },
            { value: "random", label: "Aléatoire", icon: "bx-dice-5" },
            {
              value: "file",
              label: "Importer à partir d'un fichier",
              icon: "bx-upload",
            },
          ].map(({ value, label, icon }) => (
            <button
              key={value}
              type="button"
              className={`btn ${
                inputType === value ? "btn-primary" : "btn-outline-primary"
              }`}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px", // Space between icon and text
              }}
              onClick={() => setInputType(value)}
            >
              <i className={`bx ${icon}`} style={{ fontSize: "20px" }}></i>
              {label}
            </button>
          ))}
        </div>

        {inputType === "manual" && (
          <MatrixInputManual
            matrixSize={matrixSize}
            onMatrixSizeChange={handleMatrixSizeChange}
          />
        )}
        {inputType === "random" && <MatrixInputRandom />}
        {inputType === "file" && <MatrixInputFile />}
      </div>
    </div>
  );
};

export default Resolution;
