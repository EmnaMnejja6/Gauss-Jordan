
{/*This is the file that contains all the functions and algorithms*/}
export function gaussJordan(matrix: number[][]): {
  matrix: number[][]; // The final reduced matrix
  L: number[][]; // The lower triangular matrix (L)
  steps: string[]; // The steps during the calculation
} {
  const steps: string[] = [];
  const n = matrix.length;

  // Initialize the L matrix as an identity matrix
  const L = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    L[i][i] = 1;
  }

  for (let k = 0; k < n; k++) {
    // Normalize row k
    const pivot = matrix[k][k];
    if (pivot === 0) {
      steps.push(`Pivot is zero at iteration ${k + 1}, matrix is singular.`);
      return { matrix, L, steps };
    }

    // Normalize the pivot row
    for (let j = k; j < n + 1; j++) {
      matrix[k][j] /= pivot;
    }
    L[k][k] = 1;

    // Log after normalization
    steps.push(`\\text{Iteration ${k + 1}: Normalize row ${k}}`);
    steps.push(`A = ${formatMatrix(matrix)}`);
    steps.push(`L = ${formatMatrix(L)}`);

    // Eliminate column k for all rows i ≠ k
    for (let i = 0; i < n; i++) {
      if (i !== k) {
        L[i][k] = matrix[i][k]; // Store the multiplier in L
        for (let j = k + 1; j < n + 1; j++) {
          matrix[i][j] -= matrix[i][k] * matrix[k][j]; // Eliminate the element
        }
        matrix[i][k] = 0; // Set the eliminated element to zero
      }
    }

    // Log after elimination
    steps.push(`\\text{Iteration ${k + 1}: Eliminate column ${k}}`);
    steps.push(`A = ${formatMatrix(matrix)}`);
    steps.push(`L = ${formatMatrix(L)}`);
  }

  return { matrix, L, steps };
}

// Format a matrix as a LaTeX bmatrix string
function formatMatrix(matrix: number[][]): string {
  return `\\begin{bmatrix} ${matrix
    .map((row) => row.join(" & "))
    .join(" \\\\ ")} \\end{bmatrix}`;
}
