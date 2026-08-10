import { makeVar } from '@apollo/client'
import { ChartAnnotations } from 'features/price-graph/types'
import { Maybe } from 'shared/types'

export const bullsEyeChartAnnotationsVar =
  makeVar<Maybe<ChartAnnotations>>(null)
