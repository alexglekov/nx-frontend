import { ElementRef, forwardRef, memo } from 'react'
import { Avatar, Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { isNotNullOrUndef } from '../../utils/is-not-null-or-undef'
import { XyroBox } from '../xyro-box/xyro-box'
import styles from './xyro-avatar.module.scss'

interface Props extends React.ComponentPropsWithoutRef<typeof Avatar> {
  src?: string
  displayLevel?: boolean
  userLevel?: number | null
  onClick?: React.MouseEventHandler<HTMLImageElement>
}
const XyroAvatarBase = forwardRef<ElementRef<typeof Avatar>, Props>(
  (
    {
      src,
      userLevel,
      displayLevel = true,
      size = '4',
      fallback,
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <Flex
        position={'relative'}
        onClick={onClick}
      >
        <Flex
          align={'center'}
          justify={'center'}
          className={cn(
            styles.borderContainer,
            styles[`borderContainerLevel-${userLevel}`],
            {
              [styles.largeBorder]:
                isNotNullOrUndef(userLevel) && Number(size) > 6
            }
          )}
        >
          <Avatar
            src={src}
            fallback={fallback}
            size={size}
            ref={ref}
            variant={'solid'}
            color={'violet'}
            {...props}
          />
        </Flex>

        {isNotNullOrUndef(userLevel) && displayLevel && (
          <Flex
            className={styles.levelContainer}
            align={'center'}
            justify={'center'}
          >
            <XyroBox
              color='pink'
              size='2rem'
            >
              <Text
                align={'center'}
                className={cn(styles.levelContainerText, 'color-white')}
                weight={'bold'}
                size={'1'}
              >
                {userLevel}
              </Text>
            </XyroBox>
          </Flex>
        )}
      </Flex>
    )
  }
)

export const XyroAvatar = memo(
  XyroAvatarBase,
  (prevProps: Props, nextProps: Props) => prevProps.src === nextProps.src
)
