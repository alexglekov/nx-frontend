import { useCallback, useEffect } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import { useFragment } from '__generated__'
import { FRAGMENT_SETUPS_GAME, GET_SETUPS_GAME } from 'api/mode-setups'
import { MS_IN_SEC } from 'shared/constants'
import { useCleanQueryParams } from 'shared/hooks/use-clean-query-params'
import { useInterval } from 'shared/hooks/use-interval'
import { useQueryParams } from 'shared/hooks/use-query'
import { XyroDialog } from 'shared/ui'
import { isViewGameDialogOpenVar } from '../../store/dialogs'
import { selectedSetupVar } from '../../store/selected-setup'
import { setupsChartAnnotationsVar } from '../../store/setups-chart-annotations'
import { SetupsAddPredictCard } from '../setups-add-bet/setups-add-bet-card'
import { SetupsGameView } from '../setups-game-view/setups-game-view'
import { SetupsGameViewSkeleton } from './setups-game-skeleton'
import styles from '../../mode-setups.module.scss'

// eslint-disable-next-line max-statements
export const SetupsDialogGameView = () => {
  const query = useQueryParams()
  const { cleanQueryParams } = useCleanQueryParams()
  const gameId = query.get('gameId') || ''

  useEffect(() => {
    return () => {
      setupsChartAnnotationsVar(null)
    }
  }, [])

  const isDialogOpen = useReactiveVar(isViewGameDialogOpenVar)

  const { data, loading, refetch } = useQuery(GET_SETUPS_GAME, {
    skip: !gameId,
    variables: {
      id: gameId
    }
  })

  const setupsGame = useFragment(FRAGMENT_SETUPS_GAME, data?.getSetupGame)

  useInterval(() => {
    refetch()
  }, 30 * MS_IN_SEC)

  useEffect(() => {
    setupsGame && selectedSetupVar(setupsGame)
  }, [setupsGame])

  const handleOpenChange = useCallback((isOpen: boolean) => {
    isViewGameDialogOpenVar(isOpen)
    cleanQueryParams()
  }, [])

  useEffect(() => {
    if (!gameId) return
    isViewGameDialogOpenVar(true)
  }, [gameId])

  return (
    <XyroDialog
      open={isDialogOpen}
      onOpenChange={handleOpenChange}
      className={styles.setupsDialogGameView}
    >
      {loading && <SetupsGameViewSkeleton />}

      {setupsGame?.myPredict ?
        <SetupsGameView setupsGame={setupsGame} />
      : <SetupsAddPredictCard />}
    </XyroDialog>
  )
}
