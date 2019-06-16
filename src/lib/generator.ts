import Matrix, { Initiator } from "./matrix";


export const generateNumber = (from: number, to: number): number => (
    Math.floor(from + (to - from + 1) * Math.random())
)

export const CellInitiator = {
    zero: () => 0,
    identity: (x, y) => x === y ? 1 : 0,
    diagonal: (x, y) => x === y ? generateNumber(-100, 100) : 0,
    logical: () => generateNumber(0, 1),
    nonnegative: () => generateNumber(0, 100),
    incremental: (x, y, matrix) => x + y * matrix.width + 1
}

const createBasicGenerator = (cellInitiator: Initiator) => (width: number, height: number) => (
    Matrix.create(width, height, cellInitiator)
);

const createSquareGenerator = (cellInitiator) => (size) => (
    Matrix.create(size, size, cellInitiator)
)

export const zero = createBasicGenerator(CellInitiator.zero)
export const identity = createSquareGenerator(CellInitiator.identity)
export const incremental = createSquareGenerator(CellInitiator.incremental)
export const logical = createBasicGenerator(CellInitiator.logical)
export const nonnegative = createBasicGenerator(CellInitiator.nonnegative)

export default {
    zero,
    identity,
    incremental,
    logical,
    nonnegative
}
