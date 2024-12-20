#include <iostream>
#include <vector>
#include <cmath> // Pour fabs

using namespace std;

// Fonction pour afficher la matrice
void afficherMatrice(const vector<vector<double>> &matrice)
{
    for (const auto &ligne : matrice)
    {
        for (double valeur : ligne)
        {
            cout << valeur << "\t";
        }
        cout << endl;
    }
}

double determinantGaussJordan(vector<vector<double>> matrice)
{
    int n = matrice.size();
    double det = 1.0; // Initialisation
    int swaps = 0;    // Nombre d'échanges de lignes

    for (int col = 0; col < n; ++col)
    {
        // Recherche du pivot maximum dans la colonne
        int pivot = col;
        for (int i = col + 1; i < n; ++i)
        {
            if (fabs(matrice[i][col]) > fabs(matrice[pivot][col]))
            {
                pivot = i;
            }
        }

        // Si le pivot est nul, le déterminant est nul
        if (fabs(matrice[pivot][col]) < 1e-9)
        {
            return 0;
        }

        // Échange des lignes si nécessaire
        if (pivot != col)
        {
            swap(matrice[pivot], matrice[col]);
            swaps++;
        }

        // Réduction des lignes sous la diagonale
        for (int i = col + 1; i < n; ++i)
        {
            double facteur = matrice[i][col] / matrice[col][col];
            for (int j = col; j < n; ++j)
            {
                matrice[i][j] -= facteur * matrice[col][j];
            }
        }
    }

    // Calcul du déterminant : produit des éléments diagonaux
    for (int i = 0; i < n; ++i)
    {
        det *= matrice[i][i];
    }

    // Inversion du signe en fonction du nombre d'échanges de lignes
    if (swaps % 2 != 0)
    {
        det = -det;
    }

    return det;
}

int main()
{
    int n;
    cout << "Entrez la taille de la matrice (n x n): ";
    cin >> n;

    vector<vector<double>> matrice(n, vector<double>(n));

    cout << "Entrez les éléments de la matrice:" << endl;
    for (int i = 0; i < n; ++i)
    {
        for (int j = 0; j < n; ++j)
        {
            cin >> matrice[i][j];
        }
    }

    cout << "\nMatrice initiale :\n";
    afficherMatrice(matrice);

    double det = determinantGaussJordan(matrice);

    cout << "\nLe déterminant de la matrice est : " << det << endl;

    return 0;
}
