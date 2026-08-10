import { MORE_MODE_IDS } from 'features/navigation/constants'

type MoreType = (typeof MORE_MODE_IDS)[number]

export function getCurrentModeByPathName(pathname: string) {
  const currentRoute = pathname.split('/')[1]

  if (MORE_MODE_IDS.includes(currentRoute as MoreType)) {
    return 'more'
  }

  return null
}
