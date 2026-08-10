import { makeVar } from '@apollo/client'
import { ChartType } from 'shared/types/chat'

export const oneVsOneChartTypeVar = makeVar<ChartType>('tradingview')
