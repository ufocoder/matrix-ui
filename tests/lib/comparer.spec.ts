import Comparer from 'src/lib/comparer'
import Matrix from 'src/lib/matrix'

describe('Matrix comparer', () => {
  it('isTransposed', () => {
    const matrixA = Matrix.from([
      [1, 1, 1, 1],
      [2, 2, 2, 2],
      [3, 3, 3, 3],
      [4, 4, 4, 4]
    ])

    const matrixB = Matrix.from([
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4]
    ])

    expect(Comparer.isTransposed(matrixA, matrixB))
  })

  it('isEqual', () => {
    const matrixA = Matrix.from([
      [1, 1, 1, 1],
      [2, 2, 2, 2],
      [3, 3, 3, 3],
      [4, 4, 4, 4]
    ])

    const matrixB = Matrix.from([
      [1, 1, 1, 1],
      [2, 2, 2, 2],
      [3, 3, 3, 3],
      [4, 4, 4, 4]
    ])

    expect(Comparer.isEqual(matrixA, matrixB))
  })
})
