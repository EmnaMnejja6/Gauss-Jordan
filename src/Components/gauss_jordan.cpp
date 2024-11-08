#include <iostream>
#include <vector>
using namespace std;
int main()
{
    int n = 3;
    vector<vector<int>> a = {{1, -1, 2, 5}, {3, 2, 1, 10}, {2, -3, -2, -10}};
    for (int k = 0; k < n; k++)
    {
        for (int j = k + 1; j < n + 1; j++)
        {
            a[k][j] = a[k][j] / a[k][k];
        }
        for (int i = 0; i < k; i++)
        {
            for (int j = k + 1; j < n + 1; j++)
            {
                a[i][j] = a[i][j] - a[i][k] * a[k][j];
            }
        }
        for (int i = k + 1; i < n; i++)
        {
            for (int j = k + 1; j < n + 1; j++)
            {
                a[i][j] = a[i][j] - a[i][k] * a[k][j];
            }
        }
        cout << "iteration numero " << k + 1 << endl;
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < n + 1; j++)
            {
                cout << a[i][j] << " ";
            }
            cout << endl;
        }
        cout << endl;
    }
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n + 1; j++)
        {
            cout << a[i][j] << " ";
        }
        cout << endl;
    }
    return 0;
}