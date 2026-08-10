import { Maybe } from 'shared/types'
import { ModeType } from './types'

export function getClassNameByMode(currentMode: Maybe<ModeType>) {
  if (!currentMode) return 'color-white'

  switch (currentMode) {
    case 'setups':
      return 'color-setups'
    case 'bulls-eye':
      return 'color-bulls-eye'
    case 'one-vs-one':
      return 'color-one-vs-one'
    case 'up-down':
      return 'color-up-down'
    case 'rewards':
      return 'color-rewards'
    default:
      return 'color-white'
  }
}
