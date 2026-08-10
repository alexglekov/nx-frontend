export const formatHugePrice = (num: number) => {
  if (num < 1000) {
    return num.toFixed(2)
  } else if (num < 1000000) {
    return (num / 1000).toFixed(1) + 'K'
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }

  return num
}
