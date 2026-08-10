import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { Predict } from '__generated__/graphql'
import { userVar } from 'shared/store/user'
import { calculateAmountString } from 'shared/utils/calculate-amount-string'
import { TodayLeadersItem } from './today-leaders-item'

interface Props {
  title: string
  secondaryTitle: string
  leaders: Predict[] | null
  valueBadge?: string
  userPosition: number
}
// TODO: rename according to the file name
export const TodayLeaders: React.FC<Props> = ({
  title,
  secondaryTitle,
  leaders,
  valueBadge,
  userPosition
}) => {
  const user = useReactiveVar(userVar)

  if (!leaders || leaders?.length === 0) return null

  return (
    <Card
      size={'1'}
      style={{ width: '100%', borderRadius: '5.25rem' }}
    >
      <Flex
        direction={'column'}
        width={'100%'}
        px={'4'}
        pt={'4'}
      >
        <Text
          size={'3'}
          weight={'regular'}
          mb={'1'}
        >
          {secondaryTitle}
        </Text>
        <Heading
          weight={'regular'}
          size={'7'}
          color={'yellow'}
          mb={'3'}
        >
          {title}
        </Heading>
      </Flex>

      {leaders?.map((el, index) => {
        if (!('pnl' in el)) return null
        if (!el?.pnl) return null

        const isRoi = false
        const amountString = calculateAmountString(
          isRoi,
          0, // WARN: el?.roi
          el.pnl,
          valueBadge as string
        )
        const isCurrnetUser = Boolean(user?.id === el.ownerId)

        return (
          <TodayLeadersItem
            key={el.ownerId}
            id={isCurrnetUser ? userPosition + 1 : index + 1}
            user={el?.owner ?? null}
            amountString={amountString}
            isCurrnetUser={isCurrnetUser}
          />
        )
      })}
    </Card>
  )
}
