import { useEffect } from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { shouldShowHeaderBalanceVar } from 'features/balance-transactions/store/should-show-header-balance-var'
import { GameWindowFallback } from './game-window-fallback'
import styles from '../game.module.scss'

interface Props {
  gameName?: string
  gameIframeUrl?: string
  loading: boolean
}

export const GameWindow: React.FC<Props> = ({ gameIframeUrl, loading }) => {
  useEffect(() => {
    if (gameIframeUrl) {
      shouldShowHeaderBalanceVar(false)

      // @ts-expect-error - GameLauncher is defined in the loaded script
      const launcher = new GameLauncher('game_container')

      launcher.run(JSON.stringify({ launch_url: gameIframeUrl }))
    }
  }, [gameIframeUrl])

  useEffect(() => {
    return () => {
      shouldShowHeaderBalanceVar(true)
    }
  }, [])

  if (!gameIframeUrl && !loading) {
    return <GameWindowFallback />
  }

  return (
    <Flex
      width={'100%'}
      align={'center'}
      justify={'center'}
    >
      <Box
        className={styles.gameIframe}
        id={'game_container'}
      />
    </Flex>
  )
}
