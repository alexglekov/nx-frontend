import { useCallback, useEffect, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Dialog, Flex, Grid, IconButton, Text } from '@radix-ui/themes'
import { OneVsOneGame } from '__generated__/graphql'
import { PRICE_REGEXP, RouterPathes } from 'shared/constants'
import { useCleanQueryParams } from 'shared/hooks/use-clean-query-params'
import { useResponsive } from 'shared/hooks/use-responsive'
import { CopyIcon } from 'shared/icons'
import { XyroDialog, XyroLoadingSpinner } from 'shared/ui'
import { MIN_BET_PRICE } from '../constants'
import { useGame1vs1Loader } from '../hooks/use-game-loader'
import { oneVsOneCurrentGameVar } from '../store/game-store'
import { gameIdViewVar } from '../store/game-view-store'
import { oneVsOneModalChartAnnotationsVar } from '../store/one-vs-one-modal-chart-annotation'
import { copyGameLinkToClipboard } from '../utils/save-link-to-game'
import { GameViewDialogContent } from './game-view-dialog-content'
import { GameViewDialogPriceGraph } from './game-view-dialog-price-graph'
import { GameViewDialogSubmit } from './game-view-dialog-submit'
import styles from '../mode-one-vs-one.module.scss'

// eslint-disable-next-line max-statements
export const GameViewDialog: React.FC = () => {
  const [price, setPrice] = useState('')
  const { cleanQueryParams } = useCleanQueryParams()
  const gameId = useReactiveVar(gameIdViewVar)
  const game = useReactiveVar(oneVsOneCurrentGameVar)
  const { refetch } = useGame1vs1Loader(gameId as string)

  const [isMobile] = useResponsive('xs')

  useEffect(() => {
    return () => {
      oneVsOneModalChartAnnotationsVar(null)
    }
  }, [])

  const handleCloseGame = () => {
    gameIdViewVar(null)
    cleanQueryParams()
  }

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      if (!PRICE_REGEXP.test(value)) return

      const price =
        Number(value) < MIN_BET_PRICE ? MIN_BET_PRICE.toString() : value
      setPrice(price)
    },
    []
  )

  const handleCopyGameLinkToClipboard = () => {
    copyGameLinkToClipboard(gameId as string, RouterPathes.oneVsOne)
  }

  return (
    <XyroDialog
      open={Boolean(gameId)}
      onOpenChange={handleCloseGame}
      className={styles.gameCreateDialog}
    >
      <Grid
        columns={{ initial: '1fr', xs: '1.5fr 3fr', sm: '1.5fr 3fr' }}
        width={'100%'}
        gap={'1'}
        justify={'between'}
      >
        <Dialog.Title className={styles.gameViewDialogTitle}>
          <Flex
            align={'center'}
            justify={'center'}
            mt={'2'}
            position={'relative'}
            width={'100%'}
          >
            <IconButton
              variant='ghost'
              className={styles.copyButtonMobile}
              onClick={handleCopyGameLinkToClipboard}
            >
              <CopyIcon
                color='var(--white)'
                width={'3rem'}
                height={'3rem'}
              />
            </IconButton>

            <Text
              size={'4'}
              weight={'medium'}
              align={'center'}
              className={'color-white'}
            >
              1VS1 DETAILS
            </Text>
          </Flex>
        </Dialog.Title>

        {isMobile && <GameViewDialogPriceGraph game={game as OneVsOneGame} />}

        <Flex
          direction={'column'}
          className={styles.gameViewInfoContainer}
        >
          <Dialog.Title className={styles.gameContentDialogTitle}>
            <Flex
              align={'center'}
              justify={'between'}
            >
              <Text
                size={{ initial: '6', sm: '4' }}
                weight={'bold'}
                className={styles.gameViewInfoTitle}
              >
                1VS1 DETAILS
              </Text>

              <IconButton
                variant='ghost'
                onClick={handleCopyGameLinkToClipboard}
              >
                <CopyIcon color='var(--gray-9)' />
              </IconButton>
            </Flex>
          </Dialog.Title>

          {!game ?
            <Flex
              className={styles.loaderContainer}
              align={'center'}
              height={'100%'}
              justify={'center'}
              direction={'column'}
              width={'9'}
            >
              <XyroLoadingSpinner iconSize='9' />
            </Flex>
          : <>
              <GameViewDialogContent
                game={game}
                onChange={handleChange}
                price={price}
                refetch={refetch}
              />

              <GameViewDialogSubmit
                game={game}
                price={price}
              />
            </>
          }
        </Flex>

        {!isMobile && <GameViewDialogPriceGraph game={game as OneVsOneGame} />}
      </Grid>
    </XyroDialog>
  )
}
