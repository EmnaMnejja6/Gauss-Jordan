{
  /*This File that contains all the functions and algorithms*/
}
function isBand(mat: number[][], k: number): boolean {
  console.log(k);
  let n = mat.length;
  let k1 = 0,
    k2 = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] !== 0) {
        if (j > i) {
          k1 = Math.max(k1, j - i);
        } else if (j < i) {
          k2 = Math.max(k2, i - j);
        }
      }
    }
  }

  if (k1 !== k2) {
    console.log(
      "La demi-bande inférieure est différente à la demi-bande supérieure"
    );
    return false;
  }

  k = k1;
  return true;
}
/*
export function gaussJordanBanded(
  matrix: number[][],
  k: number
): {
  matrix: number[][];
  steps: string[];
} {
  const steps: string[] = [];
  const n = matrix.length;

  for (let i = 0; i < n; i++) {
    // Step 1: Find the pivot in the banded area (only within the `k` bandwidth)
    let pivot = matrix[i][i];
    if (Math.abs(pivot) < 1e-10) {
      steps.push(
        `\\text{Le pivot à la position (${i + 1}, ${
          i + 1
        }) est nul. Résolution impossible avec ce pivot.}`
      );
      throw new Error(`Pivot nul détecté à la position (${i + 1}, ${i + 1})`);
    }

    steps.push(
      `\\text{Normalisation de la ligne ${
        i + 1
      } en divisant par le pivot } ${pivot}.`
    );
    console.log(`Normalisation de la ligne ${i + 1} avec le pivot ${pivot}`);

    // Step 2: Normalize the pivot row
    for (let j = i; j < Math.min(i + k + 1, n + 1); j++) {
      matrix[i][j] /= pivot;
    }

    steps.push(
      `\\left(\\begin{matrix} ${formatAugmentedMatrix(
        matrix
      )} \\end{matrix}\\right)`
    );

    // Step 3: Eliminate the current column in all other rows within the band
    for (let row = 0; row < n; row++) {
      if (row !== i) {
        const multiplier = matrix[row][i];
        steps.push(
          `\\text{Opération sur la ligne } r_{${row + 1}} - (${toFraction(
            multiplier
          )}) r_{${i + 1}}`
        );

        for (let col = i; col < Math.min(i + k + 1, n + 1); col++) {
          matrix[row][col] -= multiplier * matrix[i][col];
        }

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
*/
export function isLowerTriangular(matrix: number[][]): {
  matrix: number[][];
  steps: string[];
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
    steps.push(`\\text{ Normalisation de } r_${k + 1}`);
    steps.push(
      `\\left(\\begin{matrix} ${formatAugmentedMatrix(
        matrix
      )} \\end{matrix}\\right)`
    );

    for (let i = 0; i < k; i++) {
      const multiplier = matrix[i][k];
      for (let j = k; j < n + 1; j++) {
        matrix[i][j] -= multiplier * matrix[k][j];
      }

      // Log after each row operation
      steps.push(`\\ r_${i + 1} - (${toFraction(multiplier)}) r${k + 1}`);
      steps.push(
        `\\left(\\begin{matrix} ${formatAugmentedMatrix(
          matrix
        )} \\end{matrix}\\right)`
      );
    }

    for (let i = k + 1; i < n; i++) {
      const multiplier = matrix[i][k];
      for (let j = k; j < n + 1; j++) {
        matrix[i][j] -= multiplier * matrix[k][j];
      }

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

  return { matrix, steps };
}
export function isUpperTriangular(mat: number[][]): boolean {
  console.log(mat);
  return false;
}
export function isSymmetric(mat: number[][], n: number): boolean {
  //const n = mat.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (mat[i][j] !== mat[j][i]) {
        return false;
      }
    }
  }
  return true;
}

export function isPositiveDefinite(mat: number[][], n: number): boolean {
  //const n = mat.length;
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
export function isSymmetricPositiveDefinite(
  mat: number[][],
  n: number
): boolean {
  return isSymmetric(mat, n) && isPositiveDefinite(mat, n);
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

export function augmentMatrix(mat: number[][]): number[][] {
  const n = mat.length;
  return mat.map((row, i) => [
    ...row,
    ...Array(n)
      .fill(0)
      .map((_, j) => (j === i ? 1 : 0)), // Add identity matrix
  ]);
}
export function gaussJordanBanded(
  matrix: number[][],
  k: number
): {
  matrix: number[][];
  steps: string[];
} {
  const steps: string[] = [];
  const n = matrix.length;
  let operationsCount = 0;

  for (let pivot = 0; pivot < n; pivot++) {
    let maxVal = Math.abs(matrix[pivot][pivot]);
    let iPivot = pivot;

    // Recherche du pivot maximal dans la bande
    for (let i = pivot + 1; i <= pivot + k && i < n; i++) {
      if (Math.abs(matrix[i][pivot]) > maxVal) {
        maxVal = Math.abs(matrix[i][pivot]);
        iPivot = i;
      }
    }

    // Échange de lignes si nécessaire
    if (iPivot !== pivot) {
      for (let j = 0; j < n + 1; j++) {
        const aux = matrix[pivot][j];
        matrix[pivot][j] = matrix[iPivot][j];
        matrix[iPivot][j] = aux;
      }
      steps.push(`\\text{Échange des lignes ${pivot + 1} et ${iPivot + 1}}`);
    }

    // Normalisation de la ligne de pivot
    for (let j = pivot + 1; j < n + 1; j++) {
      matrix[pivot][j] /= matrix[pivot][pivot];
      operationsCount += 1;
    }

    // Élimination des autres lignes en haut de la bande
    for (let i = pivot - k; i < pivot && i >= 0; i++) {
      for (let j = pivot + 1; j < n + 1; j++) {
        matrix[i][j] -= matrix[i][pivot] * matrix[pivot][j];
        operationsCount += 2;
      }
    }

    // Élimination des autres lignes en bas de la bande
    for (let i = pivot + 1; i <= pivot + k && i < n; i++) {
      for (let j = pivot + 1; j < n + 1; j++) {
        matrix[i][j] -= matrix[i][pivot] * matrix[pivot][j];
        operationsCount += 2;
      }
    }

    steps.push(
      `\\left(\\begin{matrix} ${formatAugmentedMatrix(
        matrix
      )} \\end{matrix}\\right)`
    );
  }

  steps.push(
    `\\text{Nombre total d'opérations arithmétiques : ${operationsCount}}`
  );
  steps.push(
    `\\left(\\begin{matrix} ${formatAugmentedMatrix(
      matrix
    )} \\end{matrix}\\right)`
  );

  steps.push(
    `\\text{Nombre total d'opérations arithmétiques : ${operationsCount}}`
  );
  return { matrix, steps };
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
    steps.push(`\\text{ Normalisation de } r_${k + 1}`);
    steps.push(
      `\\left(\\begin{matrix} ${formatAugmentedMatrix(
        matrix
      )} \\end{matrix}\\right)`
    );

    for (let i = 0; i < k; i++) {
      const multiplier = matrix[i][k];
      for (let j = k; j < n + 1; j++) {
        matrix[i][j] -= multiplier * matrix[k][j];
      }

      // Log after each row operation
      steps.push(`\\ r_${i + 1} - (${toFraction(multiplier)}) r${k + 1}`);
      steps.push(
        `\\left(\\begin{matrix} ${formatAugmentedMatrix(
          matrix
        )} \\end{matrix}\\right)`
      );
    }

    for (let i = k + 1; i < n; i++) {
      const multiplier = matrix[i][k];
      for (let j = k; j < n + 1; j++) {
        matrix[i][j] -= multiplier * matrix[k][j];
      }

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

  return { matrix, steps };
}

export function gaussJordanWithPivot(matrix: number[][]): {
  matrix: number[][];
  steps: string[];
} {
  const steps: string[] = [];
  const n = matrix.length;

  for (let k = 0; k < n; k++) {
    let max = Math.abs(matrix[k][k]);
    let iPivot = k;
    console.log(
      `Étape ${k + 1}: Chercher le pivot maximum dans la colonne ${k}`
    );

    for (let i = k + 1; i < n; i++) {
      if (Math.abs(matrix[i][k]) > max) {
        max = Math.abs(matrix[i][k]);
        iPivot = i;
      }
    }

    if (iPivot !== k) {
      [matrix[k], matrix[iPivot]] = [matrix[iPivot], matrix[k]];
      steps.push(`\\text{Permuter la ligne ${k + 1} avec ${iPivot + 1}}`);
      console.log(`Permutation des lignes ${k + 1} et ${iPivot + 1}`);
    }

    const pivot = matrix[k][k];
    if (pivot === 0) {
      steps.push(
        `\\text{Le pivot à la position (${k + 1}, ${
          k + 1
        }) est nul. Résolution impossible avec ce pivot.}`
      );
      console.error(`Pivot nul à la position (${k + 1}, ${k + 1})`);
      throw new Error("Pivot nul détecté");
    }

    console.log(`Normalisation de la ligne ${k + 1} avec le pivot ${pivot}`);
    steps.push(
      `\\text{Normalisation de la ligne ${
        k + 1
      } en divisant par le pivot } ${pivot}.`
    );
    for (let j = k; j < n + 1; j++) {
      matrix[k][j] /= pivot;
    }

    steps.push(`${formatAugmentedMatrix(matrix)}`);
    console.log(`Matrice après normalisation de la ligne ${k + 1}:`, matrix);

    // Opérations sur les lignes ci-dessous
    for (let i = 0; i < k; i++) {
      const multiplier = matrix[i][k];
      for (let j = k; j < n + 1; j++) {
        matrix[i][j] -= multiplier * matrix[k][j];
      }

      // Log after each row operation
      steps.push(`r_${i + 1} - (${toFraction(multiplier)}) r_${k + 1}`);
      steps.push(`${formatAugmentedMatrix(matrix)}`);
    }

    for (let i = k + 1; i < n; i++) {
      const multiplier = matrix[i][k];
      for (let j = k; j < n + 1; j++) {
        matrix[i][j] -= multiplier * matrix[k][j];
      }

      steps.push(`r_${i + 1} - (${toFraction(multiplier)}) r_${k + 1}`);
      steps.push(`${formatAugmentedMatrix(matrix)}`);
    }
  }

  return { matrix, steps };
}

export function inverseMatrix(mat: number[][]): {
  matrix: number[][]; // La matrice finale après réduction
  steps: string[]; // Les étapes pendant le calcul
} {
  const steps: string[] = [];
  const n = mat.length;

  // Créer une copie profonde de la matrice pour l'opération
  const augmentedMatrix = mat.map((row) => [...row, ...Array(n).fill(0)]);
  for (let i = 0; i < n; i++) {
    augmentedMatrix[i][i + n] = 1;
  }

  // Afficher la matrice augmentée initiale
  steps.push("Matrice augmentée initiale :");
  steps.push(formatAugmentedMatrix(augmentedMatrix));

  let diag: number;
  let permute: boolean;

  // Gauss-Jordan Elimination
  for (let k = 0; k < n; k++) {
    diag = augmentedMatrix[k][k];
    if (diag === 0) {
      permute = false;
      for (let i = k + 1; i < n; i++) {
        if (augmentedMatrix[i][k] !== 0) {
          [augmentedMatrix[k], augmentedMatrix[i]] = [
            augmentedMatrix[i],
            augmentedMatrix[k],
          ];
          permute = true;
          steps.push(`Permutation des lignes ${k + 1} et ${i + 1}`);
          steps.push(formatAugmentedMatrix(augmentedMatrix));
          break;
        }
      }
      if (!permute) {
        steps.push("La matrice est singulière et ne peut pas être inversée.");
        alert("La matrice est singulière et ne peut pas être inversée.");
        throw new Error(
          "La matrice est singulière et ne peut pas être inversée."
        );
      }
      diag = augmentedMatrix[k][k]; // Mettre à jour la diagonale après permutation
    }

    // Normalisation de la ligne
    for (let j = 0; j < 2 * n; j++) {
      augmentedMatrix[k][j] /= diag;
    }
    steps.push(`Normalisation de la ligne ${k + 1}`);
    steps.push(formatAugmentedMatrix(augmentedMatrix));

    // Élimination des éléments au-dessus de la diagonale
    for (let i = 0; i < k; i++) {
      const factor = augmentedMatrix[i][k];
      for (let j = 0; j < 2 * n; j++) {
        augmentedMatrix[i][j] -= factor * augmentedMatrix[k][j];
      }
      steps.push(
        `Opération de ligne ${i + 1} : r_${i + 1} - (${factor}) * r_${k + 1}`
      );
      steps.push(formatAugmentedMatrix(augmentedMatrix));
    }

    // Élimination des éléments en-dessous de la diagonale
    for (let i = k + 1; i < n; i++) {
      const factor = augmentedMatrix[i][k];
      for (let j = 0; j < 2 * n; j++) {
        augmentedMatrix[i][j] -= factor * augmentedMatrix[k][j];
      }
      steps.push(
        `Opération de ligne ${i + 1} : r_${i + 1} - (${factor}) * r_${k + 1}`
      );
      steps.push(formatAugmentedMatrix(augmentedMatrix));
    }
    steps.push(`Matrice augmentée après l'itération ${k + 1}:`);
    steps.push(formatAugmentedMatrix(augmentedMatrix));
    steps.push("");
  }

  // Séparer la matrice inverse de la matrice augmentée
  const inverseMatrix = augmentedMatrix.map((row) => row.slice(n));

  return { matrix: inverseMatrix, steps };
}

export function resolveDiagonalDominant(matrix: number[][]): {
  matrix: number[][]; // The final reduced matrix
  steps: string[]; // The steps during the calculation
} {
  if (!isDiagonallyDominant(matrix)) {
    throw new Error("The matrix is not diagonally dominant.");
  }

  return gaussJordanWithoutPivot(matrix);
}

export function resolveSymmetricPositiveDefinite(matrix: number[][]): {
  matrix: number[][]; // The final reduced matrix
  steps: string[]; // The steps during the calculation
} {
  const n = matrix.length;
  if (!isSymmetricPositiveDefinite(matrix, n)) {
    throw new Error("The matrix is not Symmetric definite positive.");
  }

  return gaussJordanWithoutPivot(matrix);
}

export function resolveUpperTriangular(matrix: number[][]): {
  matrix: number[][];
  steps: string[];
} {
  return gaussJordanWithoutPivot(matrix);
}
export function resolveLowerTriangular(matrix: number[][]): {
  matrix: number[][];
  steps: string[];
} {
  return gaussJordanWithoutPivot(matrix);
}
export function resolveBand(
  matrix: number[][],
  k: number
): {
  matrix: number[][]; // The final reduced matrix
  steps: string[]; // The steps during the calculation
} {
  if (!isBand(matrix, k)) {
    throw new Error("The matrix is not diagonally dominant.");
  }
  return gaussJordanBanded(matrix, k);
}

// Helper function to format the augmented matrix for LaTeX display
function formatAugmentedMatrix(matrix: number[][]): string {
  const n = matrix.length;
  const formattedMatrix = matrix
    .map((row) => {
      const leftSide = row
        .slice(0, n)
        .map((cell) => parseFloat(cell.toFixed(2)).toString())
        .join(" & ");
      const rightSide = row
        .slice(n)
        .map((cell) => parseFloat(cell.toFixed(2)).toString())
        .join(" & ");
      return `${leftSide} & \\vert & ${rightSide}`; // Adds a vertical line between the two parts
    })
    .join(" \\\\ ");

  return `\\begin{pmatrix} ${formattedMatrix} \\end{pmatrix}`;
}

// Helper function to find the greatest common divisor
function greatestCommonDivisor(a: number, b: number): number {
  return b === 0 ? a : greatestCommonDivisor(b, a % b);
}

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

export function formatMatrix(matrix: number[][]): string {
  return `\\begin{bmatrix} ${matrix
    .map((row) => row.join(" & "))
    .join(" \\\\ ")} \\end{bmatrix}`;
}
