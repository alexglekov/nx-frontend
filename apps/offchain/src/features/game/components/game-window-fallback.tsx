import { Button, Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { isSignInDialogOpenVar } from 'features/auth/store/dialogs'
import { resetWizardState } from '../../auth/utils/reset-wizard-state'
import styles from '../game.module.scss'

export const GameWindowFallback: React.FC = () => {
  const onClickButtonHandler = () => {
    resetWizardState()
    isSignInDialogOpenVar(true)
  }

  return (
    <Flex
      width={'100%'}
      align={'center'}
      justify={'center'}
    >
      <Flex
        className={cn(styles.gameIframe, styles.gameIframeFallback)}
        direction={'column'}
      >
        <Text className={styles.gameFallbackTitle}>Ready to play?</Text>

        <Text
          className={cn(styles.gameFallbackDescription, 'color-white')}
          weight={'bold'}
        >
          Just sign up to jump in.
        </Text>

        <Button
          size={'4'}
          variant={'solid'}
          color={'pink'}
          onClick={onClickButtonHandler}
          className={styles.gameFallbackButton}
        >
          SIGN IN NOW
        </Button>
      </Flex>
    </Flex>
  )
}
