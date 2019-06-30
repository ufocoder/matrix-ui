import autobind from 'autobind'
import { isSquare } from 'src/lib/analyzer'

export type Items = number[][];
export type Rows =  number[][];
export type Row = number[];
export interface Size { width: number; height: number }
export type Initiator = (x?: number, y?: number, size?: Size) => number

export default class Matrix {
  public width: number;
  public height: number;

  protected items: Items;

  public constructor (items: Items = []) {
    if (!this.checkItems(items)) {
      throw new TypeError('Incorrect matrix data')
    }

    this.items = this.cloneItems(items)
    this.height = items.length;
    this.width = items.length ? items[0].length : 0;
  }

  protected cloneItems(items: Items): Items {
    return items.map(row => row.slice()).slice()
  }

  protected checkItems(items: Items): boolean {
    if (!Array.isArray(items)) {
      return false
    }

    for (let i = 0; i < items.length; i++) {
      if (!Array.isArray(items[i])) {
        return false
      }

      if (i>0 && items[i].length !== items[i - 1].length) {
        return false
      }
    }

    return true;
  }
    
  public static create(width: number, height: number, initial: number | Initiator = 0): Matrix {
    return new Matrix(
      Array.from(new Array(height)).map((_, j) => (
        Array.from(new Array(width)).map((__, i) => (
          typeof initial === "function" ? initial(i, j, { width, height }) : initial
        ))
      ))
    );
  }

  public static from(items: Items): Matrix {
    return new Matrix(items);
  }

  public getItems(): Items {
    return this.cloneItems(this.items);
  }

  protected createRow(withInitial = 0): Row {
    const row = []
    let last = this.width
    while(last > 0) {
      row.push(withInitial)
      last--;
    }
    return row
  }

  @autobind
  public getRow(index): Row {
    return this.items.slice()[index] || null
  }

  @autobind
  public getRows(from, to): Rows {
    return this.items.slice(from, to)
  }

  @autobind
  public getCell(x: number, y: number): number {
    return this.items[x][y];
  }

  @autobind
  public addRowAbove(withInitial = 0): Matrix {
    this.items.unshift(this.createRow(withInitial))

    return Matrix.from(this.items);
  }

  @autobind
  public addRowBelow(withInitial = 0): Matrix {
    this.items.push(this.createRow(withInitial))

    return Matrix.from(this.items);
  }

  @autobind
  public addColumnLeft(withInitial = 0): Matrix {
    this.items.forEach(row => row.unshift(withInitial));

    return Matrix.from(this.items);
  }

  @autobind
  public addColumnRight(withInitial = 0): Matrix {
    this.items.forEach(row => row.push(withInitial));
    
    return Matrix.from(this.items);
  }

  @autobind
  public removeColumn(index: number): Matrix {
    this.items.forEach(row => {
      row.splice(index, 1)
    })
    return Matrix.from(this.items);
  }

  @autobind
  public removeRow(index: number): Matrix {
    this.items.splice(index, 1)
    return Matrix.from(this.items);
  }

  @autobind
  public multiplyByValue(multiplier: number): Matrix {
    const matrix = Matrix.from(this.items)
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        matrix.items[i][j] *= multiplier
      }
    }

    return matrix;
  }

  @autobind
  public canMultiplyOnMatrix(matrix: Matrix): boolean {
    return this.width === matrix.height
  }

  @autobind
  public multiplyByMatrix(matrix: Matrix): Matrix {
    if (!this.canMultiplyOnMatrix(matrix)) {
      throw new TypeError("Incorrect multiplier")
    }
      
    const newMatrix = Matrix.create(matrix.width, this.height);

    for (let i = 0; i < matrix.width; i++) {
      for (let j = 0; j < this.height; j++) {
        let value = 0
        for (let r = 0; r < this.width; r++) {
          value += matrix.getCell(r, i) * this.getCell(j, r)
        }
        newMatrix.items[j][i] = value
      }
    }
      
    return newMatrix
  }

  @autobind
  public multiply(multiplier: Matrix | number): Matrix {
    if (multiplier instanceof Matrix) {
      return this.multiplyByMatrix(multiplier)
    }

    return this.multiplyByValue(multiplier)
  }

  @autobind
  public canAddToMatrix(matrix: Matrix): boolean {
    return this.width === matrix.width && this.height === matrix.height
  }

  @autobind
  public add(matrix: Matrix): Matrix {
    if (!this.canAddToMatrix(matrix)) {
      throw new TypeError("Incorrect addend")
    }
      
    const newMatrix = Matrix.create(this.width, this.height);

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        newMatrix.items[i][j] = matrix.getCell(i, j) + this.getCell(i, j)
      }
    }
      
    return newMatrix
  }

  @autobind
  public clone(): Matrix {
    const newMatrix = Matrix.create(this.width, this.height)

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        newMatrix.items[i][j] = this.getCell(i, j)
      }
    }

    return newMatrix
  }

  @autobind
  public getDeterminant(): number {
    if (!isSquare(this)) {
      throw new TypeError("Determinant can't be found")
    }

    if (this.width === 1) {
      return this.getCell(0, 0)
    }

    return this.getRow(0).reduce((acc, item, index) => {
      const minor = this.clone().removeRow(0).removeColumn(index)
      return acc + (-1) ** index * item * minor.getDeterminant.bind(minor)()
    }, 0)
  }
}
