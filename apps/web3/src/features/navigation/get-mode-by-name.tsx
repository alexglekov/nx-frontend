import { MODE_ID_TO_MODE_MAP } from './constants'
import { NavigationMobileModeType } from './types'

export function getModeByName(name: NavigationMobileModeType) {
  return MODE_ID_TO_MODE_MAP?.[name] || null
}
