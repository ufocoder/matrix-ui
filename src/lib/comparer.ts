import Matrix from 'src/lib/matrix'

type MatrixComparer = (matrixA: Matrix, matrixB: Matrix) => boolean

export const isEqual: MatrixComparer = (matrixA, matrixB) => {
  if (matrixA.height !== matrixB.height) {
    return false
  }

  if (matrixA.width !== matrixB.width) {
    return false
  }

  for (let i = 0; i < matrixA.width; i++) {
    for (let j = 0; j < matrixA.height; j++) {
      if (matrixA.items[i][j] !== matrixB.items[i][j]) {
        return false
      }
    }
  }

  return true
}

export const isTransposed: MatrixComparer  = (matrixA, matrixB) => {
  if (matrixA.height !== matrixB.width || matrixA.width !== matrixB.height) {
    return false
  }

  for (let i = 0; i < matrixA.width; i++) {
    for (let j = 0; j < matrixA.height; j++) {
      if (matrixA.items[i][j] !== matrixB.items[i][j]) {
        return false
      }
    }
  }

  return true
}

export default {
  isEqual,
  isTransposed,
}
