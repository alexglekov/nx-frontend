export const getClaimButtonTitle = (
  inputValue: string,
  treasuryBalance: number
) => {
  if (Number(inputValue) > treasuryBalance) {
    return 'INSUFFICIENT BALANCE'
  }

  return 'CLAIM'
}
