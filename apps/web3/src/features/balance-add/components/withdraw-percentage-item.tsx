import { Flex, Text } from '@radix-ui/themes'
import React from 'react'
import { XyroSlicedContainer } from 'shared/icons'
import styles from '../balance-add.module.scss'
import { WithdrawPercentageItem } from '../types'

interface Props {
  el: WithdrawPercentageItem
  setActiveWirhdrawPercentage?: React.Dispatch<
    React.SetStateAction<WithdrawPercentageItem | null>
  >
  isActive: boolean
}

export const PercentageWithdrawItem: React.FC<Props> = ({
  el,
  setActiveWirhdrawPercentage,
  isActive
}) => {
  return (
    <Flex
      className={styles.withdrawPercentageItem}
      position={'relative'}
      align={'center'}
      justify={'center'}
      onClick={() =>
        setActiveWirhdrawPercentage && setActiveWirhdrawPercentage(el)
      }
    >
      {isActive ? (
        <XyroSlicedContainer className={styles.withdrawPercentageButton} />
      ) : null}
      <Text
        weight={'bold'}
        size={'1'}
        className={
          isActive
            ? styles.withdrawPercentageItemTextActive
            : styles.withdrawPercentageItemText
        }
      >
        {el.lable}
      </Text>
    </Flex>
  )
}
