import { GAME_MODE_IDS, MORE_MODE_IDS } from 'features/navigation/constants'

type GameType = (typeof GAME_MODE_IDS)[number]
type MoreType = (typeof MORE_MODE_IDS)[number]

export function getCurrentModeByPathName(pathname: string) {
  const currentRoute = pathname.split('/')[1]

  if (GAME_MODE_IDS.includes(currentRoute as GameType)) {
    return 'games'
  }

  if (MORE_MODE_IDS.includes(currentRoute as MoreType)) {
    return 'more'
  }

  return null
}
