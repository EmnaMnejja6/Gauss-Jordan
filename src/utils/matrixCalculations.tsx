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

export function isLowerTriangular(mat: number[][]): boolean {
  console.log(mat);
  return false;
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

    for (let j = 0; j < n; j++) {
      if (i !== j) {
        sumOfOffDiagonal += Math.abs(matrix[i][j]);
      }
    }

    if (diagonalElement < sumOfOffDiagonal) {
      return false; 
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

    for (let i = pivot + 1; i <= pivot + k && i < n; i++) {
      if (Math.abs(matrix[i][pivot]) > maxVal) {
        maxVal = Math.abs(matrix[i][pivot]);
        iPivot = i;
      }
    }

    if (iPivot !== pivot) {
      [matrix[pivot], matrix[iPivot]] = [matrix[iPivot], matrix[pivot]];
      steps.push(`\\text{Échange des lignes ${pivot + 1} et ${iPivot + 1}}:`);
      steps.push(`\\left(\\begin{matrix} ${formatAugmentedMatrix(matrix)} \\end{matrix}\\right)`);
    }

    const pivotValue = matrix[pivot][pivot];
    if (pivotValue==0) {
      alert("La Matrice est singulière");
      throw new Error("Matrice singulière.");
    }
    for (let j = pivot; j < n + 1; j++) {
      matrix[pivot][j] /= pivotValue;
      operationsCount++;
    }
    if(pivot!=1){
      steps.push(`\\text{Normalisation de la ligne ${pivot + 1}}:`);
      steps.push(`\\left(\\begin{matrix} ${formatAugmentedMatrix(matrix)} \\end{matrix}\\right)`);
    }

    for (let i = 0; i < pivot; i++) {
      const f = matrix[i][pivot];
      for (let j = pivot; j < n + 1; j++) {
        matrix[i][j] -= f * matrix[pivot][j];
        operationsCount++;
      }
      if(f!=0){
        steps.push(`\\text{L ${i + 1} = L ${i + 1} - (${f}) * L ${pivot + 1}}:`);
        steps.push(`\\left(\\begin{matrix} ${formatAugmentedMatrix(matrix)} \\end{matrix}\\right)`);
      }
    }

    for (let i = pivot + 1; i < n; i++) {
      const f = matrix[i][pivot];
      for (let j = pivot; j < n + 1; j++) {
        matrix[i][j] -= f * matrix[pivot][j];
        operationsCount++;
      }
      if(f!=0){
        steps.push(`\\text{L ${i + 1} = L ${i + 1} - (${f}) * L ${pivot + 1}}:`);
        steps.push(`\\left(\\begin{matrix} ${formatAugmentedMatrix(matrix)} \\end{matrix}\\right)`);
      }
    }
  }

  
  
  steps.push(`\\text{Nombre total d'opérations arithmétiques : ${operationsCount}}`);

  return { matrix, steps };
}



export function gaussJordanWithoutPivot(matrix: number[][]): {
  matrix: number[][]; // The final reduced matrix
  steps: string[]; // The steps during the calculation, showing augmented matrix
  
} {
  const steps: string[] = [];
  const n = matrix.length;
  let operations=0;

  for (let k = 0; k < n; k++) {
    const pivot = matrix[k][k];
    if (pivot === 0) {
      steps.push(`\\text{Pivot est zero ${k + 1}, matrice is singuliere.}`);
      return { matrix, steps };
    }

    for (let j = k; j < n + 1; j++) {
      matrix[k][j] /= pivot;
      operations++;
    }

    steps.push(`\\text{ Normalisation de } r_${k + 1}`);
    steps.push(
      `\\left(\\begin{matrix} ${formatAugmentedMatrix(
        matrix
      )} \\end{matrix}\\right)`
    );

    for (let i = 0; i < k; i++) {
      const m = matrix[i][k];
      for (let j = k; j < n + 1; j++) {
        matrix[i][j] -= m * matrix[k][j];
        operations+=2;
      }

      steps.push(
        `r_{${i + 1}} \\leftarrow r_{${i + 1}} - (${toFraction(m)}) r_{${k + 1}}`
      );
      steps.push(
        `\\left(\\begin{matrix} ${formatAugmentedMatrix(
          matrix
        )} \\end{matrix}\\right)`
      );
    }

    for (let i = k + 1; i < n; i++) {
      const m = matrix[i][k];
      for (let j = k; j < n + 1; j++) {
        matrix[i][j] -= m * matrix[k][j];
        operations+=2;
      }

      steps.push(
        `r_{${i + 1}} \\leftarrow r_{${i + 1}} - (${toFraction(m)}) r_{${k + 1}}`
      );
      
      steps.push(
        `\\left(\\begin{matrix} ${formatAugmentedMatrix(
          matrix
        )} \\end{matrix}\\right)`
      );
    }
  }
  steps.push(`\\text{Nombre total d'opérations : ${operations}.}`);


  return { matrix, steps };
}

export function gaussJordanWithPivot(matrix: number[][]): {
  matrix: number[][];
  steps: string[];

} {
  const steps: string[] = [];
  const n = matrix.length;
  let operations=0;

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
      steps.push(`\\left(\\begin{matrix} ${formatAugmentedMatrix(matrix)} \\end{matrix}\\right)`);
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
      operations++;
    }

    steps.push(`\\left(\\begin{matrix} ${formatAugmentedMatrix(matrix)} \\end{matrix}\\right)`);
    console.log(`Matrice après normalisation de la ligne ${k + 1}:`, matrix);

    for (let i = 0; i < k; i++) {
      const m = matrix[i][k];
      for (let j = k; j < n + 1; j++) {
        matrix[i][j] -= m * matrix[k][j];
        operations+=2;
      }

      if(m!=0){
        steps.push(
          `r_{${i + 1}} \\leftarrow r_{${i + 1}} - (${toFraction(m)}) r_{${k + 1}}`
        );      
        steps.push(`\\left(\\begin{matrix} ${formatAugmentedMatrix(matrix)} \\end{matrix}\\right)`);
      }
    }

    for (let i = k + 1; i < n; i++) {
      const m = matrix[i][k];
      for (let j = k; j < n + 1; j++) {
        matrix[i][j] -= m * matrix[k][j];
        operations+=2;
      }

      if(m!=0){
        steps.push(
          `r_{${i + 1}} \\leftarrow r_{${i + 1}} - (${toFraction(m)}) r_{${k + 1}}`
        );      
        steps.push(`\\left(\\begin{matrix} ${formatAugmentedMatrix(matrix)} \\end{matrix}\\right)`);
      }

    }
  }
  steps.push(`\\text{Nombre total d'opérations : ${operations}.}`);
  return { matrix, steps };
}

export function inverseMatrix(mat: number[][]): {
  matrix: number[][]; // La matrice finale après réduction
  steps: string[]; // Les étapes pendant le calcul
  operations:number;
} {
  const steps: string[] = [];
  const n = mat.length;
  let operations=0;

  const augmentedMatrix = mat.map((row) => [...row, ...Array(n).fill(0)]);
  for (let i = 0; i < n; i++) {
    augmentedMatrix[i][i + n] = 1;
  }

  steps.push("Matrice augmentée initiale :");
  steps.push(`\\left(\\begin{matrix} ${formatAugmentedMatrix(
      augmentedMatrix)} \\end{matrix}\\right)`);

  let diag: number;
  let permute: boolean;

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
          steps.push(
            `\\left(\\begin{matrix} ${formatAugmentedMatrix(
              augmentedMatrix)} \\end{matrix}\\right)`);
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
      diag = augmentedMatrix[k][k]; 
    }

    for (let j = 0; j < 2 * n; j++) {
      augmentedMatrix[k][j] /= diag;
      operations++;
    }
    steps.push(`Normalisation de la ligne ${k + 1}`);
    steps.push(
      `\\left(\\begin{matrix} ${formatAugmentedMatrix(
        augmentedMatrix)} \\end{matrix}\\right)`);
    for (let i = 0; i < k; i++) {
      const f = augmentedMatrix[i][k];
      for (let j = 0; j < 2 * n; j++) {
        augmentedMatrix[i][j] -= f * augmentedMatrix[k][j];
        operations+=2;
      }
      if(f!=0){
        steps.push(
          `Opération de ligne ${i + 1} : r_${i + 1} - ${f} * r_${k + 1}`
        );
        steps.push(`\\left(\\begin{matrix} ${formatAugmentedMatrix(augmentedMatrix)} \\end{matrix}\\right)`);
    
      }  
    }

    for (let i = k + 1; i < n; i++) {
      const f = augmentedMatrix[i][k];
      for (let j = 0; j < 2 * n; j++) {
        augmentedMatrix[i][j] -= f * augmentedMatrix[k][j];
        operations+=2;
      }
      if(f!=0){
        steps.push(
          `Opération de ligne ${i + 1} : r_${i + 1} - (${f}) * r_${k + 1}`
        );
        steps.push(
          `\\left(\\begin{matrix} ${formatAugmentedMatrix(
            augmentedMatrix)} \\end{matrix}\\right)`); 
      }
    }

    steps.push("");
  }
  steps.push(`Nombre total d'opérations : ${operations}`);
  
  const inverseMatrix = augmentedMatrix.map((row) => row.slice(n));

  return { matrix: inverseMatrix, steps, operations };
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
  return gaussJordanUpperTriangular(matrix);
}
export function resolveLowerTriangular(matrix: number[][]): {
  matrix: number[][];
  steps: string[];
} {
  return gaussJordanLowerTriangular(matrix);
}
export function resolveDiagonal(matrix: number[][]):{
  matrix: number[][];
  steps: string[];
}{ 
  return gaussJordanDiagonal(matrix);
}
export function resolveBand(
  matrix: number[][],
  k: number
): {
  matrix: number[][]; // The final reduced matrix
  steps: string[]; // The steps during the calculation
} {
  if (!isBand(matrix, k)) {
    throw new Error("The matrix is not Band.");
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

  return `\\begin{matrix} ${formattedMatrix} \\end{matrix}`;
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

export function gaussJordanUpperTriangular(matrix: number[][]): {
  matrix: number[][];
  steps: string[];
  
} {
  const steps: string[] = [];
  const n = matrix.length;
  let operations=0;

  for (let k = 0; k < n; k++) {
    let pivot = matrix[k][k];

    if (pivot === 0) {
      steps.push(
        `\\text{Le pivot à la position (${k + 1}, ${k + 1}) est nul. Résolution impossible avec ce pivot.}`
      );
      console.error(`Pivot nul à la position (${k + 1}, ${k + 1})`);
      throw new Error("Pivot nul détecté");
    }

    if (pivot !== 1) {
      steps.push(
        `\\text{Normalisation de la ligne ${k + 1} en divisant par le pivot ${pivot}.}`
      );
      for (let j = k; j < n + 1; j++) {
        matrix[k][j] /= pivot; 
        operations++;
      }
      steps.push(`\\left(\\begin{matrix} ${formatAugmentedMatrix(matrix)} \\end{matrix}\\right)`);
    } 

    for (let i = 0; i < k; i++) {
      const m = matrix[i][k];
      for (let j = k; j < n + 1; j++) {
        matrix[i][j] -= m * matrix[k][j];
        operations+=2;
      }

      if(m!=0){
        steps.push(
          `r_{${i + 1}} \\leftarrow r_{${i + 1}} - ${toFraction(m)} \\, r_{${k + 1}}`
        );
        steps.push(`\\left(\\begin{matrix} ${formatAugmentedMatrix(matrix)} \\end{matrix}\\right)`);
      }
    }
  }
  steps.push(`\\text{Matrice résolue }`);
  steps.push(`\\left(\\begin{matrix} ${formatAugmentedMatrix(matrix)} \\end{matrix}\\right)`);
  steps.push(`\\text{Nombre total d'opérations : ${operations}}`);
  return { matrix, steps };
}

export function gaussJordanLowerTriangular(matrix: number[][]): {
  matrix: number[][];
  steps: string[];
} {
  const steps: string[] = [];
  const n = matrix.length;
  let operations=0;

  for (let k = 0; k < n; k++) {
    let pivot = matrix[k][k];

    if (pivot === 0) {
      steps.push(
        `\\text{Le pivot à la position (${k + 1}, ${k + 1}) est nul. Résolution impossible avec ce pivot.}`
      );
      console.error(`Pivot nul à la position (${k + 1}, ${k + 1})`);
      throw new Error("Pivot nul détecté");
    }

    if (pivot !== 1) {
      steps.push(
        `\\text{Normalisation de la ligne ${k + 1} en divisant par le pivot ${pivot}.}`
      );
      for (let j = k; j < n + 1; j++) {
        matrix[k][j] /= pivot; 
        operations++;
      }
      steps.push(`\\left(\\begin{matrix} ${formatAugmentedMatrix(matrix)} \\end{matrix}\\right)`);
    } 

    for (let i = k+1; i < n; i++) {
      const m = matrix[i][k];
      for (let j = k; j < n + 1; j++) {
        matrix[i][j] -= m * matrix[k][j];
        operations+=2;
      }

      if(m!=0){
        steps.push(`r_{${i + 1}} \\leftarrow r_{${i + 1}} - ${toFraction(m)} \\, r_{${k + 1}}`);
        steps.push(`\\left(\\begin{matrix} ${formatAugmentedMatrix(matrix)} \\end{matrix}\\right)`);
      }
    }

  }

    steps.push(`\\text{Matrice résolue :}`);
    steps.push(`\\left(\\begin{matrix} ${formatAugmentedMatrix(matrix)} \\end{matrix}\\right)`);
    steps.push(`\\text{Nombre total d'opérations : ${operations}}`);
    return { matrix, steps };   
    
}

export function gaussJordanDiagonal(matrix: number[][]): {
  matrix: number[][];
  steps: string[];
} {
  const steps: string[] = [];
  const n = matrix.length;
  let operations = 0;

  for (let k = 0; k < n; k++) {
    let pivot = matrix[k][k];

    if (pivot === 0) {
      alert(`Le pivot à la position (${k + 1}, ${k + 1}) est nul. Résolution impossible avec ce pivot.`);
      steps.push(
        `\\text{Le pivot à la position (${k + 1}, ${k + 1}) est nul. Résolution impossible avec ce pivot.}`
      );
      console.error(`Pivot nul à la position (${k + 1}, ${k + 1})`);
      throw new Error("Pivot nul détecté");
    }
    if (pivot !== 1) {
      steps.push(
        `\\text{Normalisation de la ligne ${k + 1} en divisant par le pivot ${pivot}.}`
      );
      for (let j = k; j < n + 1; j++) {
        matrix[k][j] /= pivot; 
        operations++;
      }
      steps.push(`\\left(\\begin{matrix} ${formatAugmentedMatrix(matrix)} \\end{matrix}\\right)`);
    } 
   
  }

  steps.push(`\\text{Matrice résolue :}`);
  steps.push(`\\left(\\begin{matrix} ${formatAugmentedMatrix(matrix)} \\end{matrix}\\right)`);
  steps.push(`\\text{Nombre total d'opérations : ${operations}}`);
  return { matrix, steps };
}
