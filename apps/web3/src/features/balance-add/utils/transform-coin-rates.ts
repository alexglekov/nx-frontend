import { CoinDepositType, CoinRateType } from '__generated__/graphql'
import { CoinType } from '../types'

export function transformCoinAndRates(
  assets: CoinDepositType[],
  rates: CoinRateType[]
): CoinType[] {
  return assets
    .filter((asset: CoinDepositType) => {
      return asset && asset.type === 'crypto'
    })
    .map((asset: CoinDepositType) => {
      const rate = rates.find((rt: CoinRateType) => {
        return rt.from === asset.currency && rt.to === 'USD'
      })

      return {
        id: asset.id,
        name: asset.currency,
        rate: rate?.rate || 0,
        minimumAmount: Number(asset.minimumAmount),
        depositFeePercent: Number(asset.depositFeePercent),
        withdrawalFeePercent: Number(asset.withdrawalFeePercent)
      } as CoinType
    })
    .filter((coin: CoinType) => coin.rate > 0)
}
