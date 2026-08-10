import { FC, ReactElement } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import styles from '../approved-balance.module.scss'

interface Props {
  amount: {
    xyro: string | number
    usdt: string | number
  }
  icon: ReactElement
  name: string
}

export const ApprovedBalanceRakebackGame: FC<Props> = ({
  amount,
  icon,
  name
}) => {
  return (
    <Flex
      justify={'between'}
      gap={'2'}
      className={styles.approvedBalanceRakebackGame}
    >
      <Flex
        gap={'1'}
        width={'100%'}
        align={'center'}
        wrap={'wrap'}
      >
        {icon}

        <Text>{name}</Text>
      </Flex>

      <Flex
        direction={'column'}
        width={'60%'}
        gap={'1'}
      >
        <Text
          weight={'bold'}
          className={'color-white'}
          size={'1'}
        >
          {amount.usdt} USDT
        </Text>

        <Text
          weight={'bold'}
          className={'color-white'}
          size={'1'}
        >
          {amount.xyro} XYRO
        </Text>
      </Flex>
    </Flex>
  )
}
