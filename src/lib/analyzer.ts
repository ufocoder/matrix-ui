import Matrix from 'src/lib/matrix'

type MatrixAnalyzer = (matrix: Matrix) => boolean
type CellAnalyzer = (value: number, x?: number, y?: number) => boolean

const and = (...fns: MatrixAnalyzer[]): MatrixAnalyzer => matrix => fns.reduce((acc, fn) =>
  acc && fn(matrix), true
);

const walkOnCells = (callback: Function): MatrixAnalyzer => (matrix: Matrix): boolean => {
  for (let x=0; x < matrix.height; x++) {
    for (let y=0; y < matrix.width; y++) {
      if (!callback(matrix.items[x][y], x, y)) {
        return false;
      }
    }
  }
  return true;
}

const isCellLogical: CellAnalyzer = cell => cell === 0 || cell === 1
const isCellNonnegative: CellAnalyzer = cell => cell >= 0
const isCellZero: CellAnalyzer = cell => cell === 0
const isCellIdentity: CellAnalyzer = (cell, x, y) => x === y ? cell === 1 : cell === 0
const isCellDiagonal: CellAnalyzer = (cell, x, y) => x === y ? cell !== 0 : cell === 0

export const isSquare: MatrixAnalyzer = matrix => matrix.width === matrix.height
export const isRectangular: MatrixAnalyzer = matrix => !isSquare(matrix)
export const isLineVector: MatrixAnalyzer = matrix => matrix.height === 1 && matrix.width > 1
export const isColumnVector: MatrixAnalyzer = matrix => matrix.width === 1 && matrix.height > 1
export const isScalar: MatrixAnalyzer = matrix => matrix.height === 1 && matrix.width === 1
export const isLogical: MatrixAnalyzer = walkOnCells(isCellLogical)
export const isNonnegative: MatrixAnalyzer = walkOnCells(isCellNonnegative)
export const isZero: MatrixAnalyzer = walkOnCells(isCellZero)
export const isIdentity: MatrixAnalyzer = and(isSquare, walkOnCells(isCellIdentity))
export const isDiagonal: MatrixAnalyzer = and(isSquare, walkOnCells(isCellDiagonal))

export default {
  isSquare,
  isRectangular,
  isLineVector,
  isColumnVector,
  isScalar,
  isZero,
  isLogical,
  isNonnegative,
  isDiagonal,
  isIdentity
}
