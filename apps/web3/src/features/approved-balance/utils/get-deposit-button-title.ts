export const getDepositButtonTitle = (
  inputValue: string,
  balanceValue: number
) => {
  if (Number(inputValue) > balanceValue) {
    return 'INSUFFICIENT BALANCE'
  }

  return 'DEPOSIT'
}
