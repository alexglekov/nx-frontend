export const truncateString = (string: string) => {
  if (string.length <= 20) {
    return string
  }

  const start = string.slice(0, 12)
  const end = string.slice(-12)

  return `${start}...${end}`
}
