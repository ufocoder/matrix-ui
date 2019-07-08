import Matrix from 'src/lib/matrix'

describe('Matrix', () => {
  it('create', () => {
    const matrix = Matrix.create(2, 3, 4);

    expect(matrix.width).toBe(2)
    expect(matrix.height).toBe(3)

    expect(matrix.getItems()).toEqual([
      [4, 4],
      [4, 4],
      [4, 4]
    ])
  })

  it('from', () => {
    const items = [
      [4, 4],
      [4, 4],
      [4, 4]
    ]

    const matrix = Matrix.from(items);
    expect(matrix.getItems()).toEqual(items)
  })
})
