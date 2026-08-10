import React from 'react'
import { ModeOnboardingSkeleton } from '../common-skeletons/mode-onboarding-skeleton'
import { TableSkeleton } from '../common-skeletons/table-skeleton'
import { SetupsGameSkeleton } from '../setups-game-skeleton/setups-game-skeleton'
import styles from './page-skeletons.module.scss'

export const SetupsPageSkeleton: React.FC = () => {
  return (
    <div className={styles.modeSetupsWrapper}>
      <ModeOnboardingSkeleton />

      <SetupsGameSkeleton />

      <TableSkeleton />
    </div>
  )
}
