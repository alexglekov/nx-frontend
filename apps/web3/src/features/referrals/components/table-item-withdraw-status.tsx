import React from 'react'
import { QuestionMarkIcon } from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import { ReferralWithdrawRequest } from '__generated__/graphql'
import { RadixColorType } from 'shared/types'
import { TRANSACTION_STATUS_TO_ICON_MAP } from '../constants'
import styles from '../referrals.module.scss'

interface Props {
  status: ReferralWithdrawRequest['status']
}
export const TableItemWithdrawStatus: React.FC<Props> = ({ status }) => {
  const { label, color, icon: renderIcon } = getResultBadge(status)
  const cssColorVar = `var(--${color})`

  return (
    <Flex
      align={'center'}
      gap={'2'}
      height={'100%'}
    >
      <Flex
        className={styles.conditionResultItemWrapper}
        align={'center'}
        gap={'1'}
      >
        {renderIcon({ color: cssColorVar, width: '24', height: '24' })}

        <Text color={color as RadixColorType}>{label?.toUpperCase()}</Text>
      </Flex>
    </Flex>
  )
}

const getResultBadge = (status: ReferralWithdrawRequest['status']) => {
  const unknownResultBadge = {
    label: 'unknown',
    color: 'gray',
    icon: QuestionMarkIcon
  }

  return TRANSACTION_STATUS_TO_ICON_MAP?.[status] || unknownResultBadge
}
