import { FC } from 'react'
import { OneVsOneExactPricePredict } from '__generated__/graphql'
import { NoPredictIcon } from 'shared/icons'
import { Maybe } from 'shared/types'
import { ExactBadge } from './exact-badge'

interface Props {
  predict?: Maybe<OneVsOneExactPricePredict>
  startPrice?: Maybe<number>
}

export const PredictBadge: FC<Props> = ({ predict }) => {
  if (!predict) return <NoPredictIcon />

  return <ExactBadge predict={predict} />
}
