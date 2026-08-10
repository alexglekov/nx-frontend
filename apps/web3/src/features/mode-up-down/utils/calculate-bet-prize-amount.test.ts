/* eslint-disable max-statements */
import { UpDownGame } from '__generated__/graphql'
import { calculateBetPayout, PrizeParams } from './calculate-bet-prize-amount'

const isUp = true
const betAmount = 10
const hasBet = true

const upPool: Omit<UpDownGame['upPool'], 'predicts'> = {
  poolAmount: 3,
  predictsCount: 3
}
const downPool: Omit<UpDownGame['downPool'], 'predicts'> = {
  poolAmount: 2,
  predictsCount: 2
}

describe('calculateBetPrizeAmount', () => {
  it('should return 0 percent and 0 amount if either pool is missing', () => {
    const result: PrizeParams = calculateBetPayout(
      isUp,
      betAmount,
      true, // hasBet
      undefined, // upPool missing
      downPool
    )
    expect(result.percent).toBe(0)
    expect(result.amount).toBe(0)
  })

  it('should return correct prize parameters for up bet', () => {
    const result: PrizeParams = calculateBetPayout(
      isUp,
      betAmount,
      false, // no existing bet
      upPool,
      downPool
    )

    expect(result.percent).toBeGreaterThan(0)
    expect(result.amount).toBeGreaterThan(0)
  })

  it('should return correct prize parameters for down bet', () => {
    const result: PrizeParams = calculateBetPayout(
      false, // isUp
      betAmount,
      false, // hasBet
      {
        ...upPool,
        poolAmount: 200
      },
      {
        ...downPool,
        poolAmount: 90
      }
    )

    expect(result.percent).toBeGreaterThan(0)
    expect(result.amount).toBeGreaterThan(0)
  })

  it('should return 0 percent and 0 amount if bet amount is 0', () => {
    const result: PrizeParams = calculateBetPayout(
      isUp,
      0, // betAmount
      false, // hasBet
      upPool,
      downPool
    )
    expect(result.percent).toBe(0)
    expect(result.amount).toBe(0)
  })

  it('should return 200 percent and 75 amount if bet amount is 25 vs 50', () => {
    const result: PrizeParams = calculateBetPayout(
      isUp,
      25, // betAmount
      hasBet, // existing bet
      {
        ...upPool,
        poolAmount: 25
      },
      {
        ...downPool,
        poolAmount: 50
      }
    )

    expect(result.percent).toBe(200)
    expect(result.amount).toBe(75)
  })
})
