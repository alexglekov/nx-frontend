import { Flex, Text } from '@radix-ui/themes'
import { InfoCircleIcon } from 'shared/icons'
import { DotTitle } from 'shared/ui/dot-title/dot-title'
import { CoinType } from '../types'
import styles from '../balance-add.module.scss'

export interface InfoDataProps {
  coin: CoinType | null
  isOperationSuccess?: boolean
}
export const DepositParamView: React.FC<InfoDataProps> = ({
  coin,
  isOperationSuccess = false
}) => {
  return (
    <Flex
      mb={isOperationSuccess ? '0' : '6'}
      direction={'column'}
      gap={'3'}
    >
      <Flex
        gap={'1'}
        justify={'between'}
      >
        <Flex
          align={'center'}
          gap={'2'}
        >
          <DotTitle>NETWORK FEE</DotTitle>
          <InfoCircleIcon />
        </Flex>
        <Text
          className={styles.feeText}
          size={'2'}
        >
          --
        </Text>
      </Flex>
      {coin ? (
        <Flex
          align={'center'}
          justify={'between'}
        >
          <DotTitle>TOTAL</DotTitle>
          <Text
            size={'2'}
            className={styles.feeText}
          >
            0,060147 ETH
          </Text>
        </Flex>
      ) : null}
    </Flex>
  )
}
