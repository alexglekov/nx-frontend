import { FC } from 'react'
import { useReactiveVar } from '@apollo/client'
import { TriangleDownIcon } from '@radix-ui/react-icons'
import { Flex } from '@radix-ui/themes'
import cn from 'classnames'
import { useLocation } from 'react-router-dom'
import { GamesNavIcon, MoreNavIcon } from 'shared/icons'
import { RadixText, XyroButton } from 'shared/ui'
import { getCurrentModeByPathName } from 'shared/utils/get-current-mode-by-pathname'
import { mobileNavSectionVar } from '../store/navigation-mobile'
import styles from '../navigation.module.scss'

interface Props {
  type: 'games' | 'more'
}

// eslint-disable-next-line complexity, max-statements
export const ModeSelectionToggle: FC<Props> = ({ type }) => {
  const { pathname } = useLocation()
  const navSection = useReactiveVar(mobileNavSectionVar)

  const currentModeByPathname = getCurrentModeByPathName(pathname)

  const handleToggleClick = () => {
    if (navSection === type) {
      mobileNavSectionVar(null)
    } else {
      mobileNavSectionVar(type)
    }
  }

  const isGamesSelected = type === 'games'

  const title = isGamesSelected ? 'Games' : 'More'
  const shapeType = isGamesSelected ? 'cutted-right' : 'cutted-both'

  const isCurrentModeGames =
    navSection === type || currentModeByPathname === 'games'
  const isCurrentModeMore =
    navSection === type || currentModeByPathname === 'more'

  return (
    <XyroButton
      onClick={handleToggleClick}
      className={cn(styles.modeSelectionToggle, {
        [styles.active]: navSection === type
      })}
      shape={shapeType}
      size='3'
      isWide
      fullWidth
    >
      <Flex
        width='100%'
        align='center'
        justify='between'
        gap='2'
      >
        <Flex
          align={'center'}
          gap={'2'}
        >
          {isGamesSelected ?
            <GamesNavIcon
              color={isCurrentModeGames ? 'var(--cyan)' : 'var(--gray-9)'}
              height={'3rem'}
              width={'3rem'}
              className={cn({
                [styles.mobileNavIconActive]: isCurrentModeGames
              })}
            />
          : <MoreNavIcon
              color={isCurrentModeMore ? 'var(--cyan)' : 'var(--gray-9)'}
              height={'3rem'}
              width={'3rem'}
              className={cn({
                [styles.mobileNavIconActive]: isCurrentModeMore
              })}
            />
          }

          <RadixText
            size='1'
            weight={'medium'}
          >
            {title}
          </RadixText>
        </Flex>

        <TriangleDownIcon
          color={
            navSection === type || currentModeByPathname === type ?
              'var(--cyan)'
            : 'var(--gray-9)'
          }
          className={cn({
            [styles.toggleTriangleActive]: navSection === type,
            [styles.mobileNavIconActive]:
              navSection === type || currentModeByPathname === type
          })}
        />
      </Flex>
    </XyroButton>
  )
}
