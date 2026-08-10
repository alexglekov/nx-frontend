import { WinrateDiagramType } from '__generated__/graphql'
import { UTCTimestamp } from 'lightweight-charts'
import { MS_IN_SEC } from 'shared/constants'

export function transformWinrateDataToChartData(data: WinrateDiagramType[]) {
  return data.map((b, i) => {
    if (!b?.intervals) throw new Error('No createdAt field')
    const increment = i * 0.00001 // NOTE: to ensure consecutive timestamps
    const timestamp = new Date(b.intervals).getTime()
    return {
      time: (timestamp / MS_IN_SEC + increment) as UTCTimestamp,
      value: Number(b.winrate)
    }
  })
}
