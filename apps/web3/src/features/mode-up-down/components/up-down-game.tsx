import { Grid } from '@radix-ui/themes'
import { useUpDownGame } from '../hooks/use-up-down-game'
import { useUpDownGameHistory } from '../hooks/use-up-down-game-history'
import { useUpDownStateMachine } from '../hooks/use-up-down-state-machine'
import { PoolInfo } from './pool-info'
import { UpDownBetButtons } from './up-down-bet-buttons'
import { UpDownGraph } from './up-down-graph'
import styles from '../mode-up-down.module.scss'

export const UpDownGame: React.FC = () => {
  useUpDownGame()
  useUpDownStateMachine()
  useUpDownGameHistory()

  return (
    <Grid className={styles.upDownGame}>
      <PoolInfo
        title={'Up Pool'}
        isLong={true}
      />

      <UpDownGraph />

      <PoolInfo
        title={'Down Pool'}
        isLong={false}
      />

      <UpDownBetButtons />
    </Grid>
  )
}
