/**
 * Transforms an index to the nearest index that is a multiple of 3.
 * @param num - The index to transform.
 * @returns The transformed index or null if value less than 1.
 */
export const transformToEveryThird = (num: number) => {
  if (num < 1) return null
  const remainder = num % 3
  return remainder === 0 ? num : num + (3 - remainder)
}
