import React from 'react'
import { ReactiveVar } from '@apollo/client'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { BalanceTypes } from 'shared/constants'
import { formatHugePrice } from 'shared/utils/format-huge-price'
import { BalanceSwitchType, ApprovedBalanceSwitchTypes } from '../types'
import styles from '../approved-balance.module.scss'

interface Props {
  activeType: string
  setActiveType: ReactiveVar<ApprovedBalanceSwitchTypes>
  balanceSwitchTypes: BalanceSwitchType[]
  wrapperClassname?: string
  buttonClassname?: string
  size?: '1' | '2' | '3' | '4'
}

export const ApprovedBalanceTypeSwitcher: React.FC<Props> = ({
  balanceSwitchTypes,
  activeType,
  setActiveType,
  wrapperClassname,
  buttonClassname,
  size = '3'
}) => {
  return (
    <Flex
      p={'1'}
      className={cn(
        styles.typeSwitcherWrapper,
        wrapperClassname ? wrapperClassname : ''
      )}
    >
      {balanceSwitchTypes.map(balanceType => {
        const { switchType, balance, icon, dataTestID } = balanceType
        const isActiveType = switchType === activeType
        const buttonClassNames = cn(
          isActiveType ?
            styles.typeSwitcherActiveSection
          : styles.typeSwitcherSection,
          buttonClassname ? buttonClassname : ''
        )
        const iconClassNames = cn(
          styles.typeSwitcherIconWrap,
          styles[`typeSwitcherIconWrap${switchType}`]
        )

        const balanceTypeValue =
          balanceType.switchType.toUpperCase() === BalanceTypes.Xyro ?
            'XYRO'
          : 'USDT'

        return (
          <Button
            onClick={() => setActiveType(switchType)}
            type='button'
            key={switchType}
            size={size}
            className={buttonClassNames}
            data-testid={dataTestID || ''}
          >
            <Flex
              gap={'2'}
              align='center'
            >
              <Box className={iconClassNames}>{icon}</Box>

              <Text
                size={'4'}
                weight={'bold'}
              >
                {formatHugePrice(Number(balance))} {balanceTypeValue}
              </Text>
            </Flex>
          </Button>
        )
      })}
    </Flex>
  )
}
