import Matrix from 'src/lib/matrix'
import * as operators from 'src/lib/operators'

describe('Matrix operators', () => {
  it('multiply on number', () => {
    const matrix = Matrix.create(2, 3, 4);
    const multiplier = 5;

    expect(operators.multiply(matrix, multiplier).getItems()).toEqual([
      [20, 20],
      [20, 20],
      [20, 20]
    ])
  })

  it('multiply on matrix', () => {
    const matrixA = Matrix.from([
      [1, 2, 3],
      [4, 5, 6]
    ]);

    const matrixB = Matrix.from([
      [1, 4, 7, 10],
      [2, 5, 8, 11],
      [3, 6, 9, 12]
    ]);

    expect(operators.multiply(matrixA, matrixB).getItems()).toEqual([
      [14, 32, 50, 68],
      [32, 77, 122, 167],
    ])
  })

  it('add to matrix', () => {
    const matrix = operators.add(
      Matrix.from([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ]), 
      Matrix.from([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ])
    )

    expect(matrix.getItems()).toEqual([
      [2, 2, 3],
      [4, 6, 6],
      [7, 8, 10]
    ])
  })

  it('minor', () => {
    const matrix = Matrix.from([
      [1, 2, 3, 4],
      [1, 2, 1, 0],
      [0, 0, 1, 3],
      [1, 1, 1, 1]
    ])

    expect(operators.minor(matrix, 1, 1).getItems()).toEqual([
      [1, 3, 4],
      [0, 1, 3],
      [1, 1, 1],
    ])
  })

  it('calculates determinant', () => {
    const matrixA = Matrix.from([
      [1, 2, 3],
      [-1, 2, 1],
      [0, 0, 1]
    ]);

    const matrixB = Matrix.from([
      [-1, 2, 3, 4, 5],
      [6, 5, 4, -3, -2],
      [-5, -4, -3, 2, 1],
      [4, -3, -2, -1, 4],
      [-3, -2, -1, 1, 2]
    ]);

    expect(operators.determinant(matrixA)).toEqual(4)
    expect(operators.determinant(matrixB)).toEqual(-92)
  })
})
