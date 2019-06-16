import autobind from 'autobind'

export type Items = number[][];
export type Rows =  number[][];
export type Row = number[];
export type Initiator = (x?: number, y?: number, matrix?: Matrix) => number

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
            Array.from(new Array(height)).map((_, i) => (
                Array.from(new Array(width)).map((__, j) => (
                    typeof initial === "function" ? initial(i, j) : initial
                ))
            ))
        );
    }

    public static isEqual(firstMatrix: Matrix, secondMatrix: Matrix): boolean {
        if (firstMatrix.height !== secondMatrix.height) {
            return false
        }

        if (firstMatrix.width !== secondMatrix.width) {
            return false
        }

        for (let i = 0; i < firstMatrix.width; i++) {
            for (let j = 0; j < firstMatrix.height; j++) {
                if (firstMatrix.getCell(i, j) !== secondMatrix.getCell(i, j)) {
                    return false;
                }
            }
        }

        return true;
    }

    public static from(items: Items): Matrix {
        return new Matrix(items);
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
        this.height++;

        return Matrix.from(this.items);
    }

    @autobind
    public addRowBelow(withInitial = 0): Matrix {
        this.items.push(this.createRow(withInitial))
        this.height++;

        return Matrix.from(this.items);
    }

    @autobind
    public addColumnLeft(withInitial = 0): Matrix {
        this.items.forEach(row => row.unshift(withInitial));
        this.width++;

        return Matrix.from(this.items);
    }

    @autobind
    public addColumnRight(withInitial = 0): Matrix {
        this.items.forEach(row => row.push(withInitial));
        this.width++;
      
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
                    value += matrix.getCell(i, r) * this.getCell(r, j)
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
}
