import Generator from 'src/lib/generator'

describe('Matrix generator', () => {
  it('identity', () => {
    const size = 4
    const matrix = Generator.identity(size);
    const items = matrix.getItems()

    expect(items).toEqual([
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ])
  })
  it('zero', () => {
    const width = 4
    const height = 4
    const matrix = Generator.zero(width, height);
    const items = matrix.getItems()

    expect(items).toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ])
  })
  it('incremental', () => {
    const width = 4
    const height = 2
    const matrix = Generator.incremental(width, height);
    const items = matrix.getItems()
    
    expect(items).toEqual([
      [1, 2, 3, 4],
      [5, 6, 7, 8]
    ])
  })
  it('reverse incremental', () => {
    const width = 2
    const height = 4
    const matrix = Generator.reverseIncremental(width, height);
    const items = matrix.getItems()
    
    expect(items).toEqual([
      [1, 5],
      [2, 6],
      [3, 7],
      [4, 8]
    ])
  })
})
