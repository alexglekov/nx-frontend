import { getExitStrategyBoundaries } from './get-exit-strategy-boundaries'

describe('getExitStrategyBoundary', () => {
  it('should return the correct exit strategy boundaries for TP', () => {
    const currentAssetPrice = 100
    const isLong = true
    const exitStrategy = 'TP'

    const boundaries = getExitStrategyBoundaries(
      currentAssetPrice,
      isLong,
      exitStrategy
    )

    expect(boundaries?.[0]).toBe(199)
    expect(boundaries?.[1]).toBe(101)
  })

  it('should return the correct exit strategy boundaries for TP when isLong is false', () => {
    const currentAssetPrice = 100
    const isLong = false
    const exitStrategy = 'TP'

    const boundaries = getExitStrategyBoundaries(
      currentAssetPrice,
      isLong,
      exitStrategy
    )

    expect(boundaries?.[0]).toBe(99)
    expect(boundaries?.[1]).toBe(1)
  })

  it('should return the correct exit strategy boundaries for SL', () => {
    const currentAssetPrice = 100
    const isLong = true
    const exitStrategy = 'SL'

    const boundaries = getExitStrategyBoundaries(
      currentAssetPrice,
      isLong,
      exitStrategy
    )

    expect(boundaries?.[0]).toBe(99)
    expect(boundaries?.[1]).toBe(1)
  })

  it('should return the correct exit strategy boundaries for SL when isLong is false', () => {
    const currentAssetPrice = 100
    const isLong = false
    const exitStrategy = 'SL'

    const boundaries = getExitStrategyBoundaries(
      currentAssetPrice,
      isLong,
      exitStrategy
    )

    expect(boundaries?.[0]).toBe(199)
    expect(boundaries?.[1]).toBe(101)
  })
})
