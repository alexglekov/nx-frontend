import { makeVar } from '@apollo/client'
import { Maybe } from '__generated__/graphql'
import { ChartAnnotations } from 'features/price-graph/types'

export const oneVsOneModalChartAnnotationsVar =
  makeVar<Maybe<ChartAnnotations>>(null)
