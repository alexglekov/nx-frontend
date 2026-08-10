import { FC } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import {
  NEGATIVE_COLOR_CSS_VAR,
  POSITIVE_COLOR_CSS_VAR
} from 'shared/constants'
import { DownIcon, UpIcon } from 'shared/icons'
import styles from '../mode-up-down.module.scss'

interface ConditionProps {
  isPositive: boolean
}
export const ConditionTableItem: FC<ConditionProps> = ({ isPositive }) => {
  return (
    <Flex
      className={styles.conditionResultItemWrapper}
      align={'center'}
      gap={'1'}
    >
      {isPositive ? (
        <UpIcon color={POSITIVE_COLOR_CSS_VAR} />
      ) : (
        <DownIcon color={NEGATIVE_COLOR_CSS_VAR} />
      )}

      <Text color={isPositive ? 'green' : 'pink'}>
        {isPositive ? 'up' : 'down'}
      </Text>
    </Flex>
  )
}
