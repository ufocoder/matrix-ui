import Matrix from 'src/lib/matrix'
import { isSquare } from 'src/lib/analyzer'

const ERROR_INCORRECT_OPERANDS = 'Incorrect operands'

const multiplyByValue = (matrix: Matrix, multiplier: number): Matrix  => {
  const items = matrix.getItems()
  for (let i = 0; i < matrix.height; i++) {
    for (let j = 0; j < matrix.width; j++) {
      items[i][j] *= multiplier
    }
  }
  return Matrix.from(items)
}

const canMultiplyByMatrix = (matrixA: Matrix, matrixB: Matrix): boolean => {
  return matrixA.width === matrixB.height
}

const multiplyByMatrix = (matrixA: Matrix, matrixB: Matrix): Matrix => {
  if (!canMultiplyByMatrix(matrixA, matrixB)) {
    throw new TypeError(ERROR_INCORRECT_OPERANDS)
  }
  
  const itemsA = matrixA.getItems()
  const itemsB = matrixB.getItems()

  const newMatrix = Matrix.create(matrixB.width, matrixA.height);

  for (let i = 0; i < matrixB.width; i++) {
    for (let j = 0; j < matrixA.height; j++) {
      let value = 0
      for (let r = 0; r < matrixA.width; r++) {
        value += itemsB[r][i] * itemsA[j][r]
      }
      newMatrix.items[j][i] = value
    }
  }
    
  return newMatrix
}

export const canMultiply = (matrix: Matrix, multiplier: Matrix | number): boolean => {
  if (multiplier instanceof Matrix) {
    return canMultiplyByMatrix(matrix, multiplier)
  }

  return true
}

export const multiply = (matrix: Matrix, multiplier: Matrix | number): Matrix => {
  if (!canMultiply(matrix, multiplier)) {
    throw new TypeError(ERROR_INCORRECT_OPERANDS)
  }

  if (multiplier instanceof Matrix) {
    return multiplyByMatrix(matrix, multiplier)
  }

  return multiplyByValue(matrix, multiplier)
}

export const canAdd = (matrixA: Matrix, matrixB: Matrix): boolean => {
  return matrixA.width === matrixB.width && matrixA.height === matrixB.height
}

export const add = (matrixA: Matrix, matrixB: Matrix): Matrix => {
  if (!canAdd(matrixA, matrixB)) {
    throw new TypeError(ERROR_INCORRECT_OPERANDS)
  }
  
  const matrix = Matrix.create(matrixA.width, matrixA.height);
  const items = matrix.getItems()

  for (let i = 0; i < matrixA.height; i++) {
    for (let j = 0; j < matrixA.width; j++) {
      items[i][j] = matrixA.items[i][j] + matrixB.items[i][j]
    }
  }
    
  return Matrix.from(items);
}

export const removeColumn = (matrix: Matrix, index: number): Matrix => {
  const items = matrix.getItems()
  items.forEach(row => {
    row.splice(index, 1)
  })
  return Matrix.from(items);
}

export const removeRow = (matrix: Matrix, index: number): Matrix => {
  const items = matrix.getItems()
  items.splice(index, 1)
  return Matrix.from(items);
}

export const createRowAbove = (matrix: Matrix, withInitial: number = 0): Matrix => {
  const items = matrix.getItems()

  items.unshift(
    Array.from({ length: matrix.width }, () => withInitial)
  )

  return Matrix.from(items);
}

export const createRowBelow = (matrix: Matrix, withInitial: number = 0): Matrix => {
  const items = matrix.getItems()
  
  items.push(
    Array.from({ length: matrix.width }, () => withInitial)
  )

  return Matrix.from(items);
}

export const createColumnLeft = (matrix: Matrix, withInitial: number = 0): Matrix => {
  const items = matrix.getItems()

  items.forEach(row => row.unshift(withInitial))

  return Matrix.from(items);
}

export const createColumnRight = (matrix: Matrix, withInitial: number = 0): Matrix => {
  const items = matrix.getItems()

  items.forEach(row => row.push(withInitial))
  
  return Matrix.from(items);
}

export const canMinor = (matrix: Matrix): boolean => isSquare(matrix)

export const minor = (matrix: Matrix, column: number, row: number): Matrix => {
  if (!canMinor(matrix)) {
    throw new TypeError(ERROR_INCORRECT_OPERANDS)
  }

  return removeColumn(removeRow(matrix, row), column)
}

export const canDeterminant = (matrix: Matrix): boolean => isSquare(matrix) && 0 !== matrix.width

export const determinant = (matrix: Matrix): number => {
  if (!canDeterminant(matrix)) {
    throw new TypeError(ERROR_INCORRECT_OPERANDS)
  }

  if (1 === matrix.width) {
    return matrix.items[0][0]
  }

  const row = matrix.getRow(0)

  return row.reduce((accumulator, value, column) => (
    accumulator + (-1) ** column * value * determinant(minor(matrix, column, 0))
  ), 0)
}

export default {
  add,
  multiply,
  minor,
  determinant,
  can: {
    add: canAdd,
    multiply: canMultiply,
    minor: canMinor,
    determinant: canDeterminant
  },
  create: {
    row: {
      above: createRowAbove,
      below: createRowBelow
    },
    column: {
      left: createColumnLeft,
      right: createColumnRight
    }
  },
  remove: {
    column: removeColumn,
    row: removeRow
  }
}
