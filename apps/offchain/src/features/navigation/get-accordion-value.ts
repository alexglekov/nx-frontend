import { RouterPathes } from 'shared/constants'

const pathToAccordionValue: Record<string, 'games' | 'more'> = {
  [RouterPathes.rewards]: 'more',
  [RouterPathes.referrals]: 'more',
  [RouterPathes.buyback]: 'more'
} as const

export const getDefaultAccordionValue = (pathname: string) => {
  const matchedPath = Object.keys(pathToAccordionValue).find(path =>
    pathname.startsWith(path)
  )
  return matchedPath ? pathToAccordionValue[matchedPath] : 'games'
}
