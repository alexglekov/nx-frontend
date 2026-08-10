import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import {
  BullsEyeTopFirstIconPath,
  BullsEyeTopSecondIconPath,
  BullsEyeTopThirdIconPath
} from 'shared/icons'
import { useBullsEyeWinnerModal } from '../hooks/use-bulls-eye-winner-modal'
import { BullsEyeWinnerListItem } from './bulls-eye-winner-list-item'
import styles from '../mode-bulls-eye.module.scss'

export const BullsEyeWinnerList: React.FC = () => {
  const { isWinnersListOpen, winnersList } = useBullsEyeWinnerModal()

  if (winnersList?.length === 0 && !isWinnersListOpen) return null

  return (
    <Flex
      direction={'column'}
      width={'100%'}
      gap={'3'}
    >
      <Text
        className={styles.colorGray}
        size={'2'}
        weight={'medium'}
        align={'center'}
      >
        TOP PLAYERS:
      </Text>
      <Flex
        width={'100%'}
        direction={'column'}
        gap={'2'}
      >
        {winnersList?.map((el, index) => {
          if (!el?.ownerId) return null

          const topIconPath = getTopPlayerIconPath(index)

          return (
            <BullsEyeWinnerListItem
              key={el.ownerId}
              winnerBet={el || null}
              iconPath={topIconPath}
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

const getTopPlayerIconPath = (index: number) => {
  if (index === 0) return BullsEyeTopFirstIconPath
  if (index === 1) return BullsEyeTopSecondIconPath
  if (index === 2) return BullsEyeTopThirdIconPath

  return null
}
