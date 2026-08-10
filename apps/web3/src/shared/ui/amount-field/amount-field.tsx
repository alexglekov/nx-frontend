import { useCallback, useState } from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'
import classnames from 'classnames'
import { DataTestIDs, MIN_BET_AMOUNT } from 'shared/constants'
import { RadixColorType } from 'shared/types'
import { TetherToken } from '../tether-token'
import styles from './amount-field.module.scss'
import { ControllableAmountField } from './controllable-amount-field'
import { AmountFieldErrorMessage } from './types'

type Props = {
  name: string
  label?: string
  className?: string
  labelColor?: RadixColorType | 'black'
  placeholder?: string
  defaultValue?: string
  minAmount?: number
  maxAmount?: number
  isDisabled?: boolean
  hasTetherIcon?: boolean
  isXyroIconLeft?: boolean
  // eslint-disable-next-line react/boolean-prop-naming
  maxButtonEnabled?: boolean
  onInputChange?: (value: string) => void
  dataTestID?: DataTestIDs | ''
  onlyInteger?: boolean
  regexp?: RegExp
  customErrorMessages?: AmountFieldErrorMessage[]
  pattern?: string
  inputMode?: 'numeric' | 'decimal'
}

export const AmountField: React.FC<Props> = ({
  name,
  label,
  className,
  labelColor = 'gray',
  placeholder = 'Enter amount',
  hasTetherIcon = true,
  isXyroIconLeft = false,
  defaultValue = '',
  minAmount = MIN_BET_AMOUNT,
  maxAmount = Infinity,
  isDisabled = false,
  maxButtonEnabled = false,
  onInputChange,
  onlyInteger,
  regexp,
  customErrorMessages,
  pattern,
  inputMode,
  dataTestID = ''
}) => {
  const [fieldState, setFieldState] = useState(defaultValue)
  const xyroIconClassNames = classnames(styles.amountFieldXyroIcon, {
    [styles.left]: isXyroIconLeft,
    [styles.right]: !isXyroIconLeft
  })
  const amountFieldClassNames = classnames(className ? className : '', {
    [styles.leftIcon]: hasTetherIcon && isXyroIconLeft,
    [styles.rightIcon]: hasTetherIcon && !isXyroIconLeft
  })

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onInputChange) onInputChange(event.target.value)
    },
    [onInputChange]
  )

  const onClickMax = useCallback(() => {
    setFieldState(String(maxAmount))
    if (onInputChange) onInputChange(String(maxAmount))
  }, [onInputChange, setFieldState, maxAmount])

  const setValue = useCallback(
    (value: string) => {
      if (regexp && !regexp.test(value)) return
      setFieldState(value)
    },
    [setFieldState, regexp]
  )

  return (
    <Flex
      width={'100%'}
      position={'relative'}
      align={'end'}
    >
      <ControllableAmountField
        setValue={setValue}
        value={fieldState}
        className={amountFieldClassNames}
        onChange={onChange}
        label={label}
        labelColor={labelColor}
        name={name}
        placeholder={placeholder}
        minAmount={minAmount}
        max={maxAmount}
        disabled={isDisabled}
        required
        dataTestID={dataTestID}
        onlyInteger={onlyInteger}
        customErrorMessages={customErrorMessages}
        pattern={pattern}
        inputMode={inputMode}
      />

      {hasTetherIcon ?
        <Flex
          position={'absolute'}
          className={xyroIconClassNames}
        >
          <TetherToken size='3rem' />
        </Flex>
      : null}

      {maxButtonEnabled && (
        <Button
          className={styles.amountFieldMaxButton}
          variant={'ghost'}
          type={'button'}
          onClick={onClickMax}
        >
          <Text color={'yellow'}>MAX</Text>
        </Button>
      )}
    </Flex>
  )
}
