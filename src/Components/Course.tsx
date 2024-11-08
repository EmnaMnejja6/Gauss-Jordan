import React from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

const Cours = () => {
  const exampleMatrix = `
    \\left( \\begin{array}{ccc|c}
      2 & 1 & -1 & 8 \\\\
      -3 & -1 & 2 & -11 \\\\
      -2 & 1 & 2 & -3
    \\end{array} \\right)
  `;
  const step1 = `
  \\left( \\begin{array}{ccc|c}
    1 & 0.5 & -0.5 & 4 \\\\
    0 & -0.5 & 0.5 & 1 \\\\
    0 & 2 & 1 & 13
  \\end{array} \\right)
`;

  const step2 = `
  \\left( \\begin{array}{ccc|c}
    1 & 0 & -1 & 3 \\\\
    0 & 1 & -1 & -2 \\\\
    0 & 0 & 1 & -1
  \\end{array} \\right)
`;

  const finalStep = `
  \\left( \\begin{array}{ccc|c}
    1 & 0 & 0 & 2 \\\\
    0 & 1 & 0 & 3 \\\\
    0 & 0 & 1 & -1
  \\end{array} \\right)
`;

  return (
    <MathJaxContext>
      <div
        className="container"
        style={{
          width: "600vh",
          marginTop: "100px",
          marginLeft: "180px",
          textAlign: "justify",
          alignItems: "center",
        }}
      >
        <h2>Gauss-Jordan Elimination Method</h2>
        <p>
          The Gauss-Jordan elimination method is a process to solve systems of
          linear equations by transforming a given matrix into its reduced row
          echelon form (RREF). It extends Gaussian elimination by further
          reducing the matrix to make it easier to solve for the unknown
          variables.
        </p>

        <h3>Step-by-Step Explanation</h3>
        <p>
          In this method, we use elementary row operations to reduce the matrix
          to a form where the leading entry in each row is 1, and all entries
          above and below the leading entry are 0. The three row operations are:
        </p>
        <ol>
          <li>Swapping two rows</li>
          <li>Multiplying a row by a non-zero scalar</li>
          <li>Adding or subtracting multiples of a row to another row</li>
        </ol>

        <h3>Example</h3>
        <p>
          Consider the system of linear equations represented by the following
          augmented matrix:
        </p>
        <MathJax>{`\\[ ${exampleMatrix} \\]`}</MathJax>

        <p>
          Step 1: Make the first element in the first row equal to 1 by dividing
          the first row by 2:
        </p>
        <MathJax>{`\\[ ${step1} \\]`}</MathJax>

        <p>
          Step 2: Use the first row to eliminate the elements below the pivot in
          the first column:
        </p>
        <MathJax>{`\\[ ${step2} \\]`}</MathJax>

        <p>
          Step 3: Continue the elimination process to obtain the reduced row
          echelon form (RREF):
        </p>
        <MathJax>{`\\[ ${finalStep} \\]`}</MathJax>

        <p>
          From this reduced row echelon form, the solutions to the system of
          equations are:
          <strong> x = 2, y = 3, z = -1</strong>.
        </p>

        <h3>Applications of Gauss-Jordan Elimination</h3>
        <ul>
          <li>
            <strong>Solving Systems of Linear Equations:</strong> Gauss-Jordan
            elimination is widely used to find the solution to systems of linear
            equations.
          </li>
          <li>
            <strong>Finding the Determinant:</strong> The Gaussian elimination
            method can be used to compute the determinant of a square matrix.
          </li>
          <li>
            <strong>Finding the Inverse of a Matrix:</strong> Gauss-Jordan
            elimination can be used to determine the inverse of a square matrix
            by augmenting the matrix with the identity matrix and reducing it.
          </li>
          <li>
            <strong>Computing Rank and Bases:</strong> The method is useful for
            determining the rank and bases of a matrix by reducing it to its row
            echelon form or RREF.
          </li>
        </ul>

        <h3>C++ Code for Gauss-Jordan Elimination</h3>
        <p>
          Here is the C++ code to implement the Gauss-Jordan elimination method:
        </p>
        <pre>
          <div style={{ padding: "20px", backgroundColor: "#f8fcff" }}>
            <code>
              {`
#include <iostream>
#include <vector>
#include <iomanip>
#include <sstream>

using namespace std;

void gaussJordan(vector<vector<int>>& a, int n) {
    for (int k = 0; k < n; k++) {
        for (int j = k + 1; j < n + 1; j++) {
            a[k][j] = a[k][j] / a[k][k];
        }

        for (int i = 0; i < k; i++) {
            for (int j = k + 1; j < n + 1; j++) {
                a[i][j] = a[i][j] - a[i][k] * a[k][j];
            }
        }
        for (int i = k + 1; i < n; i++) {
            for (int j = k + 1; j < n + 1; j++) {
                a[i][j] = a[i][j] - a[i][k] * a[k][j];
            }
        }

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n + 1; j++) {
                cout << a[i][j] << "\t";
            }
            cout << endl;
        }
        cout << endl;
    }

    for (int i = 0; i < n; i++) {
        cout << "Solution x" << i + 1 << " = " << a[i][n] << endl;
    }
}

`}
            </code>
          </div>
        </pre>

        <p>
          This C++ code solves a system of linear equations using the
          Gauss-Jordan elimination method by performing elementary row
          operations to reduce the matrix to its reduced row echelon form.
        </p>
      </div>
    </MathJaxContext>
  );
};

export default Cours;
