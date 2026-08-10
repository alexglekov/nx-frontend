import { DataTestIDs } from 'shared/constants'

export interface UserSettingMainItem {
  name: string
  value: string
  buttonText: string
  onClick?: () => void
  dataTestID?: DataTestIDs | ''
}

export interface UserSettingSecondaryItem {
  name: string
  id: string
  isMain: boolean
}

export interface UsernameForm {
  username: string
}
