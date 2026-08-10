import { FC, ReactNode } from 'react'
import { XyroLoadingSpinner } from './xyro-loading-spinner'

interface Props {
  children: ReactNode
  loading: boolean
  variant?: 'light' | 'dark'
  iconSize?: '0' | '6' | '7' | '8' | '9'
}
export const XyroLoading: FC<Props> = ({
  loading,
  children,
  variant = 'light',
  iconSize = '0'
}) => {
  return loading ? (
    <XyroLoadingSpinner
      variant={variant}
      iconSize={iconSize}
    />
  ) : (
    children
  )
}
