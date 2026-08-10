import { ChangeEvent, FC, ReactElement, useCallback, useState } from 'react'
import { Flex, Separator, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { ControllableFormField } from 'shared/ui'
import { formatToTether } from 'shared/utils/format-price'
import { BuyBackInputPercents } from './buy-back-input-percents'
import styles from '../buy-back.module.scss'

interface Props {
  balance: number
  isBalanceLoading?: boolean
  setValue: (value: string) => void
  value: string
  name: string
  handleChange?: (value: string) => void
  tokenIcon: ReactElement
  tokenName: 'XYRO' | 'USDT' | 'Arbitrum' | 'Ethereum'
  balanceDataTestId: DataTestIDs
  inputDataTestId: DataTestIDs
  page?: 'Trade' | 'Bridge'
  isBuy?: boolean
  hasError?: boolean
  setFocused?: (value: boolean) => void
}

/* eslint-disable-next-line max-statements */
export const BuyBackTokenInput: FC<Props> = ({
  balance,
  balanceDataTestId,
  isBalanceLoading = false,
  setValue,
  value,
  name,
  handleChange,
  tokenIcon,
  setFocused,
  tokenName,
  inputDataTestId,
  page = 'Trade',
  hasError = false,
  isBuy = false
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleFieldChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.value === '') {
        setValue(event.target.value)
        if (!handleChange) return

        handleChange(event.target.value)
      } else {
        const newValue =
          Number(event.target.value) >= 0 ? Number(event.target.value) : 0

        setValue(String(newValue))

        if (!handleChange) return

        handleChange(String(newValue))
      }
    },
    [handleChange, setValue]
  )

  const handleFieldFocus = () => {
    if (setFocused) {
      setFocused(true)
    }

    setIsFocused(true)
  }

  const handleFieldBlur = () => {
    if (setFocused) {
      setFocused(false)
    }

    setIsFocused(false)
  }

  const buybackInputClassnames = cn(styles.buyBackInput, {
    [styles.buyBackInputFocused]: isFocused,
    [styles.buyBackInputError]: hasError
  })

  const buybackTokenInputClassnames = cn(styles.buyBackTokenInput, {
    [styles.buybackTokenInputError]: hasError
  })

  const buybackTokenInputSubtitleClassnames = cn(
    styles.buybackTokenInputSubtitle,
    styles.buybackInputBalance
  )

  const disabledPercents = balance === 0

  const formattedBalance = formatToTether(balance, 2)

  return (
    <Flex
      align={'center'}
      className={buybackInputClassnames}
      py={'3'}
      px={'5'}
    >
      <Flex
        direction={'column'}
        gap={'2'}
        width={'50%'}
      >
        <Text className={styles.buybackTokenInputLable}>{name}</Text>

        <ControllableFormField
          placeholder='0.00'
          name={name}
          value={value}
          size='3'
          handleFieldChange={handleFieldChange}
          className={buybackTokenInputClassnames}
          onFocus={handleFieldFocus}
          onBlur={handleFieldBlur}
          dataTestID={inputDataTestId}
          type='number'
          required={false}
        />
      </Flex>
      <Separator
        orientation={'vertical'}
        className={styles.buyBackInputSeparator}
        size={'4'}
        mx={'5'}
      />
      <Flex
        direction={'column'}
        gap={'3'}
        pt={isBuy ? '6' : '0'}
        width={'50%'}
      >
        {!isBuy && (
          <Flex
            gap={'3'}
            className={styles.buybackInputPercents}
          >
            <BuyBackInputPercents
              balance={balance}
              setValue={setValue}
              disabled={disabledPercents}
            />
          </Flex>
        )}

        <Flex
          gap={'2'}
          align={'center'}
        >
          {tokenIcon}

          <Text size={'5'}>{tokenName}</Text>
        </Flex>

        <Text
          className={buybackTokenInputSubtitleClassnames}
          data-testid={balanceDataTestId}
        >
          Balance: {isBalanceLoading ? 'Loading...' : formattedBalance}
        </Text>
      </Flex>
    </Flex>
  )
}
