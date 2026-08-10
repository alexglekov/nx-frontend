import { UpDownGame } from '__generated__/graphql'
import { ChartPoint } from 'features/price-graph/types'
import { AssetId } from 'shared/types'

export interface UpDownBet {
  gameId: string
  isUp: boolean
  amount: number
}

export type UpDownHistoryGame = Pick<
  UpDownGame,
  'id' | 'isUp' | 'startPrice' | 'endPrice' | 'startAt'
>

export type BetDirection = 'UP' | 'DOWN'

export type ChartData = {
  assetId: AssetId
  prices: ChartPoint[]
}
