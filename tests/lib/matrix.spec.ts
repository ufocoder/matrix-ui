import Matrix from '../../src/lib/matrix'

describe('Matrix', () => {
  it('create', () => {
    const matrix = Matrix.create(2, 3, 4);

    expect(matrix.width).toBe(2)
    expect(matrix.height).toBe(3)

    for (let i = 0; i < matrix.height; i++) {
      for (let j = 0; j < matrix.width; j++) {
        expect(matrix.getCell(i, j)).toBe(4)
      }
    }
  })

  it('multiply on number', () => {
    const matrix = Matrix.create(2, 3, 4);
    const modified = matrix.multiply(5)

    for (let i = 0; i < modified.height - 1; i++) {
      for (let j = 0; j < modified.width - 1; j++) {
        expect(modified.getCell(i, j)).toBe(20)
      }
    }
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
})
