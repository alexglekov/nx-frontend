import { formatToTether } from 'shared/utils/format-price'

export const formatBalance = (balance: number) => {
  return formatToTether(Math.trunc(balance * 100) / 100)
}
