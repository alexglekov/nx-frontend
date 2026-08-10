import React from 'react'
import { Text } from '@radix-ui/themes'
import { DownIcon, UpIcon } from 'shared/icons'
import { BetType } from '__generated__/graphql'
import {
  NEGATIVE_COLOR_CSS_VAR,
  POSITIVE_COLOR_CSS_VAR
} from 'shared/constants'

interface Props {
  betType: BetType
  isBetUp: boolean
  betPrice: number
}
export const BetCondition: React.FC<Props> = ({
  betType,
  isBetUp,
  betPrice
}) => {
  if (betType === BetType.Updown) {
    const direction = isBetUp ? 'UP' : 'DOWN'

    return (
      <>
        {isBetUp ? (
          <UpIcon color={POSITIVE_COLOR_CSS_VAR} />
        ) : (
          <DownIcon color={NEGATIVE_COLOR_CSS_VAR} />
        )}
        <Text color={isBetUp ? 'green' : 'pink'}>{direction}</Text>
      </>
    )
  }

  // TODO: style exact price condition
  return (
    <>
      <UpIcon color={POSITIVE_COLOR_CSS_VAR} />
      <Text color={'green'}>{betPrice}</Text>
    </>
  )
}
