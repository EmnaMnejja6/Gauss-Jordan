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
export function augmentMatrix(mat: number[][]): number[][] {
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

export function gaussJordanWithoutPivot(matrix: number[][]): {
  matrix: number[][]; // The final reduced matrix
  steps: string[]; // The steps during the calculation, showing augmented matrix
} {
  const steps: string[] = [];
  const n = matrix.length;

  for (let k = 0; k < n; k++) {
    // Normalize row k
    const pivot = matrix[k][k];
    if (pivot === 0) {
      steps.push(`\\text{Pivot est zero ${k + 1}, matrice is singuliere.}`);
      return { matrix, steps };
    }

    // Normalize the pivot row
    for (let j = k; j < n + 1; j++) {
      matrix[k][j] /= pivot;
    }

    // Log after normalization
    steps.push(`\\text{Normalize } r_${k + 1}`);
    steps.push(
      `\\left(\\begin{matrix} ${formatAugmentedMatrix(
        matrix
      )} \\end{matrix}\\right)`
    );

    // Eliminate column k for all rows i ≠ k
    for (let i = 0; i < n; i++) {
      if (i !== k) {
        const multiplier = matrix[i][k];
        for (let j = k; j < n + 1; j++) {
          matrix[i][j] -= multiplier * matrix[k][j];
        }
        matrix[i][k] = 0; // Set the eliminated element to zero

        // Log after each row operation
        steps.push(
          `\\text{Row operation } r_${i + 1} - (${toFraction(multiplier)}) r_${
            k + 1
          }`
        );
        steps.push(
          `\\left(\\begin{matrix} ${formatAugmentedMatrix(
            matrix
          )} \\end{matrix}\\right)`
        );
      }
    }
  }

  return { matrix, steps };
}

// Helper function to format the augmented matrix for LaTeX display
function formatAugmentedMatrix(matrix: number[][]): string {
  return matrix
    .map(
      (row) =>
        row
          .slice(0, -1) // Get all elements except the last one
          .map((value) => toFraction(value))
          .join(" & ") +
        " & | & " +
        toFraction(row[row.length - 1]) // Add the last element with a separator
    )
    .join(" \\\\ ");
}

// Helper function to find the greatest common divisor
function greatestCommonDivisor(a: number, b: number): number {
  return b === 0 ? a : greatestCommonDivisor(b, a % b);
}

/*
// Helper function to format the augmented matrix for LaTeX display
export function formatAugmentedMatrix(matrix: number[][]): string {
  return matrix
    .map((row) => row.map((value) => value.toFixed(2)).join(" & "))
    .join(" \\\\ ");
}*/

export function gaussJordanWithPivot(matrix: number[][]): {
  matrix: number[][]; // The final reduced matrix
  steps: string[]; // The steps during the calculation in LaTeX format
} {
  const steps: string[] = [];
  const n = matrix.length;

  for (let k = 0; k < n; k++) {
    let max = Math.abs(matrix[k][k]);
    let iPivot = k;

    // Find the pivot row
    for (let i = k + 1; i < n; i++) {
      if (Math.abs(matrix[i][k]) > max) {
        max = Math.abs(matrix[i][k]);
        iPivot = i;
      }
    }

    // Swap the current row with the pivot row if needed
    if (iPivot !== k) {
      [matrix[k], matrix[iPivot]] = [matrix[iPivot], matrix[k]];
      steps.push(`\\text{Permuter la ligne ${k + 1} avec ${iPivot + 1}}`);
    }

    // Normalize the pivot row

    const pivot = matrix[k][k];
    steps.push(
      `\\text{Normalisation de la ligne ${
        k + 1
      } en divisant par le pivot } ${pivot}.`
    );
    for (let j = k; j < n + 1; j++) {
      matrix[k][j] /= pivot;
    }

    steps.push(
      `\\left(\\begin{matrix} ${formatAugmentedMatrix(
        matrix
      )} \\end{matrix}\\right)`
    );
    // Eliminate entries below the pivot
    for (let i = k + 1; i < n; i++) {
      const factor = matrix[i][k];
      steps.push(
        `\\text{Élimination de l'entrée dans la ligne ${i + 1}, colonne ${
          k + 1
        } en utilisant le facteur } ${factor}.`
      );
      for (let j = k; j < n + 1; j++) {
        matrix[i][j] -= factor * matrix[k][j];
      }
      steps.push(
        `\\left(\\begin{matrix} ${formatAugmentedMatrix(
          matrix
        )} \\end{matrix}\\right)`
      );
    }
  }

  // Eliminate entries above the pivot
  for (let k = n - 1; k >= 0; k--) {
    for (let i = k - 1; i >= 0; i--) {
      const factor = matrix[i][k];
      steps.push(
        `\\text{Eliminating entry in row ${i + 1}, column ${
          k + 1
        } using factor } ${factor}.`
      );
      for (let j = k; j < n + 1; j++) {
        matrix[i][j] -= factor * matrix[k][j];
      }
      steps.push(
        `\\text{Row ${i} after elimination: } ${matrix[i]
          .map(toFraction)
          .join(", ")}.`
      );
    }
  }

  return { matrix, steps };
}

// Helper function to format numbers as fractions or integers
function toFraction(value: number): string {
  if (Number.isInteger(value)) {
    return value.toString();
  } else {
    const tolerance = 1e-6;
    let numerator = value;
    let denominator = 1;

    while (Math.abs(numerator - Math.round(numerator)) > tolerance) {
      numerator *= 10;
      denominator *= 10;
    }

    const gcd = greatestCommonDivisor(Math.round(numerator), denominator);
    numerator = Math.round(numerator) / gcd;
    denominator = denominator / gcd;

    if (denominator === 1) {
      return numerator.toString();
    } else {
      return `\\frac{${numerator}}{${denominator}}`;
    }
  }
}

// Format a matrix as a LaTeX bmatrix string
export function formatMatrix(matrix: number[][]): string {
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

export function resolveDiagonal(matrix: number[][]): {
  matrix: number[][]; // The final reduced matrix
  steps: string[]; // The steps during the calculation
} {
  const isDominant = isDiagonallyDominant(matrix);

  if (!isDominant) {
    throw new Error("The matrix is not diagonally dominant.");
  }

  return gaussJordanWithoutPivot(matrix);
}

export function resolveSymmetricPositiveDefinite(matrix: number[][]): {
  matrix: number[][]; // The final reduced matrix
  steps: string[]; // The steps during the calculation
} {
  if (!(isSymmetric(matrix) && isPositiveDefinite(matrix))) {
    throw new Error("The matrix is not Symmetric definite positive.");
  }

  return gaussJordanWithoutPivot(matrix);
}

export function resolveBand(matrix: number[][]): {
  matrix: number[][]; // The final reduced matrix
  steps: string[]; // The steps during the calculation
} {
  /* rigel dinomha
  if (!isBand) {
    throw new Error("The matrix is not diagonally dominant.");
  }
*/
  return gaussJordanWithoutPivot(matrix);
}
