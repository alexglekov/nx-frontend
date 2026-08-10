import { MODE_ID_TO_MODE_MAP } from './constants'
import { NavigationRouteType } from './types'

export function getModeByName(name: NavigationRouteType) {
  return MODE_ID_TO_MODE_MAP?.[name] || null
}
