import { FC } from 'react'
import { Grid } from '@radix-ui/themes'
import { Maybe, SetupsGameFragment } from '__generated__/graphql'
import { SetupsGameDetails } from './setups-game-details'
import { SetupsGameViewTabs } from './setups-game-view-tabs'
import styles from '../../mode-setups.module.scss'

interface Props {
  setupsGame: Maybe<SetupsGameFragment>
}
export const SetupsGameView: FC<Props> = ({ setupsGame }) => {
  return (
    <Grid
      className={styles.setupsGameView}
      width={'100%'}
      gap={'1'}
      justify={'between'}
    >
      <SetupsGameDetails game={setupsGame} />

      <SetupsGameViewTabs game={setupsGame} />
    </Grid>
  )
}
