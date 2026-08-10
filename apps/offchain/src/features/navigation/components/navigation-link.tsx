/* eslint-disable complexity */
import { useMemo } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text, Tooltip } from '@radix-ui/themes'
import cn from 'classnames'
import { isSignInDialogOpenVar } from 'features/auth/store/dialogs'
import { wizardModeVar } from 'features/auth/store/wizard.store'
import { WizardMode } from 'features/auth/types'
import { Link as RouterLink, To, useLocation } from 'react-router-dom'
import { DataTestIDs, RouterPathes } from 'shared/constants'
import { userVar } from 'shared/store/user'
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
  const user = useReactiveVar(userVar)
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

  const destinationRoute = (
    (
      (to === RouterPathes.accountMyAccount || to === RouterPathes.favorites) &&
      !user
    ) ?
      '#'
    : to) as To

  const handleClick = () => {
    if (to !== RouterPathes.accountMyAccount && to !== RouterPathes.favorites)
      return

    wizardModeVar(WizardMode.signIn)
    isSignInDialogOpenVar(true)
  }

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
      to={destinationRoute}
      className={styles.navLinkText}
      onClick={handleClick}
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
