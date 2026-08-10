import { Maybe } from 'shared/types'

// eslint-disable-next-line max-statements
export function getExitStrategyBoundaries(
  currentAssetPrice: number,
  isLong: boolean,
  exitStrategy: 'TP' | 'SL'
): Maybe<[number, number]> {
  const changePercent = currentAssetPrice * 0.003
  const maxPossibleAmount =
    currentAssetPrice + currentAssetPrice - changePercent // 199.7%
  const minPossible = currentAssetPrice - currentAssetPrice + changePercent // 0.3%

  if (exitStrategy === 'TP') {
    const tpMaxAmount =
      isLong ? maxPossibleAmount : currentAssetPrice - changePercent
    const tpMinAmount = isLong ? currentAssetPrice + changePercent : minPossible
    return [tpMaxAmount, tpMinAmount]
  }

  if (exitStrategy === 'SL') {
    const slMaxAmount =
      isLong ? currentAssetPrice - changePercent : maxPossibleAmount
    const slMinAmount = isLong ? minPossible : currentAssetPrice + changePercent
    return [slMaxAmount, slMinAmount]
  }

  return null
}
