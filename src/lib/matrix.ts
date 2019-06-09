import autobind from 'autobind'

type Items = Array <Array <number>>;

export default class Matrix {
    public width: number;
    public height: number;

    protected items: Items;

    constructor (items: Items) {
      if (!this.checkItems(items)) {
          throw new TypeError('Incorrect matrix data')
      }

      this.items = this.cloneItems(items)
      this.height = items.length;
      this.width = items.length ? items[0].length : 0;
    }

    protected cloneItems(items) {
      return items.map(row => row.slice()).slice()
    }

    protected checkItems(items: any): boolean {
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
    
    static create(width: number, height: number, initial): Matrix {
        const items = Array.from(
            new Array(width)).map(_ => (
                Array.from(new Array(height)).map(_ => initial)
            )
        )

        return new Matrix(items);
    }

    static from(items: Items): Matrix {
      return new Matrix(items);
  }

    protected createRow(withInitial = 0) {
      const row = []
      let last = this.width
      while(last > 0) {
        row.push(withInitial)
        last--;
      }
      return row
    }

    @autobind
    public getRow(index) {
      return this.items.slice()[index] || null
    }

    @autobind
    public getRows(from, to) {
      return this.items.slice(from, to)
    }

    @autobind
    public getCell(x, y) {
      return this.items[x][y];
    }

    @autobind
    public addRowAbove(withInitial = 0) {
      this.items.unshift(this.createRow(withInitial))
      this.height++;

      return Matrix.from(this.items);
    }

    @autobind
    public addRowBelow(withInitial = 0) {
      this.items.push(this.createRow(withInitial))
      this.height++;

      return Matrix.from(this.items);
    }

    public addColumnLeft(withInitial = 0) {
      this.items.forEach(row => row.unshift(withInitial));
      this.width++;

      return Matrix.from(this.items);
    }
    public addColumnRight(withInitial = 0) {
      this.items.forEach(row => row.push(withInitial));
      this.width++;
      
      return Matrix.from(this.items);
    }

    @autobind
    public multiplyByValue(multiplier: number) {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                this.items[i][j] *= multiplier
            }
        }

        return Matrix.from(this.items);
    }

    @autobind
    public checkMultiplyByMatrix(matrix: Matrix) {
      // @TODO
      return false
    }

    @autobind
    public multiplyByMatrix(matrix: Matrix) {
        if (this.checkMultiplyByMatrix(matrix)) {
            throw new TypeError("Incorrect multiplier")
        }
        // @TODO
    }

    @autobind
    public multiply(multiplier: Matrix | number) {
        if (multiplier instanceof Matrix) {
            return this.multiplyByMatrix(multiplier)
        }

        return this.multiplyByValue(multiplier)
    }
}
