import { FC } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import { STAND } from 'app/constants'
import { Stand } from 'app/types'
import classnames from 'classnames'
import { useLocation } from 'react-router-dom'
import { RadixText, XyroButton } from 'shared/ui'
import { XyroLink } from 'shared/ui/xyro-link'
import { useClaimableRewards } from '../../rewards/hooks/use-claimable-rewards'
import { GAME_MODE_IDS, MORE_MODE_IDS } from '../constants'
import { getModeByName } from '../get-mode-by-name'
import { mobileNavSectionVar } from '../store/navigation-mobile'
import { NavigationMobileModeType } from '../types'
import { NavigationMobileMenu } from './navigation-mobile-menu'
import styles from '../navigation.module.scss'

export const NavigationMobileModeSelection: FC = () => {
  const navSection = useReactiveVar(mobileNavSectionVar)
  const { isClaimable } = useClaimableRewards()

  const MODE_IDS = navSection === 'games' ? GAME_MODE_IDS : MORE_MODE_IDS

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
        {MODE_IDS.map(name => {
          const isRewardMode = name === 'rewards'
          const rewardsExtraIcon = isRewardMode && isClaimable

          return (
            <ModeSelectionButton
              key={name}
              modeId={name}
              withExtraIcon={rewardsExtraIcon}
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

interface ItemProps {
  modeId: NavigationMobileModeType
  withExtraIcon?: boolean
}
export const ModeSelectionButton: FC<ItemProps> = ({
  modeId: modeId,
  withExtraIcon
}) => {
  const { pathname } = useLocation()
  const selectedMode = pathname.split('/')[1]
  const isModeSelected = modeId === selectedMode

  const mode = getModeByName(modeId)
  const ModeIcon = mode.icon
  const modeName = mode.name

  const extraIconColor = isModeSelected ? 'var(--gray)' : 'var(--c-a-pink)'
  const iconColor = withExtraIcon ? extraIconColor : 'var(--gray)'

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
        <XyroLink to={`/${modeId}`}>
          <Flex
            className={classnames({ [styles.withExtraIcon]: withExtraIcon })}
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
