import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { EthAssetIcon } from 'shared/icons'
import { NotificationToastType } from 'shared/types'
import { TetherToken } from 'shared/ui'
import { NotificationToastTypes } from '../types'
import styles from '../notification.module.scss'

interface Props {
  notificationStateType: NotificationToastType
  winAmount: string
}

export const NotificationToastWinAmount: React.FC<Props> = ({
  notificationStateType,
  winAmount
}) => {
  if (
    (notificationStateType === NotificationToastTypes.WIN ||
      notificationStateType === NotificationToastTypes.LOSS ||
      notificationStateType === NotificationToastTypes.BONUS) &&
    !isNaN(Number(winAmount))
  ) {
    const winAmountText =
      winAmount.startsWith('-') ? 'You lost' : 'Your winnings are'

    const positiveAmount = Math.abs(Number(winAmount))

    const formattedWinAmount =
      (
        positiveAmount < 0.01 &&
        notificationStateType !== NotificationToastTypes.BONUS
      ) ?
        '<0.01'
      : positiveAmount

    return (
      <Flex
        align={'center'}
        gap={'2'}
      >
        <Text size={'2'}>{winAmountText}</Text>
        <Flex
          align={'center'}
          justify={'center'}
          gap={'1'}
          className={styles.winAmountContainer}
        >
          {/* TODO: Return Tether / Xyro Icon when BE will be ready*/}
          {notificationStateType === NotificationToastTypes.BONUS && (
            <EthAssetIcon
              width={'2.5rem'}
              height={'2.5rem'}
            />
          )}
          <Text
            size={'3'}
            weight={'light'}
            className='color-white'
          >
            {formattedWinAmount}
          </Text>
        </Flex>
      </Flex>
    )
  }

  return null
}
