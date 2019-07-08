import autobind from 'autobind'

export type Items = number[][];
export type Rows =  number[][];
export type Row = number[];
export interface Size { width: number; height: number }
export type Initiator = (x?: number, y?: number, size?: Size) => number

export default class Matrix {
  public readonly width: number;
  public readonly height: number;

  public readonly items: Items;

  public constructor (items: Items = []) {
    if (!this.checkItems(items)) {
      throw new TypeError('Incorrect matrix data')
    }

    this.items = this.cloneItems(items)
    this.height = items.length;
    this.width = items.length ? items[0].length : 0;
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
    
  protected cloneItems(items: Items): Items {
    return items.map(row => row.slice()).slice()
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

  @autobind
  public getRow(index): Row {
    return this.getItems()[index] || null
  }

  @autobind
  public getRows(from, to): Rows {
    return this.getItems().slice(from, to)
  }
}
