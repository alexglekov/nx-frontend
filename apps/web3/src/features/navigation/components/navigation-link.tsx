import { useMemo } from 'react'
import { Flex, Text, Tooltip } from '@radix-ui/themes'
import cn from 'classnames'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { DataTestIDs } from 'shared/constants'
import { ICON_SIZE, MODE_TYPE_TO_ICON_MAP } from '../constants'
import { NavigationRouteType } from '../types'
import styles from '../navigation.module.scss'

interface Props {
  to?: string
  iconType: NavigationRouteType
  ExtraIcon?: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >
  disabled?: boolean
  size?: number
  title?: string
  dataTestID?: DataTestIDs
  isTrigger?: boolean
}
// eslint-disable-next-line max-statements
export const NavigationLink: React.FC<Props> = ({
  to,
  iconType,
  size = ICON_SIZE,
  disabled = false,
  title = '',
  dataTestID = '',
  isTrigger = false,
  ExtraIcon
}) => {
  const location = useLocation()
  const isActiveLink = location.pathname === to
  const Icon = useMemo(
    () => MODE_TYPE_TO_ICON_MAP?.[iconType] || null,
    [iconType]
  )

  const tooltipContent = disabled ? 'Please sign in' : title || iconType

  const navLinkClassNames = cn(styles.navigationMenuLink, {
    [styles.disabled]: disabled,
    [styles.navLinkActive]: isActiveLink
  })

  const content = (
    <Flex
      direction={'column'}
      align={'center'}
      data-testid={dataTestID}
    >
      {ExtraIcon && !isActiveLink ?
        <ExtraIcon />
      : <Icon
          width={size}
          height={size}
          className={navLinkClassNames}
        />
      }
      {title && (
        <Text
          align={'center'}
          size={'1'}
          className={cn('select-none', {
            [styles.linkDescriptionActive]: isActiveLink,
            'color-gray': !isActiveLink
          })}
          weight='light'
        >
          {title}
        </Text>
      )}
    </Flex>
  )

  if (isTrigger) {
    return content
  }

  if (disabled || !to) {
    return (
      <Flex className={styles.navLink}>
        <Tooltip
          content={tooltipContent}
          delayDuration={100}
          side='right'
        >
          {content}
        </Tooltip>
      </Flex>
    )
  }

  return (
    <RouterLink
      to={to}
      className={styles.navLinkText}
    >
      <Tooltip
        content={tooltipContent}
        delayDuration={100}
        side='right'
      >
        {content}
      </Tooltip>
    </RouterLink>
  )
}
