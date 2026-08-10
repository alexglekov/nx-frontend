import { AssetId } from 'shared/types'

export enum MemeWarsWinnerModalCommonType {
  Win = 'WIN',
  Loss = 'LOSS'
}

export type MemeWarsWinnerListGameDetailAsset = {
  name: AssetId
  startPrice: number
  endPrice: number
  priceDiff: number
}
