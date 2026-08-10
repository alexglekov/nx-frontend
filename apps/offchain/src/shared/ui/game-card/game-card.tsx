import { ElementRef, forwardRef } from 'react'
import { useReactiveVar } from '@apollo/client'
import { ProviderGamesCatalog } from '__generated__/graphql'
import cn from 'classnames'
import {
  isSignInDialogOpenVar,
  isSignUpDialogOpenVar
} from 'features/auth/store/dialogs'
import { wizardModeVar } from 'features/auth/store/wizard.store'
import { WizardMode } from 'features/auth/types'
import { Link as RouterLink } from 'react-router-dom'
import { RouterPathes } from 'shared/constants'
import { userVar } from 'shared/store/user'
import { imageFallbackPath } from '../../icons'
import styles from './game-card.module.scss'

interface Props {
  game: ProviderGamesCatalog
}

export const GameCard = forwardRef<ElementRef<typeof RouterLink>, Props>(
  ({ game }, ref) => {
    const user = useReactiveVar(userVar)
    const isUserExists = Boolean(user)

    const gameName = game.name
    const gameId = game.id
    const imageThumb =
      game.thumb?.['500x500'] ||
      game.thumb?.['380x380'] ||
      game.thumb?.['300x300']

    const imageUrl = imageThumb || imageFallbackPath
    const routerLinkPath =
      isUserExists ? `${RouterPathes.games}/${gameId}` : '#'

    const handleLinkClick = () => {
      if (user) return

      wizardModeVar(WizardMode.signIn)
      isSignInDialogOpenVar(true)
      isSignUpDialogOpenVar(false)
    }

    return (
      <RouterLink
        className={styles.gameContainer}
        to={routerLinkPath}
        ref={ref}
        title={gameName}
        onClick={handleLinkClick}
      >
        <img
          className={cn(styles.gameImage, {
            [styles.gameImageFallback]: !imageThumb
          })}
          src={imageUrl}
          alt={`${gameName} preview`}
        />
      </RouterLink>
    )
  }
)
