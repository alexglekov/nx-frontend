/* eslint-disable max-statements */
import { FC } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import classnames from 'classnames'
import { To, useLocation } from 'react-router-dom'
import { RadixText, XyroButton } from 'shared/ui'
import { XyroLink } from 'shared/ui/xyro-link'
import { MORE_MODE_IDS } from '../constants'
import { getModeByName } from '../get-mode-by-name'
import { mobileNavSectionVar } from '../store/navigation-mobile'
import { NavigationRouteType } from '../types'
import { NavigationMobileMenu } from './navigation-mobile-menu'
import styles from '../navigation.module.scss'
import { userVar } from 'shared/store/user'
import { wizardModeVar } from 'features/auth/store/wizard.store'
import { WizardMode } from 'features/auth/types'
import { isSignInDialogOpenVar } from 'features/auth/store/dialogs'
import { RouterPathes } from 'shared/constants'

export const NavigationMobileModeSelection: FC = () => {
  const navSection = useReactiveVar(mobileNavSectionVar)

  return (
    <Flex
      className={styles.mobileModeSelection}
      direction={'column'}
      width='100%'
      px='4'
      pb='2'
    >
      <NavigationMobileMenu />

      <Flex
        gap='3'
        py='4'
        justify={'center'}
        align={'center'}
        className={classnames(styles.modeSelectionList, {
          [styles.closed]: navSection === null
        })}
      >
        {MORE_MODE_IDS.map(name => {
          return (
            <ModeSelectionButton
              key={name}
              modeId={name}
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

interface ItemProps {
  modeId: NavigationRouteType
}
export const ModeSelectionButton: FC<ItemProps> = ({ modeId: modeId }) => {
  const user = useReactiveVar(userVar)
  const { pathname } = useLocation()
  const selectedMode = pathname.split('/')[1]
  const isModeSelected = modeId === selectedMode

  const mode = getModeByName(modeId)
  const ModeIcon = mode.icon
  const modeName = mode.name

  const iconColor = isModeSelected ? 'var(--c-a-pink)' : 'var(--gray)'

  const destinationRoute =
    (modeId === 'account' || modeId === 'favorites') && !user ? '#'
    : modeId === 'account' ? RouterPathes.accountMyAccount
    : `/${modeId}`

  const handleClick = () => {
    if (modeId !== 'account' && modeId !== 'favorites') return

    wizardModeVar(WizardMode.signIn)
    isSignInDialogOpenVar(true)
  }

  return (
    <Flex
      direction={'column'}
      align={'center'}
      gap='1'
    >
      <XyroButton
        value={modeId}
        size='4'
        className={classnames(styles.modeSelectionItem, {
          [styles.active]: isModeSelected,
          [styles[modeId]]: isModeSelected
        })}
        onClick={() => mobileNavSectionVar(null)}
      >
        <XyroLink
          to={destinationRoute}
          onClick={handleClick}
        >
          <Flex
            align='center'
            gap='2'
            px='2'
          >
            <ModeIcon
              className={'navigationLinkIcon'}
              width={'4.5rem'}
              height={'4.5rem'}
              color={iconColor}
            />
          </Flex>
        </XyroLink>
      </XyroButton>

      <RadixText
        size={'1'}
        weight={isModeSelected ? 'medium' : 'light'}
      >
        {modeName}
      </RadixText>
    </Flex>
  )
}
