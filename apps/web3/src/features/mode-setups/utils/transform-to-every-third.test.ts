import { transformToEveryThird } from './transform-to-every-third'

describe('transformToEveryThird', () => {
  const inputs = [
    [1, 3],
    [2, 3],
    [3, 3],
    [4, 6],
    [5, 6],
    [6, 6],
    [7, 9],
    [8, 9],
    [9, 9]
  ]

  it.each(inputs)(
    'should return proper values for the given input',
    (input, expected) => {
      const result = transformToEveryThird(input)
      expect(result).toBe(expected)
    }
  )

  it('should return null if input is less than 1', () => {
    const result = transformToEveryThird(0)
    expect(result).toBeNull()
  })
})
