import Analyzer from 'src/lib/analyzer'
import Matrix from 'src/lib/matrix'

const testCases = [
  {
    method: 'isSquare',
    items: [
      [1, 2, 9],
      [8, 0, 3],
      [1, 7, 5],
    ]
  },
  {
    method: 'isRectangular',
    items: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
    ]
  },
  {
    method: 'isLineVector',
    items: [
      [1, 2, 3, 4]
    ]
  },
  {
    method: 'isColumnVector',
    items: [
      [1],
      [2],
      [3],
      [4],
    ]
  },
  {
    method: 'isScalar',
    items: [
      [1]
    ]
  },
  {
    method: 'isLogical',
    items: [
      [1, 0, 0, 1],
      [1, 1, 1, 1],
      [0, 0, 0, 1],
      [0, 1, 0, 0]
    ]
  },
  {
    method: 'isNonnegative',
    items: [
      [0, 6, 3, 1],
      [1, 5, 1, 1],
      [9, 2, 3, 1],
      [0, 6, 4, 7]
    ]
  },
  {
    method: 'isZero',
    items: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  },
  {
    method: 'isIdentity',
    items: [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ]
  },
  {
    method: 'isDiagonal',
    items: [
      [1, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 3, 0],
      [0, 0, 0, 4]
    ]
  }
]


describe('Matrix analyzer', () => {
  testCases.forEach(({ method, items }) => {
    it(method, () => {
      expect(
        Analyzer[method](
          Matrix.from(items)
        )
      ).toBeTruthy()
    })
  })
}) 
