import { FC } from 'react'
import { Flex } from '@radix-ui/themes'
import { RadixColorType, RadixSize } from 'shared/types'
import styles from './xyro-box.module.scss'

interface Props {
  children?: React.ReactNode
  borderColor?: string
  color?: RadixColorType
  size?: string
}
export const XyroBox: FC<Props> = ({
  children,
  borderColor,
  color,
  size = '100%'
}) => {
  const fill = `var(--${color})` || 'currentColor'
  const stroke = borderColor || `var(--${color})` || 'var(--blue)'

  return (
    <Flex
      className={styles.xyroBox}
      align={'center'}
      justify={'center'}
      width={size}
      height={size}
    >
      {children}

      <svg
        width='100%'
        height='100%'
        preserveAspectRatio='none'
        viewBox='0 0 38 39'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={styles.xyroBoxShape}
      >
        <path
          d='M1.5 19.0957V29.7976C1.5 33.5521 4.5436 36.5957 8.29808 36.5957H24.7191C26.5774 36.5957 28.3595 35.8575 29.6735 34.5435L34.4478 29.7692C35.7618 28.4552 36.5 26.6731 36.5 24.8148V8.39378C36.5 4.63931 33.4564 1.5957 29.7019 1.5957H13.2809C11.4226 1.5957 9.6405 2.33388 8.32652 3.64786L3.55216 8.42222C2.23818 9.7362 1.5 11.5183 1.5 13.3766V19.0957Z'
          fill={fill}
          stroke={stroke}
          strokeWidth='3'
        />
      </svg>
    </Flex>
  )
}
