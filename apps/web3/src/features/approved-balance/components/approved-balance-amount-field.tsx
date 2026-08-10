import { ChangeEvent, FC, useCallback } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Button, Flex, Text } from '@radix-ui/themes'
import { ControllableAmountField } from 'shared/components'
import { DataTestIDs, PRICE_PATTERN } from 'shared/constants'
import { SwapTetherToken, SwapXyroToken } from 'shared/icons'
import { AmountFieldErrorMessage } from 'shared/ui/amount-field/types'
import { activeBalanceSwitchTypeVar } from '../store/switch-types'
import { ApprovedBalanceSwitchTypes } from '../types'
import styles from '../approved-balance.module.scss'

interface Props {
  value: string
  setValue: (value: string) => void
  maxAmount: number
  onChange: (value: string) => void
  onlyInteger?: boolean
  isApprove: boolean
}

/** NOTE: Off validation due to issue FE-826 */
const customErrorMessages: AmountFieldErrorMessage[] = [
  {
    match: 'rangeOverflow',
    title: '',
    testLocator: 'validationMessageInsufficientBalance'
  },
  {
    match: 'valueMissing',
    testLocator: 'validationMessageAmountMismatch',
    title: ''
  },
  {
    match: 'rangeUnderflow',
    title: '',
    testLocator: 'validationMessageInsufficientBalance'
  },
  {
    match: 'badInput',
    testLocator: 'validationMessageBadInput',
    title: ''
  },
  {
    match: 'typeMismatch',
    testLocator: 'validationMessageTypeMismatch',
    title: ''
  }
]

export const ApprovedBalanceAmountField: FC<Props> = ({
  value,
  setValue,
  maxAmount,
  onlyInteger,
  onChange,
  isApprove
}) => {
  const onClickMax = useCallback(() => {
    setValue(String(maxAmount))
    onChange(String(maxAmount))
  }, [maxAmount, setValue, onChange])

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!onChange) return

      onChange(event.target.value)
    },
    [onChange]
  )

  const pattern = !onlyInteger ? PRICE_PATTERN : undefined
  const inputMode = !onlyInteger ? 'decimal' : 'numeric'

  return (
    <Flex
      className={styles.approvedFormAmount}
      position={'relative'}
    >
      <ControllableAmountField
        customErrorMessages={customErrorMessages}
        name={'amount'}
        value={value}
        setValue={setValue}
        onChange={handleChange}
        minAmount={0}
        max={isApprove ? undefined : maxAmount}
        onlyInteger={onlyInteger}
        pattern={pattern}
        inputMode={inputMode}
        required
        dataTestID={DataTestIDs.treasureInput}
      />

      <Flex className={styles.amountFieldXyroIcon}>
        <ApprovedBalanceAmountFieldIcon />
      </Flex>

      <Button
        className={styles.amountFieldMaxButton}
        variant={'ghost'}
        type={'button'}
        onClick={onClickMax}
        data-testid={DataTestIDs.buttonTreasureMax}
      >
        <Text
          size={'1'}
          className={styles.approvedBalanceAmountFieldMaxButtonText}
          weight={'bold'}
        >
          MAX
        </Text>
      </Button>
    </Flex>
  )
}

const ApprovedBalanceAmountFieldIcon = () => {
  const activeBalanceType = useReactiveVar(activeBalanceSwitchTypeVar)

  if (activeBalanceType === ApprovedBalanceSwitchTypes.Tether) {
    return (
      <SwapTetherToken
        width={'3rem'}
        height={'3rem'}
      />
    )
  }

  return (
    <SwapXyroToken
      width={'3rem'}
      height={'3rem'}
    />
  )
}
