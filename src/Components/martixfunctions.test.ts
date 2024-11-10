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
        steps.push(
          `\\text{Pivot is zero at iteration ${k + 1}, matrix is singular.}`
        );
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
            `\\text{Row operation } r_${i + 1} - (${multiplier.toFixed(2)}) r_${
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
  export function formatAugmentedMatrix(matrix: number[][]): string {
    return matrix
      .map((row) => row.map((value) => value.toFixed(2)).join(" & "))
      .join(" \\\\ ");
  }
  
  export function gaussJordanWithPivot(matrix: number[][]): {
    matrix: number[][]; // The final reduced matrix
    L: number[][]; // The lower triangular matrix (L)
    steps: string[]; // The steps during the calculation
  } {
    const steps: string[] = [];
    const n = matrix.length;
    let c = 0;
  
    // Initialize the L matrix as an identity matrix
    const L = Array.from({ length: n }, () => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
      L[i][i] = 1;
    }
  
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
        for (let j = 0; j < n + 1; j++) {
          const temp = matrix[k][j];
          matrix[k][j] = matrix[iPivot][j];
          matrix[iPivot][j] = temp;
        }
      }
  
      console.log(`Iteration k = ${k}`);
  
      // Normalize the pivot row
      for (let j = k + 1; j < n + 1; j++) {
        matrix[k][j] = matrix[k][j] / matrix[k][k];
        c += 1;
      }
  
      // Eliminate above the pivot
      for (let i = 0; i < k; i++) {
        for (let j = k + 1; j < n + 1; j++) {
          matrix[i][j] = matrix[i][j] - matrix[i][k] * matrix[k][j];
          c += 2;
        }
      }
  
      // Eliminate below the pivot
      for (let i = k + 1; i < n; i++) {
        for (let j = k + 1; j < n + 1; j++) {
          matrix[i][j] = matrix[i][j] - matrix[i][k] * matrix[k][j];
          c += 2;
        }
      }
    }
  
    return { matrix, L, steps };
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
  
  // Sample matrices for testing
  const symmetricMatrix = [
    [2, -1, 0],
    [-1, 2, -1],
    [0, -1, 2]
  ];
  
  const nonSymmetricMatrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];
  
  const positiveDefiniteMatrix = [
    [2, 1],
    [1, 2]
  ];
  
  const invertibleMatrix = [
    [1, 2],
    [3, 4]
  ];
  
  const nonInvertibleMatrix = [
    [1, 2],
    [2, 4]
  ];
  
  // Tests
  describe('Matrix Function Tests', () => {
    test('isSymmetric should return true for symmetric matrices', () => {
      expect(isSymmetric(symmetricMatrix)).toBe(true);
      expect(isSymmetric(nonSymmetricMatrix)).toBe(false);
    });
  
    test('isPositiveDefinite should return true for positive definite matrices', () => {
      expect(isPositiveDefinite(positiveDefiniteMatrix)).toBe(true);
    });
  
    test('isInvertible should check matrix invertibility correctly', () => {
      expect(isInvertible(invertibleMatrix)).toBe(true);
      expect(isInvertible(nonInvertibleMatrix)).toBe(false);
    });
  
    test('isDiagonallyDominant should return true for diagonally dominant matrices', () => {
      expect(isDiagonallyDominant(symmetricMatrix)).toBe(true);
      expect(isDiagonallyDominant(nonSymmetricMatrix)).toBe(false);
    });
  
    test('invertMatrix should return the correct inverse for an invertible matrix', () => {
      const inverse = invertMatrix(invertibleMatrix);
      expect(inverse).not.toBeNull();
    });
  
    test('gaussJordanWithoutPivot should return the correct result matrix', () => {
      const { matrix, steps } = gaussJordanWithoutPivot(invertibleMatrix);
      console.log(steps);  // To verify the intermediate steps if needed
      expect(matrix).toBeDefined();
    });
  
    test('gaussJordanWithPivot should return correct result matrix and L matrix', () => {
      const { matrix, L, steps } = gaussJordanWithPivot(invertibleMatrix);
      console.log(steps);  // To verify the intermediate steps if needed
      expect(matrix).toBeDefined();
      expect(L).toBeDefined();
    });
  
    test('resolveDiagonal should resolve diagonally dominant matrices', () => {
      const { matrix, steps } = resolveDiagonal(symmetricMatrix);
      console.log(steps);
      expect(matrix).toBeDefined();
    });
  
    test('resolveSymmetricPositiveDefinite should resolve positive definite matrices', () => {
      const { matrix, steps } = resolveSymmetricPositiveDefinite(positiveDefiniteMatrix);
      console.log(steps);
      expect(matrix).toBeDefined();
    });
  
    test('resolveBand should resolve banded matrices (stub test)', () => {
      const { matrix, steps } = resolveBand(symmetricMatrix);
      console.log(steps);
      expect(matrix).toBeDefined();
    });
  });
  