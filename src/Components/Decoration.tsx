import React from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

const MatrixTransformation = () => {
  const rowExchangeLatex = `
    \\text{row exchange} \\quad
    \\begin{pmatrix}
      0 & 4 & \\vert & 2 \\\\
      2 & 3 & \\vert & -1
    \\end{pmatrix}
    \\rightarrow
    \\begin{pmatrix}
      2 & 3 & \\vert & -1 \\\\
      0 & 4 & \\vert & 2
    \\end{pmatrix}
  `;

  const eliminationLatex = `
    \\text{elimination} \\quad
    \\begin{pmatrix}
      2 & 3 & \\vert & 2 \\\\
      4 & 5 & \\vert & -1
    \\end{pmatrix}
    \\rightarrow
    \\begin{pmatrix}
      2 & 3 & \\vert & 2 \\\\
      0 & -1 & \\vert & -5
    \\end{pmatrix}
  `;

  return (
    <MathJaxContext>
      <div
        style={{ fontSize: "1.2em", color: "black", backgroundColor: "yellow" }}
      >
        <MathJax dynamic>{`\\[ ${rowExchangeLatex} \\]`}</MathJax>
        <MathJax dynamic>{`\\[ ${eliminationLatex} \\]`}</MathJax>
      </div>
    </MathJaxContext>
  );
};

export default MatrixTransformation;
