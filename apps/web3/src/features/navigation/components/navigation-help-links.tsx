import { Flex, IconButton, Tooltip } from '@radix-ui/themes'
import { Link } from 'react-router-dom'
import { RouterPathes } from 'shared/constants'
import { NoteIcon, QuestionSymbol } from 'shared/icons'
import { isBetaWelcomeDialogOpenedVar } from 'shared/store/dialogs'
import { replaceUrlState } from 'shared/utils/replace-url-state'
import styles from '../navigation.module.scss'

export const NavigationHelpLinks = () => {
  const handleAboutClick = () => {
    const url = new URL(window.location.href)

    url.searchParams.set('welcome', '1')

    replaceUrlState(url.href)
    isBetaWelcomeDialogOpenedVar(true)
  }

  return (
    <Flex
      py={'4'}
      align={'center'}
      direction={'column'}
      gap={'5'}
    >
      <Tooltip
        content={'About'}
        delayDuration={100}
        side='right'
        className={styles.navLinkTooltip}
      >
        <IconButton onClick={handleAboutClick}>
          <Flex
            align={'center'}
            justify={'center'}
            className={styles.navHelpItem}
          >
            <NoteIcon color='var(--gray-6)' />
          </Flex>
        </IconButton>
      </Tooltip>

      <Tooltip
        content={'Help'}
        delayDuration={100}
        side='right'
        className={styles.navLinkTooltip}
      >
        <Link to={RouterPathes.help}>
          <Flex
            align={'center'}
            justify={'center'}
            className={styles.navHelpItem}
          >
            <QuestionSymbol color='var(--gray-6)' />
          </Flex>
        </Link>
      </Tooltip>
    </Flex>
  )
}
