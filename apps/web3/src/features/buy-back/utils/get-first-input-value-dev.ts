export const getFirstInputValueDev = ({
  isSell,
  inputValue,
  price
}: {
  isSell: boolean
  inputValue: number
  price: number
}) => (isSell ? Number(inputValue / price) : Number(inputValue * price))
