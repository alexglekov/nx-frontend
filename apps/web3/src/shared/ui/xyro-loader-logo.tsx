import { FC } from 'react'
import { RadixColorType } from 'shared/types'

interface Props {
  color?: RadixColorType | 'black' | 'white'
  size?: string
  className?: string
}

export const XyroLoaderLogo: FC<Props> = ({
  size = '3rem',
  color,
  className
}) => (
  <svg
    width={size}
    height={size}
    color={color && `var(--${color})`}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 16 16'
    fill='none'
    className={className}
  >
    <path
      d='M11.0261 8.32666L14.3714 2.6265L7.97117 5.04884L3.86032 1.48863L13.1152 13.5241L11.0261 8.32666Z'
      fill='currentColor'
    />
    <path
      d='M1.29199 5.53947L3.08929 1.62184L12.2657 13.7919L1.29199 5.53947Z'
      fill='currentColor'
    />
    <path
      d='M1.12377 14.2061L7.5232 11.2377L4.84689 9.43618L1.12377 14.2061Z'
      fill='currentColor'
    />
  </svg>
)
