import { FC } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { Responsive, Union } from '@radix-ui/themes/dist/cjs/props/prop-def'
import { DataTestIDs } from 'shared/constants'
import { SwapTetherToken, SwapXyroToken } from 'shared/icons'
import { formatBalance } from '../format-balance'
import { activeBalanceSwitchTypeVar } from '../store/switch-types'
import { ApprovedBalanceSwitchTypes } from '../types'
import styles from '../approved-balance.module.scss'

interface Props {
  dataTestID: DataTestIDs
  title: string
  value: number
  width?: Responsive<string>
  className?: string
  p?: Responsive<
    Union<string, '3' | '0' | '1' | '2' | '4' | '5' | '6' | '7' | '8' | '9'>
  >
}

export const ApprovedBalanceValue: FC<Props> = ({
  dataTestID,
  title,
  value,
  width,
  className,
  p
}) => {
  const formattedValue = formatBalance(value)
  const formattedTitle = title.toUpperCase()

  return (
    <Flex
      direction={'column'}
      p={p}
      gap={'2'}
      width={width}
      className={className}
    >
      <Text
        size={'1'}
        weight={'bold'}
        color={'gray'}
        className={styles.balanceTitle}
      >
        {formattedTitle}
      </Text>

      <Flex gap={'1'}>
        <Flex className={styles.approvedAmountTokenIcon}>
          <ApprovedBalanceValueIcon />
        </Flex>

        <Text
          data-testid={dataTestID}
          weight={'bold'}
        >
          {formattedValue}
        </Text>
      </Flex>
    </Flex>
  )
}

const ApprovedBalanceValueIcon = () => {
  const activeType = useReactiveVar(activeBalanceSwitchTypeVar)

  if (activeType === ApprovedBalanceSwitchTypes.Tether) {
    return (
      <SwapTetherToken
        width={'2.5rem'}
        height={'2.5rem'}
      />
    )
  }

  return (
    <SwapXyroToken
      width={'2.5rem'}
      height={'2.5rem'}
    />
  )
}
