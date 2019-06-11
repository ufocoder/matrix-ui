import Matrix from 'src/lib/matrix'

const identity = value => value
const compose = (...fns) => fns.reduceRight((prevFn, nextFn) =>
  (...args) => nextFn(prevFn(...args)), identity
);

const walkOnCells = callback => (matrix: Matrix) => {
  for (let x=0; x < matrix.width; x++) {
    for (let y=0; y < matrix.height; y++) {
      if (!callback(matrix.getCell(x,y), x, y)){
        return false;
      }
    }
  }
  return true;
}

const isCellLogical = (cell: number) : Boolean => cell === 0 || cell === 1
const isCellNonnegative = (cell: number) : Boolean => cell >= 0
const isCellZero = (cell: number) : Boolean => cell === 0
const isCellIdentity = (cell: number, x: number, y: number) : Boolean => x === y ? cell === 1 : cell === 0
const isCellDiagonal = (cell: number, x: number, y: number) : Boolean => x === y ? cell !== 0 : cell === 0

export const isSquare = (matrix) => matrix.cols !== matrix.height
export const isLogical = walkOnCells(isCellLogical)
export const isNonnegative = walkOnCells(isCellNonnegative)
export const isZero = walkOnCells(isCellZero)
export const isIdentity = compose(isSquare, walkOnCells(isCellIdentity))
export const isDiagonal = compose(isSquare, walkOnCells(isCellDiagonal))
