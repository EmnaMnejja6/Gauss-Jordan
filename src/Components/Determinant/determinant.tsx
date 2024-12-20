import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DerterminantManual from "./determinantManual";
import DeterminantFile from "./determinantFile";

const DeterminantCalculation: React.FC = () => {
  const [inputType, setInputType] = useState<String | null>(null);
  return (
    <div>
      <div
        className="container card shadow p-4 mb-5 bg-white rounded"
        style={{
          width: "1000px",
          marginLeft: "280px",
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
                gap: "5px",
              }}
              onClick={() => setInputType(value)}
            >
              <i className={`bx ${icon}`} style={{ fontSize: "20px" }}></i>
              {label}
            </button>
          ))}
        </div>

        {inputType === "manual" && <DerterminantManual />}
        {inputType === "file" && <DeterminantFile />}
      </div>
    </div>
  );
};

export default DeterminantCalculation;
