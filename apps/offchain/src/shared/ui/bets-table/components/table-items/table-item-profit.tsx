import React from 'react'
import { Flex } from '@radix-ui/themes'
import cn from 'classnames'
import { useGetSmartContract } from 'shared/hooks/use-smart-contracts'
import { SwapXyroToken, TetherRoundedIcon } from 'shared/icons'
import { Maybe, RadixColorType, Web3Adress } from 'shared/types'
import { formatAmountLong } from 'shared/utils/format-price'
import { zeroAddress } from 'viem'
import { TetherToken } from '../../../tether-token'
import { XyroNumeral } from '../../../xyro-numeral'
import { XyroToken } from '../../../xyro-token'
import { MIN_PNL } from '../../constants'
import styles from '../../table.module.scss'

interface Props {
  value?: Maybe<number>
  isTextColored?: boolean
  className?: string
  variant?: 'xyro' | 'tether' | 'none' | 'usd'
  tokenColor?: Maybe<RadixColorType>
  isTokenRounded?: boolean
  gameContractAddress?: Web3Adress
  tokenContractAddress?: Web3Adress
}

/* eslint-disable-next-line complexity, max-statements */
export const TableItemProfit: React.FC<Props> = ({
  value,
  isTextColored = false,
  className = '',
  tokenColor = null,
  variant = 'tether',
  isTokenRounded = false,
  gameContractAddress,
  tokenContractAddress
}) => {
  const {
    smartContractAddress: xyroSmartContractAddress,
    getContractEntryByAddress
  } = useGetSmartContract('XyroToken')

  const gameSmartContract = getContractEntryByAddress(
    gameContractAddress || zeroAddress
  )
  const tokenSmartContractAddress =
    gameSmartContract?.meta?.token || zeroAddress

  const isXyroToken =
    tokenSmartContractAddress === xyroSmartContractAddress ||
    tokenContractAddress === xyroSmartContractAddress

  const profitAndLoss = value ?? 0
  const isPositiveValue = profitAndLoss >= 0
  const colorByValue = isPositiveValue ? 'green' : 'pink'
  const textColor = isTextColored ? colorByValue : 'gray'

  const tokenClassname =
    tokenColor ? `color-${tokenColor}` : `color-${colorByValue}`

  const formattedPNL = getFormattedPNL(profitAndLoss)

  const valueSign = isPositiveValue ? '+' : '-'

  const formattedPNLText =
    variant === 'none' ? `${valueSign} ${formattedPNL}`
    : variant === 'usd' ? `$${formattedPNL}`
    : formattedPNL

  return (
    <Flex
      gap={'2'}
      align={'center'}
      height={'100%'}
      className={cn(styles.tableItemProfit, className)}
    >
      {variant !== 'none' && variant !== 'usd' && (
        <>
          {variant === 'tether' && !isXyroToken ?
            isTokenRounded ?
              <TetherRoundedIcon
                width='2.5rem'
                height='2.5rem'
                className={tokenClassname}
              />
            : <TetherToken
                size='3rem'
                className={tokenClassname}
              />

          : variant === 'xyro' ?
            <XyroToken
              size={'3rem'}
              className={tokenClassname}
            />
          : isXyroToken ?
            <SwapXyroToken
              width='3rem'
              height='3rem'
              className={tokenClassname}
            />
          : null}
        </>
      )}

      <XyroNumeral
        className={cn({ 'color-white': !isTextColored })}
        color={textColor}
        isWhite={false}
        size={{ initial: '1', sm: '3' }}
        highContrast
      >
        {formattedPNLText}
      </XyroNumeral>
    </Flex>
  )
}

const getFormattedPNL = (value: number) => {
  return (
    Math.abs(value) === 0 ? '0'
    : Math.abs(value) < MIN_PNL ? '<0.01'
    : formatAmountLong(value)
  )
}
