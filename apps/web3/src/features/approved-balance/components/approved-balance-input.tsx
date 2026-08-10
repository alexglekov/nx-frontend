import { FC } from 'react'
import { useApprovedBalanceField } from '../hooks/use-approved-balance-field'
import { ApprovedBalanceAmountField } from './approved-balance-amount-field'
import { ApprovedBalanceInputLabel } from './approved-balance-input-label'

interface Props {
  onChange: (value: string) => void
  inputValue: string
  setInputValue: (value: string) => void
}

export const ApprovedBalanceInput: FC<Props> = ({
  onChange,
  inputValue,
  setInputValue
}) => {
  const { maxAmount, isApprove, onlyInteger } = useApprovedBalanceField()

  return (
    <>
      <ApprovedBalanceInputLabel />

      <ApprovedBalanceAmountField
        value={inputValue}
        setValue={setInputValue}
        onChange={onChange}
        maxAmount={maxAmount}
        onlyInteger={onlyInteger}
        isApprove={isApprove}
      />
    </>
  )
}
