export const roundToFixedFloat = (num: number) => {
  if (typeof num === 'number' && !Number.isInteger(num)) {
    return parseFloat(num.toFixed(6))
  }
  return num
}
