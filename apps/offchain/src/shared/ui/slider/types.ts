import { RadixColorType } from 'shared/types'

export type SlideType = 'promotion'

export type Banner = {
  path: string
  buttonText: string
  isExternal?: boolean
  buttonColor?: RadixColorType
  textItem?: React.ReactNode
  cssClass?: string
}
