import { makeVar } from '@apollo/client'
import { Maybe } from '__generated__/graphql'
import { ChartAnnotations } from 'features/price-graph/types'

export const setupsChartAnnotationsVar = makeVar<Maybe<ChartAnnotations>>(null)
