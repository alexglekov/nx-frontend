// eslint-disable-next-line complexity
export const mapContractName = (name: string) => {
  return (
    name === 'Bullseye' ? 'bullsEye'
    : name === 'UpDown' ? 'upDown'
    : /** deprecated name */
    name === 'OneVsOve' ? 'oneVsOne'
    : name === 'OneVsOneUpDown' ? 'oneVsOneUpDown'
    : name === 'OneVsOneBullseye' ? 'oneVsOneBullsEye'
    : name === 'Setup' ? 'setups'
    : name === 'SetupFactory' ? 'setupsFactory'
    : name === 'ExactPrice' ? 'exactPrice'
    : name === 'USDC' ? 'usdc'
    : name === 'Treasury' ? 'treasury'
    : name === 'FrontHelper' ? 'helper'
    : name.charAt(0).toLowerCase() + name.slice(1)
  )
}
