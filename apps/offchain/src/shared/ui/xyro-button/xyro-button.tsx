import { ElementRef, FC, forwardRef } from 'react'
import { Button, Flex } from '@radix-ui/themes'
import { BaseButton } from '@radix-ui/themes/dist/cjs/components/base-button'
import cn from 'classnames'
import { RadixColorType } from 'shared/types'
import { ShapeType, getShapePathByType } from './get-shape-path-by-type'
import styles from './xyro-button.module.scss'

interface Props extends React.ComponentPropsWithoutRef<typeof BaseButton> {
  children?: React.ReactNode
  isIconOnly?: boolean
  color?: RadixColorType
  withBorder?: boolean
  shape?: ShapeType
  isWide?: boolean
  fullWidth?: boolean
}
export const XyroButton = forwardRef<ElementRef<typeof Button>, Props>(
  // eslint-disable-next-line complexity
  (
    {
      withBorder = true,
      shape = 'cutted-both',
      isWide = false,
      children,
      isIconOnly,
      color,
      variant,
      className,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const radixColor = color ? color : `currentColor`
    const shapeFill = variant === 'outline' ? 'none' : `var(--${radixColor})`
    const classNames = cn(styles.xyroButton, className, {
      [styles.iconOnly]: isIconOnly
    })
    const shapePath = getShapePathByType(shape, isWide)
    const viewBox = isWide ? '-2 -1 111 38' : '-1 -1 38 38'

    return (
      <Button
        {...props}
        ref={ref}
        variant={variant}
        className={classNames}
        color={color as RadixColorType}
      >
        {isIconOnly ?
          <Flex
            align='center'
            justify='center'
            width='6'
            className={styles.xyroButtonText}
          >
            {children}
          </Flex>
        : <Flex
            align='center'
            justify='center'
            gap='2'
            className={cn(styles.xyroButtonText, {
              [styles.black]: color === ('black' as RadixColorType),
              [styles.fullWidth]: fullWidth
            })}
          >
            {children}
          </Flex>
        }

        <svg
          width='100%'
          height='100%'
          preserveAspectRatio='none'
          viewBox={viewBox}
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className={styles.xyroButtonShape}
        >
          <ShapePath
            d={shapePath ?? ''}
            fill={shapeFill}
            stroke={`var(--${radixColor})` || 'currentColor'}
            strokeWidth={withBorder ? '2' : '0'}
          />
        </svg>
      </Button>
    )
  }
)

interface ShapeProps {
  fill: string
  stroke: string
  strokeWidth: string
  d: string
}
const ShapePath: FC<ShapeProps> = ({ fill, stroke, strokeWidth, d }) => {
  return (
    <path
      d={d}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
    />
  )
}
