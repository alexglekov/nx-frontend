import { Predict } from '__generated__/graphql'
import { ModeType } from 'features/navigation/types'

export interface ProfileModeItem {
  id: ModeType
  title: string
  color: string
  backgroundElement: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string | undefined }
  >
}

export interface ProfileInfoStatItem {
  id: string
  icon: string
  name: string
  isEqualsXyroToken?: boolean
  isPercentage?: boolean
  getter?: (item: Predict) => number
}

export interface ProfileAchievementItem {
  icon: string
  name: string
  description: string
  rarity: number
}
