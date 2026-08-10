import { FC } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { BuyBackTooltip } from './buy-back-tooltip'
import styles from '../buy-back.module.scss'

interface Props {
  title: string
  tooltipTitle?: string
  token: 'usdt' | 'xyro' | 'eth'
  value: string | null
}

export const BuyBackReviewDialogDataTitle: FC<Props> = ({
  title,
  token,
  value,
  tooltipTitle
}) => {
  if (!value) return null

  return (
    <Flex
      justify={'between'}
      className={styles.reviewDialogDataTitle}
    >
      <Flex gap={'2'}>
        <Text>{title}</Text>

        {Boolean(tooltipTitle) && <BuyBackTooltip title={tooltipTitle} />}
      </Flex>

      <Text className='color-white'>
        {value}&nbsp;{token.toUpperCase()}
      </Text>
    </Flex>
  )
}
