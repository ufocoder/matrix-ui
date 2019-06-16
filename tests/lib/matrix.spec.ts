import Matrix from '../../src/lib/matrix'

describe('Matrix', () => {
  it('create', () => {
    const matrix = Matrix.create(2, 3, 4);

    expect(matrix.width).toBe(2)
    expect(matrix.height).toBe(3)

    expect(matrix.getItems()).toEqual([
      [4, 4],
      [4, 4],
      [4, 4]
    ])
  })

  it('multiply on number', () => {
    const matrix = Matrix.create(2, 3, 4);

    expect(matrix.multiply(5).getItems()).toEqual([
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

    expect(matrixA.multiply(matrixB).getItems()).toEqual([
      [14, 32, 50, 68],
      [32, 77, 122, 167],
    ])
  })

  it('add to matrix', () => {
    const matrixA = Matrix.from([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ]);

    const matrixB = Matrix.from([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ]);

    expect(matrixA.add(matrixB).getItems()).toEqual([
      [2, 2, 3],
      [4, 6, 6],
      [7, 8, 10]
    ])
  })
})
