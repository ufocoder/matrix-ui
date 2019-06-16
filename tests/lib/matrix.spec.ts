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
})
