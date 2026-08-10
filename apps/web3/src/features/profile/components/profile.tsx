import { useEffect, useState } from 'react'
import { DropdownMenu, Flex, IconButton } from '@radix-ui/themes'
import { useFragment } from '__generated__'
import { FRAGMENT_ME } from 'api/auth/fragment-me'
import { UNAUTHORIZED } from 'app/constants'
import cn from 'classnames'
import { Auth } from 'features/auth'
import { useUser } from 'features/auth/hooks/use-user'
import { wizardModeVar } from 'features/auth/store/wizard.store'
import { WizardMode } from 'features/auth/types'
import { TermsDialog } from 'features/terms-dialog'
import { useLocation } from 'react-router-dom'
import { AVATAR_FALLBACK_DEFAULT, DataTestIDs } from 'shared/constants'
import { globalOverlayUserLoadingVar } from 'shared/store/global-overlay-state-store'
import { userVar } from 'shared/store/user'
import { XyroAvatar } from 'shared/ui'
import { ProfileContent } from './profile-content'

// eslint-disable-next-line max-statements
export const Profile = () => {
  const [isDropDownMenuOpen, setDropDownMenuOpen] = useState(false)
  const location = useLocation()
  const { userData, loading, error } = useUser()

  const user = useFragment(FRAGMENT_ME, userData) ?? null

  useEffect(() => {
    userVar(user)
  }, [user])

  useEffect(() => {
    globalOverlayUserLoadingVar(loading)
  }, [loading])

  useEffect(() => {
    if (!(error?.message === UNAUTHORIZED)) return

    wizardModeVar(WizardMode.signUp)
  }, [])

  useEffect(() => {
    setDropDownMenuOpen(false)
  }, [location.pathname])

  if (!user)
    return (
      <>
        <Auth />
        <TermsDialog />
      </>
    )

  return (
    <Flex
      align={'center'}
      gap='2'
    >
      <DropdownMenu.Root
        open={isDropDownMenuOpen}
        onOpenChange={() => setDropDownMenuOpen(!isDropDownMenuOpen)}
      >
        <DropdownMenu.Trigger>
          <IconButton
            className={cn('cursor-pointer', 'background-none')}
            variant='ghost'
            data-testid={DataTestIDs.buttonProfileHeader}
          >
            <XyroAvatar
              src={user.avatarUris[0] || ''}
              fallback={user.name[0] || AVATAR_FALLBACK_DEFAULT}
              userLevel={user.level?.levelId || 0}
            />
          </IconButton>
        </DropdownMenu.Trigger>

        <ProfileContent />
      </DropdownMenu.Root>
    </Flex>
  )
}
