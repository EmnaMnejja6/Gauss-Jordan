{
  /*This File that contains all the functions and algorithms*/
}
export function isSymmetric(mat: number[][]): boolean {
  const n = mat.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (mat[i][j] !== mat[j][i]) {
        return false;
      }
    }
  }
  return true;
}

export function isPositiveDefinite(mat: number[][]): boolean {
  const n = mat.length;
  const L: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      let sum = 0;

      for (let k = 0; k < j; k++) {
        sum += L[i][k] * L[j][k];
      }

      if (i === j) {
        const val = mat[i][i] - sum;
        if (val <= 0) {
          return false;
        }
        L[i][j] = Math.sqrt(val);
      } else {
        L[i][j] = (mat[i][j] - sum) / L[j][j];
      }
    }
  }
  return true;
}
function augmentMatrix(mat: number[][]): number[][] {
  const n = mat.length;
  return mat.map((row, i) => [
    ...row,
    ...Array(n)
      .fill(0)
      .map((_, j) => (j === i ? 1 : 0)), // Add identity matrix
  ]);
}

export function isInvertible(mat: number[][]): boolean {
  const n = mat.length;
  for (let i = 0; i < n; i++) {
    if (mat[i][i] === 0) {
      let permuted = false;
      for (let j = i + 1; j < n; j++) {
        if (mat[j][i] !== 0) {
          [mat[i], mat[j]] = [mat[j], mat[i]]; // Swap rows
          permuted = true;
          break;
        }
      }
      if (!permuted) {
        console.log("The matrix is singular and cannot be inverted.");
        return false;
      }
    }
  }
  return true;
}
export function isDiagonallyDominant(matrix: number[][]): boolean {
  const n = matrix.length;

  for (let i = 0; i < n; i++) {
    let diagonalElement = Math.abs(matrix[i][i]);
    let sumOfOffDiagonal = 0;

    // Sum all non-diagonal elements in the row
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        sumOfOffDiagonal += Math.abs(matrix[i][j]);
      }
    }

    // Check if the diagonal element is greater than or equal to the sum of off-diagonal elements
    if (diagonalElement < sumOfOffDiagonal) {
      return false; // The matrix is not diagonally dominant
    }
  }

  return true; // The matrix is diagonally dominant
}

export function invertMatrix(mat: number[][]): number[][] | null {
  const n = mat.length;
  let augmentedMatrix = augmentMatrix(mat);

  // Check if the matrix is invertible
  if (!isInvertible(augmentedMatrix)) {
    return null;
  }

  for (let k = 0; k < n; k++) {
    let diag = augmentedMatrix[k][k];

    // Normalize the pivot row
    for (let j = 0; j < 2 * n; j++) {
      augmentedMatrix[k][j] /= diag;
    }

    // Eliminate other rows above the pivot
    for (let i = 0; i < k; i++) {
      const factor = augmentedMatrix[i][k];
      for (let j = 0; j < 2 * n; j++) {
        augmentedMatrix[i][j] -= factor * augmentedMatrix[k][j];
      }
    }

    // Eliminate other rows below the pivot
    for (let i = k + 1; i < n; i++) {
      const factor = augmentedMatrix[i][k];
      for (let j = 0; j < 2 * n; j++) {
        augmentedMatrix[i][j] -= factor * augmentedMatrix[k][j];
      }
    }
  }

  // Extract the inverse matrix from the augmented matrix
  const inverseMatrix = augmentedMatrix.map((row) => row.slice(n));
  return inverseMatrix;
}

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

function jordanWithPivot(a: number[][]): void {
  const n = a.length;
  let c = 0;

  for (let k = 0; k < n; k++) {
    let max = Math.abs(a[k][k]);
    let iPivot = k;

    // Find the pivot row
    for (let i = k + 1; i < n; i++) {
      if (Math.abs(a[i][k]) > max) {
        max = Math.abs(a[i][k]);
        iPivot = i;
      }
    }

    // Swap the current row with the pivot row if needed
    if (iPivot !== k) {
      for (let j = 0; j < n + 1; j++) {
        const temp = a[k][j];
        a[k][j] = a[iPivot][j];
        a[iPivot][j] = temp;
      }
    }

    console.log(`Iteration k = ${k}`);

    // Normalize the pivot row
    for (let j = k + 1; j < n + 1; j++) {
      a[k][j] = a[k][j] / a[k][k];
      c += 1;
    }

    // Eliminate above the pivot
    for (let i = 0; i < k; i++) {
      for (let j = k + 1; j < n + 1; j++) {
        a[i][j] = a[i][j] - a[i][k] * a[k][j];
        c += 2;
      }
    }

    // Eliminate below the pivot
    for (let i = k + 1; i < n; i++) {
      for (let j = k + 1; j < n + 1; j++) {
        a[i][j] = a[i][j] - a[i][k] * a[k][j];
        c += 2;
      }
    }

    // Output the current state of the matrix
    for (let i = 0; i < n; i++) {
      console.log(a[i].join("\t"));
    }
    console.log("\n");
  }
}

// Format a matrix as a LaTeX bmatrix string
function formatMatrix(matrix: number[][]): string {
  return `\\begin{bmatrix} ${matrix
    .map((row) => row.join(" & "))
    .join(" \\\\ ")} \\end{bmatrix}`;
}

export function inverseMatrix(matrix: number[][]): number[][] | null {
  const n = matrix.length;
  const inv = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  );

  // Make a deep copy of the matrix to avoid mutating the original
  const mat = matrix.map((row) => [...row]);

  for (let i = 0; i < n; i++) {
    let diag = mat[i][i];
    if (diag === 0) {
      // If we encounter a zero diagonal element, the matrix is singular and has no inverse
      return null;
    }

    // Normalize the row by dividing by the diagonal element
    for (let j = 0; j < n; j++) {
      mat[i][j] /= diag;
      inv[i][j] /= diag;
    }

    // Make other rows zero in the current column
    for (let k = 0; k < n; k++) {
      if (k !== i) {
        const factor = mat[k][i];
        for (let j = 0; j < n; j++) {
          mat[k][j] -= factor * mat[i][j];
          inv[k][j] -= factor * inv[i][j];
        }
      }
    }
  }

  return inv; // Return the inverse matrix
}
