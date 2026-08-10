import { Maybe, UpDownGame } from '__generated__/graphql'
import BigNumber from 'bignumber.js'

export interface PrizeParams {
  percent: number
  amount: number
}

const FEE_DENOMINATOR = 10000
const PRECISION_AMPLIFIER = 100000

// TODO: add service fee to result

/**
 * Calculates the prize parameters for a bet in the UpDown game mode.
 * @param isUp - A boolean indicating whether the bet is for the "Up" option.
 * @param betAmount - The amount of the bet.
 * @param hasBet - A boolean indicating а bet ехists.
 * @param upPool - The pool information for the "Up" option.
 * @param downPool - The pool information for the "Down" option.
 * @returns An object containing the prize amount and percentage.
 */
// eslint-disable-next-line complexity, max-statements, max-params
export function calculateBetPayout(
  isUp: boolean,
  betAmount: number,
  hasBet: boolean,
  upPool?: Omit<UpDownGame['downPool'], 'predicts'>,
  downPool?: Omit<UpDownGame['downPool'], 'predicts'>,
  roomFee?: Maybe<string>
): PrizeParams {
  if (!upPool || !downPool || betAmount <= 0) {
    return {
      percent: 0,
      amount: 0
    }
  }

  const fee = roomFee ? (Number(roomFee) * FEE_DENOMINATOR) / 2 : 750

  const betPool = isUp ? upPool : downPool
  const oppositePool = isUp ? downPool : upPool

  if (oppositePool.predictsCount === 0) return { percent: 0, amount: 0 }

  const betAmountBig = new BigNumber(betAmount).times(Math.pow(10, 6))

  const oppositePoolAmount = new BigNumber(oppositePool.poolAmount).times(
    Math.pow(10, 6)
  )
  const betPoolAmount = new BigNumber(
    hasBet ? betPool.poolAmount : betPool.poolAmount + betAmount
  ).times(Math.pow(10, 6))

  const oppositeFee = oppositePoolAmount.times(fee).dividedBy(FEE_DENOMINATOR)
  const betPoolFee = betPoolAmount.times(fee).dividedBy(FEE_DENOMINATOR)

  const oppositeFinal = oppositePoolAmount.minus(oppositeFee)
  const betPoolFinal = betPoolAmount.minus(betPoolFee)

  const rate = oppositeFinal
    .times(FEE_DENOMINATOR)
    .times(PRECISION_AMPLIFIER)
    .dividedBy(betPoolFinal)

  const withdrawFees = betAmountBig.times(fee).dividedBy(FEE_DENOMINATOR)

  const depositFinal = betAmountBig.minus(withdrawFees)
  const depositFinalRated = depositFinal.times(rate)

  const payout = depositFinal
    .plus(depositFinalRated.dividedBy(PRECISION_AMPLIFIER * FEE_DENOMINATOR))
    .dividedBy(1e6)

  const winningPercentage =
    betAmount ?
      payout
        .minus(betAmountBig.dividedBy(1e6))
        .dividedBy(betAmountBig.dividedBy(1e6))
        .times(100)
    : 0

  const percent =
    !isNaN(Number(winningPercentage)) ? Number(winningPercentage.toFixed(0)) : 0

  const amount =
    isNaN(Number(payout.toFixed(2))) ? 0 : Number(payout.toFixed(2))

  return {
    amount,
    percent
  }
}
