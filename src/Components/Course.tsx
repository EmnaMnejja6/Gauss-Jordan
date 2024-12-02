import { MathJax, MathJaxContext } from "better-react-mathjax";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";

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
    <div style={{ marginTop: "80px", marginLeft: "350px", padding: "auto" , maxWidth:"120vh"}}>
      <MathJaxContext>
        <div className="container my-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">
                Méthode d'élimination de Gauss-Jordan
              </h2>
              <p className="card-text">
                La méthode d'élimination de Gauss-Jordan est un processus pour
                résoudre des systèmes d'équations linéaires en transformant une
                matrice donnée en sa forme échelonnée réduite (RREF). Elle étend
                l'élimination de Gauss en réduisant davantage la matrice pour
                rendre la résolution des variables inconnues plus facile.
              </p>

              <h4 className="mt-4">Explication étape par étape</h4>
              <p>
                Dans cette méthode, nous utilisons des opérations élémentaires
                sur les lignes pour réduire la matrice à une forme où l'élément
                principal dans chaque ligne est 1, et tous les éléments
                au-dessus et en dessous de l'élément principal sont 0. Les trois
                opérations sur les lignes sont :
              </p>
              <ol>
                <li>Échanger deux lignes</li>
                <li>Multiplier une ligne par un scalaire non nul</li>
                <li>
                  Ajouter ou soustraire des multiples d'une ligne à une autre
                  ligne
                </li>
              </ol>

              <h4 className="mt-4">Exemple</h4>
              <p>
                Considérons le système d'équations linéaires représenté par la
                matrice augmentée suivante :
              </p>
              <MathJax className="mb-4">{`\\[ ${exampleMatrix} \\]`}</MathJax>

              <p>
                <strong>Étape 1 :</strong> Faites en sorte que le premier
                élément de la première ligne soit égal à 1 en divisant la
                première ligne par 2 :
              </p>
              <MathJax className="mb-4">{`\\[ ${step1} \\]`}</MathJax>

              <p>
                <strong>Étape 2 :</strong> Utilisez la première ligne pour
                éliminer les éléments en dessous du pivot dans la première
                colonne :
              </p>
              <MathJax className="mb-4">{`\\[ ${step2} \\]`}</MathJax>

              <p>
                <strong>Étape 3 :</strong> Continuez le processus d'élimination
                pour obtenir la forme échelonnée réduite (RREF) :
              </p>
              <MathJax className="mb-4">{`\\[ ${finalStep} \\]`}</MathJax>

              <p>
                À partir de cette forme échelonnée réduite, les solutions du
                système d'équations sont : <strong>x = 2, y = 3, z = -1</strong>
                .
              </p>

              <h4 className="mt-4">
                Applications de l'élimination de Gauss-Jordan
              </h4>
              <ul>
                <li>
                  <strong>
                    Résolution de systèmes d'équations linéaires :
                  </strong>{" "}
                  L'élimination de Gauss-Jordan est largement utilisée pour
                  trouver la solution des systèmes d'équations linéaires.
                </li>
                <li>
                  <strong>Calcul du déterminant :</strong> La méthode de Gauss
                  peut être utilisée pour calculer le déterminant d'une matrice
                  carrée.
                </li>
                <li>
                  <strong>Recherche de l'inverse d'une matrice :</strong>{" "}
                  L'élimination de Gauss-Jordan peut être utilisée pour
                  déterminer l'inverse d'une matrice carrée en augmentant la
                  matrice avec la matrice identité et en la réduisant.
                </li>
                <li>
                  <strong>Calcul du rang et des bases :</strong> La méthode est
                  utile pour déterminer le rang et les bases d'une matrice en la
                  réduisant à sa forme échelonnée ou RREF.
                </li>
              </ul>

              <h4 className="mt-4">
                Code C++ pour l'élimination de Gauss-Jordan
              </h4>
              <p>
                Voici le code C++ pour implémenter la méthode d'élimination de
                Gauss-Jordan :
              </p>
              <div className="my-3">
                <SyntaxHighlighter language="cpp" style={coy} showLineNumbers>
                  {`#include <iostream>
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
                cout << a[i][j] << "\\t";
            }
            cout << endl;
        }
        cout << endl;
    }

    for (int i = 0; i < n; i++) {
        cout << "Solution x" << i + 1 << " = " << a[i][n] << endl;
    }
}`}
                </SyntaxHighlighter>
              </div>

              <p>
                Ce code C++ résout un système d'équations linéaires en utilisant
                la méthode d'élimination de Gauss-Jordan en effectuant des
                opérations élémentaires sur les lignes pour réduire la matrice à
                sa forme échelonnée réduite.
              </p>
            </div>
          </div>
        </div>
      </MathJaxContext>
    </div>
  );
};

export default Cours;
