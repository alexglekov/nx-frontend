import { FC } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { SwapXyroToken } from 'shared/icons'
import { ControllableAmountField, TetherToken } from 'shared/ui'
import { AmountFieldErrorMessage } from 'shared/ui/amount-field/types'
import { oneVsOneIsXyroTokenSelectedVar } from '../store/selected-token'
import styles from '../mode-one-vs-one.module.scss'

interface Props {
  isLeftIcon?: boolean
  placeholder?: string
  value: string
  minAmount: number
  setValue: (value: string) => void
  name: string
  maxAmount?: number
  className?: string
  dataTestID?: DataTestIDs | ''
  onlyInteger?: boolean
  customErrorMessages?: AmountFieldErrorMessage[]
  pattern?: string
  inputMode?: 'numeric' | 'decimal'
  hasIcon?: boolean
}

export const OneVsOneFormAmountField: FC<Props> = ({
  isLeftIcon = false,
  placeholder = 'Enter amount',
  value,
  minAmount,
  maxAmount,
  name,
  setValue,
  className,
  dataTestID,
  onlyInteger,
  customErrorMessages,
  pattern,
  inputMode,
  hasIcon
}) => {
  const oneVsOneIsXyroTokenSelected = useReactiveVar(
    oneVsOneIsXyroTokenSelectedVar
  )

  const tokenIcon =
    oneVsOneIsXyroTokenSelected ?
      <SwapXyroToken
        width={'3rem'}
        height={'3rem'}
      />
    : <TetherToken size='3rem' />

  return (
    <Flex
      position={'relative'}
      width={'100%'}
      flexGrow={'1'}
    >
      <ControllableAmountField
        value={value}
        name={name}
        className={cn(className ?? '', styles.amountFieldToken)}
        setValue={setValue}
        minAmount={minAmount}
        max={maxAmount}
        placeholder={placeholder}
        pattern={pattern}
        inputMode={inputMode}
        required
        dataTestID={dataTestID}
        onlyInteger={onlyInteger}
        customErrorMessages={customErrorMessages}
      />

      <Flex
        position={'absolute'}
        className={cn(styles.amountFieldXyroIcon, {
          [styles.left]: isLeftIcon,
          [styles.right]: !isLeftIcon
        })}
      >
        {hasIcon ? tokenIcon : <Text size={'4'}>$</Text>}
      </Flex>
    </Flex>
  )
}
